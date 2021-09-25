import { Connection } from "mysql2/promise";
import sql, { empty, Sql } from "sql-template-tag";
import { PosType } from "../../types";
import SqlHelper from "../SqlHelper";

export default class SkuPriceView {
  db: Connection;
  debug: boolean;

  constructor(db: Connection, debug = false) {
    this.db = db;
    this.debug = debug;
  }

  async getByPosIdOrPosType(
    query: PosIdQueryRequestData | PosTypeQueryRequestData
  ): Promise<SkuQtyRow[]> {
    const whereClause = (sqlQuery: Sql = empty): Sql =>
      SqlHelper.getCombinedWhereClause([
        "posId" in query ? sql`pos.id = ${query.posId}` : empty,
        "posType" in query ? sql`pos.type = ${query.posType}` : empty,
        sql`pos_sku.sku_id = ${query.skuId}`,
        sqlQuery,
      ]);

    const transferFromSqlQuery = sql`
        SELECT
            pos.id, pos_sku.price, -SUM(transfer_sku.qty) as qty
        FROM
            pos
        JOIN 
            pos_sku ON pos_sku.pos_id = pos.id
        JOIN 
            transfer ON transfer.from_pos_id = pos.id
        JOIN
            transfer_sku ON transfer_sku.transfer_id = transfer.id
        ${whereClause(sql`transfer_sku.sku_id = ${query.skuId}`)}
        GROUP BY pos.id, pos_sku.price
    `;

    const transferToSqlQuery = sql`
        SELECT
            pos.id, pos_sku.price, SUM(transfer_sku.qty) as qty
        FROM
            pos
        JOIN 
            pos_sku ON pos_sku.pos_id = pos.id
        JOIN 
            transfer ON transfer.to_pos_id = pos.id
        JOIN
            transfer_sku ON transfer_sku.transfer_id = transfer.id
        ${whereClause(sql`transfer_sku.sku_id = ${query.skuId}`)}
        GROUP BY pos.id, pos_sku.price
    `;

    const purchaseSqlQuery = sql`
        SELECT
            pos.id, pos_sku.price, SUM(purchase_sku_pos.qty) as qty
        FROM
            pos
        JOIN 
            pos_sku ON pos_sku.pos_id = pos.id
        JOIN
            purchase_sku_pos ON purchase_sku_pos.pos_id = pos.id
        JOIN
            purchase_sku ON purchase_sku.id = purchase_sku_pos.purchase_sku_id
        ${whereClause(sql`purchase_sku.sku_id = ${query.skuId}`)}
        GROUP BY pos.id, pos_sku.price
    `;

    const saleSqlQuery = sql`
        SELECT
            pos.id, pos_sku.price, -SUM(sale_sku.qty) as qty
        FROM
            pos
        JOIN 
            pos_sku ON pos_sku.pos_id = pos.id
        JOIN
            seller ON pos.id = seller.pos_id
        JOIN
            sale ON sale.seller_id = seller.id
        JOIN
            sale_sku ON sale_sku.sale_id = sale.id
        ${whereClause(sql`sale_sku.sku_id = ${query.skuId}`)}
        GROUP BY pos.id, pos_sku.price
    `;

    const totalsSqlQuery = sql`
        SELECT
            id as posId, price, SUM(qty) as qty
        FROM
            (${transferFromSqlQuery}
            UNION ALL
            ${transferToSqlQuery}
            UNION ALL
            ${purchaseSqlQuery}
            UNION ALL
            ${saleSqlQuery}) as totals
        GROUP BY id, price
        HAVING qty > 0
    `;

    SqlHelper.logSql(this.debug, totalsSqlQuery);

    const [rows] = await this.db.query(totalsSqlQuery);

    SqlHelper.log(this.debug, rows);

    return rows as SkuQtyRow[];
    return [] as SkuQtyRow[];
  }
}

export interface PosIdQueryRequestData {
  skuId: number;
  posId?: number;
}

export interface PosTypeQueryRequestData {
  skuId: number;
  posType?: PosType;
}

export interface SkuQtyRow {
  posId: number;
  qty: number;
  price: number;
}
