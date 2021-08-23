import { Connection } from "mysql2/promise";
import sql, { empty } from "sql-template-tag";
import { DateRangeRequestData, PosType } from "../../types";
import SqlHelper from "../SqlHelper";

export default class SkuSaleView {
  db: Connection;
  debug: boolean;

  constructor(db: Connection, debug = false) {
    this.db = db;
    this.debug = debug;
  }

  async getByPosIdOrPosType(
    query: PosIdQueryRequestData | PosTypeQueryRequestData
  ): Promise<SkuQtyRow[]> {
    const whereClause = SqlHelper.getCojuctedWhereClause([
      "posId" in query ? sql`pos.id = ${query.posId}` : empty,
      "posType" in query ? sql`pos.type = ${query.posType}` : empty,
      ...SqlHelper.getDateRangeConditions(query, "sale.date"),
    ]);

    const saleSqlQuery = sql`
        SELECT
            sku.id, sku.name, SUM(sale_sku.qty) as qty
        FROM
            sku
        JOIN
            sale_sku ON sale_sku.sku_id = sku.id
        JOIN
            sale ON sale_sku.sale_id = sale.id
        JOIN
            seller ON sale.seller_id = seller.id
        JOIN
            pos ON seller.pos_id = pos.id
        ${whereClause}
        GROUP BY sku.id
    `;

    const [rows] = await this.db.query(saleSqlQuery);

    SqlHelper.logSql(this.debug, saleSqlQuery);
    SqlHelper.log(this.debug, rows);

    return rows as SkuQtyRow[];
  }
}

export interface PosIdQueryRequestData extends DateRangeRequestData {
  posId?: number;
}

export interface PosTypeQueryRequestData extends DateRangeRequestData {
  posType?: PosType;
}

export interface SkuQtyRow {
  skuId: number;
  skuName: string;
  qty: number;
}
