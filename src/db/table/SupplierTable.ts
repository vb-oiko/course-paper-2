import { RowDataPacket } from "mysql2/promise";
import sql, { empty, join } from "sql-template-tag";
import { InsertRow, Supplier } from "../../types";
import BaseTable, {
  DateRangeRequestData,
  LimitOffsetRequestData,
} from "./BaseTable";

export default class SupplierTable extends BaseTable<Supplier> {
  tableName = "supplier";

  mapToDb(data: InsertRow<Supplier>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Supplier {
    const { id, name } = data;

    return {
      id,
      name,
    };
  }

  async getBySkuOrCategoryId(
    query:
      | SupplierByMinSkuQtyRequestData
      | SupplierByCategoryAndMinQtyRequestData
  ): Promise<SupplierResponseData> {
    const whereClause = this.joinWithAnd([
      "skuId" in query ? sql`purchase_sku.sku_id = ${query.skuId}` : empty,
      "categoryId" in query
        ? sql`sku.category_id = ${query.categoryId}`
        : empty,
      ...this.getDateRangeConditions(query, "purchase.date"),
    ]);

    const suppliersSql = sql`
      SELECT 
        supplier.id, supplier.name
      FROM
        supplier
          JOIN
        purchase ON purchase.supplier_id = supplier.id
          JOIN
        purchase_sku ON purchase_sku.purchase_id = purchase.id
          JOIN
        purchase_sku_pos ON purchase_sku_pos.purchase_sku_id = purchase_sku.id
          JOIN
        sku ON purchase_sku.sku_id = sku.id
      WHERE
        ${whereClause}
      GROUP BY supplier.id
      HAVING SUM(purchase_sku_pos.qty) > ${query.minQty ?? 0}
    `;

    const limitOffsetSupplierSql = join(
      [suppliersSql, ...this.getLimitOffsetClause(query)],
      " "
    );

    const totalSql = sql`
    SELECT 
      COUNT(*) as total
    FROM (${suppliersSql}) as result
    `;

    const [supplierRows] = await this.db.query(limitOffsetSupplierSql);
    const [totalRows] = await this.db.query(totalSql);

    const list = (supplierRows as RowDataPacket[]).map((row) =>
      this.mapFromDb(row)
    );
    const total = (totalRows as RowDataPacket[])[0].total as unknown as number;

    if (this.debug) {
      console.log("query parameters", query);
      console.log("suppliers sql: ", this.formatSql(limitOffsetSupplierSql));
      console.log("suppliers:", list);
      console.log("total sql: ", this.formatSql(totalSql));
      console.log("total:", total);
    }

    return {
      list,
      total,
    };
  }
}

export interface SupplierByMinSkuQtyRequestData
  extends DateRangeRequestData,
    LimitOffsetRequestData {
  skuId: number;
  minQty?: number;
}

export interface SupplierByCategoryAndMinQtyRequestData
  extends DateRangeRequestData,
    LimitOffsetRequestData {
  categoryId: number;
  minQty?: number;
}

export interface SupplierResponseData {
  list: Supplier[];
  total: number;
}
