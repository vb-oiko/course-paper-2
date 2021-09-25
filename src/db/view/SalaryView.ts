import { Connection } from "mysql2/promise";
import sql, { empty } from "sql-template-tag";
import { PosType } from "../../types";
import SqlHelper from "../SqlHelper";

export default class SalaryView {
  db: Connection;
  debug: boolean;

  constructor(db: Connection, debug = false) {
    this.db = db;
    this.debug = debug;
  }

  async getByPosIdOrPosType(
    query: PosIdQueryRequestData | PosTypeQueryRequestData
  ): Promise<SellerRow[]> {
    const whereClause = SqlHelper.getCombinedWhereClause([
      "posId" in query ? sql`pos.id = ${query.posId}` : empty,
      "posType" in query ? sql`pos.type = ${query.posType}` : empty,
    ]);

    const saleSqlQuery = sql`
        SELECT
            seller.id, seller.name, seller.salary, seller.pos_id as posId
        FROM
            seller
        JOIN
            pos ON seller.pos_id = pos.id
        ${whereClause}
    `;

    const [rows] = await this.db.query(saleSqlQuery);

    SqlHelper.logSql(this.debug, saleSqlQuery);
    SqlHelper.log(this.debug, rows);

    return rows as SellerRow[];
  }
}

export interface PosIdQueryRequestData {
  posId?: number;
}

export interface PosTypeQueryRequestData {
  posType?: PosType;
}

export interface SellerRow {
  id: number;
  name: string;
  salary: number;
}
