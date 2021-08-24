import { Connection } from "mysql2/promise";
import sql from "sql-template-tag";
import { DateRangeRequestData } from "../../types";
import SqlHelper from "../SqlHelper";

export default class SkuSupplierView {
  db: Connection;
  debug: boolean;

  constructor(db: Connection, debug = false) {
    this.db = db;
    this.debug = debug;
  }

  async getBySkuIdAndSupplierId(
    query: SkuSupplierRequestData
  ): Promise<SkuSupplierRow[]> {
    const whereClause = SqlHelper.getCojuctedWhereClause([
      sql`purchase_sku.sku_id = ${query.skuId}`,
      sql`purchase.supplier_id = ${query.supplierId}`,
      ...SqlHelper.getDateRangeConditions(query, "purchase.date"),
    ]);

    const saleSqlQuery = sql`
        SELECT
        purchase_sku.sku_id as skuId, purchase.supplier_id as supplierId, SUM(purchase_sku_pos.qty) as qty
        FROM
            purchase
        JOIN
            purchase_sku ON purchase_sku.purchase_id = purchase.id
        JOIN
          purchase_sku_pos ON purchase_sku_pos.purchase_sku_id = purchase_sku.id
        ${whereClause}
        GROUP BY purchase_sku.sku_id
    `;

    const [rows] = await this.db.query(saleSqlQuery);

    SqlHelper.logSql(this.debug, saleSqlQuery);
    SqlHelper.log(this.debug, rows);

    return rows as SkuSupplierRow[];
  }
}

export interface SkuSupplierRequestData extends DateRangeRequestData {
  skuId: number;
  supplierId: number;
}

export interface SkuSupplierRow {
  skuId: number;
  supplierId: number;
  qty: number;
  date: Date;
}
