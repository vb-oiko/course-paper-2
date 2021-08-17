import { Connection } from "mysql2/promise";
import sql, { empty } from "sql-template-tag";
import { DateRangeRequestData, PosTypeQueryRequestData } from "../../types";
import SqlHelper from "../SqlHelper";

export default class SellerProductivityView {
  db: Connection;
  debug: boolean;

  constructor(db: Connection, debug = false) {
    this.db = db;
    this.debug = debug;
  }

  async getSingleSellerProductivity(
    query: SingleSellerProductivityRequestData
  ): Promise<SingleSellerProductivityRow[]> {
    const whereSaleClause = SqlHelper.getCojuctedWhereClause([
      "posType" in query ? sql`pos.type = ${query.posType}` : empty,
      ...SqlHelper.getDateRangeConditions(query, "sale.date"),
    ]);

    const whereSellerClause = SqlHelper.getCojuctedWhereClause([
      "posType" in query ? sql`pos.type = ${query.posType}` : empty,
    ]);

    const saleTotalsSqlQuery = sql`
        SELECT
            SUM(sale_sku.qty * sale_sku.price) as sum
        FROM
            sale_sku
        JOIN
            sale ON sale_sku.sale_id = sale.id
        JOIN
            seller ON sale.seller_id = seller.id
        JOIN 
            pos ON seller.pos_id = pos.id
        ${whereSaleClause}
    `;

    const sellerCountSqlQuery = sql`
        SELECT
            COUNT(*) as seller_count
        FROM
            seller
        JOIN
            pos ON seller.pos_id = pos.id
        ${whereSellerClause}
    `;

    const productivitySqlQuery = sql`
        SELECT 
            sum / seller_count as productivity
        FROM
            (${saleTotalsSqlQuery}) as totals,
            (${sellerCountSqlQuery}) as seller_count
    `;

    const [rows] = await this.db.query(productivitySqlQuery);

    console.warn(productivitySqlQuery.text);
    console.log(rows);

    return rows as SingleSellerProductivityRow[];
  }
}

export interface SingleSellerProductivityRequestData
  extends PosTypeQueryRequestData,
    DateRangeRequestData {}

export interface SingleSellerProductivityRow {
  productivity: number;
}
