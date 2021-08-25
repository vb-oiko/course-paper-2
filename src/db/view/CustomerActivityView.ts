import { Connection } from "mysql2/promise";
import sql, { empty } from "sql-template-tag";
import { DateRangeRequestData, PosType } from "../../types";
import SqlHelper from "../SqlHelper";

export default class CustomerActivityView {
  db: Connection;
  debug: boolean;

  constructor(db: Connection, debug = false) {
    this.db = db;
    this.debug = debug;
  }

  async getByQuery(
    query: PosIdQueryRequestData | PosTypeQueryRequestData
  ): Promise<CustomerActivityViewRow[]> {
    const whereClause = SqlHelper.getCojuctedWhereClause([
      "posId" in query ? sql`pos.id = ${query.posId}` : empty,
      "posType" in query ? sql`pos.type = ${query.posType}` : empty,
    ]);

    const saleSqlQuery = sql`
        SELECT
            customer.*, SUM(sale_sku.qty * sale_sku.price) as total
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
        ORDER BY total DESC 
        LIMIT 3
    `;

    const [rows] = await this.db.query(saleSqlQuery);

    SqlHelper.logSql(this.debug, saleSqlQuery);
    SqlHelper.log(this.debug, rows);

    return rows as CustomerActivityViewRow[];
  }
}

export interface PosIdQueryRequestData {
  posId?: number;
}

export interface PosTypeQueryRequestData {
  posType?: PosType;
}

export interface CustomerActivityViewRow {
  customerId: number;
  customerName: string;
}
