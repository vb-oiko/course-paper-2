import { Connection } from "mysql2/promise";
import sql from "sql-template-tag";
import SqlHelper from "../SqlHelper";
import { DateRangeRequestData } from "../../types";

export default class PosProfitabilityView {
  db: Connection;
  debug: boolean;

  constructor(db: Connection, debug = false) {
    this.db = db;
    this.debug = debug;
  }

  async getProfitabilityByPosId(
    query: PosProfitabilityViewRequestData
  ): Promise<PosProfitabilityViewRow[]> {
    const salesWhereClause = SqlHelper.getCombinedWhereClause([
      sql`pos.id = ${query.posId}`,
      ...SqlHelper.getDateRangeConditions(query, "sale.date"),
    ]);

    const expensesWhereClause = SqlHelper.getCombinedWhereClause([
      sql`pos.id = ${query.posId}`,
    ]);

    const salesSqlQuery = sql`
        SELECT
            pos.id,
            SUM(sale_sku.qty * sale_sku.price) as sales_total
        FROM
            sale_sku
        JOIN
            sale ON sale_sku.sale_id = sale.id
        JOIN
            seller ON sale.seller_id = seller.id
        JOIN 
            pos ON seller.pos_id = pos.id
        ${salesWhereClause}
        GROUP BY pos.id
    `;

    const expensesSqlQuery = sql`
        SELECT
            pos.id,
            SUM(seller.salary) as sellers_salary
        FROM
            sale_sku
        JOIN
            sale ON sale_sku.sale_id = sale.id
        JOIN
            seller ON sale.seller_id = seller.id
        JOIN 
            pos ON seller.pos_id = pos.id
        ${expensesWhereClause}
        GROUP BY pos.id
    `;

    const profitabilitySqlQuery = sql`
        SELECT 
            pos.*,
            sales_total,
            sellers_salary,
            sellers_salary + pos.utilities + pos.rent as expenses_total,
            sales_total / (sellers_salary + pos.utilities + pos.rent) as profitability
        FROM
            pos
        JOIN 
            (${salesSqlQuery}) as sales ON pos.id = sales.id
        JOIN 
            (${expensesSqlQuery}) as expenses ON pos.id = expenses.id
        ${expensesWhereClause}    
    `;

    const [rows] = await this.db.query(profitabilitySqlQuery);

    SqlHelper.logSql(this.debug, profitabilitySqlQuery);
    SqlHelper.log(this.debug, rows);

    return rows as PosProfitabilityViewRow[];
  }
}

export interface PosProfitabilityViewRequestData extends DateRangeRequestData {
  posId: number;
}

export interface PosProfitabilityViewRow {
  posId: number;
  supplierId: number;
  qty: number;
  date: Date;
}
