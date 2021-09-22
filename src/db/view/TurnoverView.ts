import { Connection } from "mysql2/promise";
import sql, { empty } from "sql-template-tag";
import { DateRangeRequestData, PosType } from "../../types";
import SqlHelper from "../SqlHelper";

export default class TurnoverView {
  db: Connection;
  debug: boolean;

  constructor(db: Connection, debug = false) {
    this.db = db;
    this.debug = debug;
  }

  async getByQuery(
    query: PosIdQueryRequestData | PosTypeQueryRequestData
  ): Promise<TurnoverViewRow[]> {
    const whereClause = SqlHelper.getCombinedWhereClause([
      "posId" in query ? sql`pos.id = ${query.posId}` : empty,
      "posType" in query ? sql`pos.type = ${query.posType}` : empty,
      ...SqlHelper.getDateRangeConditions(query, "sale.date"),
    ]);

    const saleSqlQuery = sql`
          SELECT
              SUM(sale_sku.qty * sale_sku.price) as turnover
          FROM
              sale_sku
          JOIN
              sale ON sale_sku.sale_id = sale.id
          JOIN
              seller ON sale.seller_id = seller.id
          JOIN 
              pos ON seller.pos_id = pos.id
          ${whereClause}
      `;

    const [rows] = await this.db.query(saleSqlQuery);

    SqlHelper.logSql(this.debug, saleSqlQuery);
    SqlHelper.log(this.debug, rows);

    return rows as TurnoverViewRow[];
  }
}

export interface PosIdQueryRequestData extends DateRangeRequestData {
  posId?: number;
}

export interface PosTypeQueryRequestData extends DateRangeRequestData {
  posType?: PosType;
}

export interface TurnoverViewRow {
  turnover: number;
}
