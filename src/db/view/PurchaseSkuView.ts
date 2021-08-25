import { Connection } from "mysql2/promise";
import sql from "sql-template-tag";
import SqlHelper from "../SqlHelper";

export default class PurchaseSkuView {
  db: Connection;
  debug: boolean;

  constructor(db: Connection, debug = false) {
    this.db = db;
    this.debug = debug;
  }

  async getByPurchaseId(
    query: PurchaseSkuRequestData
  ): Promise<PurchaseSkuRow[]> {
    const whereClause = SqlHelper.getCojuctedWhereClause([
      sql`purchase_request.request_id = ${query.requestId}`,
    ]);

    const purchaseSqlQuery = sql`
        SELECT
            purchase_sku.*,
            SUM (purchase_sku_pos.qty) as qty
        FROM
            purchase_sku_pos
        JOIN
            purchase_sku ON purchase_sku_pos.purchase_sku_id = purchase_sku.id
        JOIN
            purchase ON purchase_sku.purchase_id = purchase.id
        JOIN
            purchase_request ON purchase_request.purchase_id = purchase.id
        ${whereClause}
        GROUP BY purchase_sku.id
    `;

    const [rows] = await this.db.query(purchaseSqlQuery);

    SqlHelper.logSql(this.debug, purchaseSqlQuery);
    SqlHelper.log(this.debug, rows);

    return rows as PurchaseSkuRow[];
  }
}

export interface PurchaseSkuRequestData {
  requestId: number;
}

export interface PurchaseSkuRow {
  skuId: number;
  skuName: string;
  qty: number;
}
