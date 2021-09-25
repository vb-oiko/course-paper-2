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

  async getAverageSellerProductivity(
    query: AverageSellerProductivityRequestData
  ): Promise<AverageSellerProductivityRow[]> {
    const whereSaleClause = SqlHelper.getCombinedWhereClause([
      "posType" in query ? sql`pos.type = ${query.posType}` : empty,
      ...SqlHelper.getDateRangeConditions(query, "sale.date"),
    ]);

    const whereSellerClause = SqlHelper.getCombinedWhereClause([
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

    SqlHelper.logSql(this.debug, productivitySqlQuery);
    SqlHelper.log(this.debug, rows);

    return rows as AverageSellerProductivityRow[];
  }

  async getSellerProductivity(
    query: SellerProductivityRequestData
  ): Promise<SellerProductivityRow[]> {
    const whereSaleClause = SqlHelper.getCombinedWhereClause([
      "sellerId" in query ? sql`seller.id = ${query.sellerId}` : empty,
      ...SqlHelper.getDateRangeConditions(query, "sale.date"),
    ]);

    const saleTotalsSqlQuery = sql`
          SELECT
              SUM(sale_sku.qty * sale_sku.price) as productivity
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

    const [rows] = await this.db.query(saleTotalsSqlQuery);

    SqlHelper.logSql(this.debug, saleTotalsSqlQuery);
    SqlHelper.log(this.debug, rows);

    return rows as AverageSellerProductivityRow[];
  }
}

export interface AverageSellerProductivityRequestData
  extends PosTypeQueryRequestData,
    DateRangeRequestData {}

export interface AverageSellerProductivityRow {
  productivity: number;
}

export interface SellerProductivityRequestData extends DateRangeRequestData {
  sellerId: number;
}

export interface SellerProductivityRow {
  productivity: number;
}
