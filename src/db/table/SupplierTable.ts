import { RowDataPacket } from "mysql2/promise";
import sql, { empty } from "sql-template-tag";
import { InsertRow, Supplier } from "../../types";
import SqlHelper from "../SqlHelper";
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
    const whereClause = SqlHelper.joinWithAnd([
      "skuId" in query ? sql`purchase_sku.sku_id = ${query.skuId}` : empty,
      "categoryId" in query
        ? sql`sku.category_id = ${query.categoryId}`
        : empty,
      ...SqlHelper.getDateRangeConditions(query, "purchase.date"),
    ]);

    const listSql = sql`
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

    this.debugLogQuery(query);

    const list = await this.getList(
      SqlHelper.addLimitOffsetClause(listSql, query)
    );
    const total = await this.getTotal(listSql);

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
