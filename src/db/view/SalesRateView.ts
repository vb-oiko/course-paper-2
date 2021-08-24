import { Connection } from "mysql2/promise";
import sql, { empty } from "sql-template-tag";
import { PosType } from "../../types";
import SqlHelper from "../SqlHelper";

export default class SalesRateView {
  db: Connection;
  debug: boolean;

  constructor(db: Connection, debug = false) {
    this.db = db;
    this.debug = debug;
  }

  async getSalesRate(
    query: SalesRateViewRequestData
  ): Promise<SalesRateViewRow[]> {
    const whereClause = SqlHelper.getCojuctedWhereClause([
      "posType" in query ? sql`pos.type = ${query.posType}` : empty,
    ]);

    const saleRateSqlQuery = sql`
        SELECT
            pos.*, 
            SUM(sale_sku.qty * sale_sku.price) / pos.area as areaRate,
            SUM(sale_sku.qty * sale_sku.price) / pos.halls as hallsRate,
            SUM(sale_sku.qty * sale_sku.price) / pos.workplaces as workplacesRate,
            COUNT(seller.id) as sellers
        FROM
            sale_sku
        JOIN
            sale ON sale_sku.sale_id = sale.id
        JOIN
            seller ON sale.seller_id = seller.id
        JOIN 
            pos ON seller.pos_id = pos.id
        ${whereClause}
        GROUP BY pos.id
    `;

    const [rows] = await this.db.query(saleRateSqlQuery);

    SqlHelper.logSql(this.debug, saleRateSqlQuery);
    SqlHelper.log(this.debug, rows);

    return rows as SalesRateViewRow[];
  }

  async getSellersTotals(
    query: SalesRateViewRequestData
  ): Promise<SalesRateViewRow[]> {
    const whereClause = SqlHelper.getCojuctedWhereClause([
      "posType" in query ? sql`pos.type = ${query.posType}` : empty,
    ]);

    const saleRateSqlQuery = sql`
        SELECT
            seller.*,
            SUM(sale_sku.qty * sale_sku.price) as sales_total
        FROM
            sale_sku
        JOIN
            sale ON sale_sku.sale_id = sale.id
        JOIN
            seller ON sale.seller_id = seller.id
        JOIN 
            pos ON seller.pos_id = pos.id
        ${whereClause}
        GROUP BY pos.id, seller.id
    `;

    const [rows] = await this.db.query(saleRateSqlQuery);

    SqlHelper.logSql(this.debug, saleRateSqlQuery);
    SqlHelper.log(this.debug, rows);

    return rows as SalesRateViewRow[];
  }
}

export interface SalesRateViewRequestData {
  posType?: PosType;
}

export interface SalesRateViewRow {
  posId: number;
  supplierId: number;
  qty: number;
  date: Date;
}
