import { RowDataPacket } from "mysql2/promise";
import sql, { join } from "sql-template-tag";
import { InsertRow, Supplier } from "../../types";
import BaseTable, {
  DateRangeRequestData,
  LimitOffsetRequestData
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

  async getBySkuId(
    query: SupplierByMinSkuQtyRequestData
  ): Promise<SupplierResponseData> {
    const { skuId, minQty } = query;

    const whereClause = this.joinWithAnd([
      sql`ps.sku_id = ${skuId}`,
      ...this.getDateRangeConditions(query, "p.date"),
    ]);

    const suppliersSql = sql`
      SELECT 
        s.id, s.name
      FROM
        Supplier AS s
          JOIN
        purchase AS p ON p.supplier_id = s.id
          JOIN
        purchase_sku AS ps ON ps.purchase_id = p.id
          JOIN
        purchase_sku_pos AS psp ON psp.purchase_sku_id = ps.id
      WHERE
        ${whereClause}
      GROUP BY s.id
      HAVING SUM(psp.qty) > ${minQty}
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
  minQty: number;
}

export interface SupplierResponseData {
  list: Supplier[];
  total: number;
}
