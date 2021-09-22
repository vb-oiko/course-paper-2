import { Connection } from "mysql2/promise";
import sql, { empty } from "sql-template-tag";
import { DateRangeRequestData, PosType } from "../../types";
import SqlHelper from "../SqlHelper";

export default class CustomerSkuView {
  db: Connection;
  debug: boolean;

  constructor(db: Connection, debug = false) {
    this.db = db;
    this.debug = debug;
  }

  async getByQuery(
    query: PosIdQueryRequestData | PosTypeQueryRequestData
  ): Promise<CustomerSkuViewRow[]> {
    const whereClause = SqlHelper.getCombinedWhereClause([
      sql`sale_sku.sku_id = ${query.skuId}`,
      "posId" in query ? sql`pos.id = ${query.posId}` : empty,
      "posType" in query ? sql`pos.type = ${query.posType}` : empty,
      ...SqlHelper.getDateRangeConditions(query, "sale.date"),
    ]);

    const saleSqlQuery = sql`
        SELECT
            customer.*
        FROM
            customer
        JOIN
            sale ON sale.customer_id = customer.id
        JOIN
            sale_sku ON sale_sku.sale_id = sale.id
        JOIN
            seller ON sale.seller_id = seller.id
        JOIN    
            pos ON seller.pos_id = pos.id
        ${whereClause}
        GROUP BY customer.id
    `;

    const [rows] = await this.db.query(saleSqlQuery);

    SqlHelper.logSql(this.debug, saleSqlQuery);
    SqlHelper.log(this.debug, rows);

    return rows as CustomerSkuViewRow[];
  }
}

export interface SkuIdRequestData {
  skuId: number;
}

export interface PosIdQueryRequestData
  extends DateRangeRequestData,
    SkuIdRequestData {
  posId?: number;
}

export interface PosTypeQueryRequestData
  extends DateRangeRequestData,
    SkuIdRequestData {
  posType?: PosType;
}

export interface CustomerSkuViewRow {
  customerId: number;
  customerName: string;
}
