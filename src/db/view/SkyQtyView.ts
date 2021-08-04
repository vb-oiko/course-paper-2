import { Connection } from "mysql2/promise";
import sql from "sql-template-tag";

export default class SkuQtyView {
  db: Connection;
  debug: boolean;

  constructor(db: Connection, debug = false) {
    this.db = db;
    this.debug = debug;
  }

  async getByPosId(query: PosIdQuery): Promise<SkuQtyRow[]> {
    const { posId } = query;
    const transferFromSqlQuery = sql`
        SELECT
            sku.id, sku.name, -SUM(transfer_sku.qty) as qty
        FROM
            sku
        JOIN
            transfer_sku ON transfer_sku.sku_id = sku.id
        JOIN
            transfer ON transfer_sku.transfer_id = transfer.id
        WHERE
            transfer.from_pos_id = ${posId}
        GROUP BY sku.id
    `;

    const transferToSqlQuery = sql`
        SELECT
            sku.id, sku.name, SUM(transfer_sku.qty) as qty
        FROM
            sku
        JOIN
            transfer_sku ON transfer_sku.sku_id = sku.id
        JOIN
            transfer ON transfer_sku.transfer_id = transfer.id
        WHERE
            transfer.to_pos_id = ${posId}
        GROUP BY sku.id
    `;

    const purchaseSqlQuery = sql`
        SELECT
            sku.id, sku.name, SUM(purchase_sku_pos.qty) as qty
        FROM
            sku
        JOIN
            purchase_sku ON purchase_sku.sku_id = sku.id
        JOIN
            purchase_sku_pos ON purchase_sku_pos.purchase_sku_id = purchase_sku.id
        WHERE
            purchase_sku_pos.pos_id = ${posId}
        GROUP BY sku.id
    `;

    const saleSqlQuery = sql`
        SELECT
            sku.id, sku.name, -SUM(sale_sku.qty) as qty
        FROM
            sku
        JOIN
            sale_sku ON sale_sku.sku_id = sku.id
        JOIN
            sale ON sale_sku.sale_id = sale.id
        JOIN
            seller ON sale.seller_id = seller.id
        WHERE
            seller.pos_id = ${posId}
        GROUP BY sku.id
    `;

    const totalsSqlQuery = sql`
        SELECT
            id, name, SUM(qty) as qty
        FROM
            (${transferFromSqlQuery}
            UNION ALL
            ${transferToSqlQuery}
            UNION ALL
            ${purchaseSqlQuery}
            UNION ALL
            ${saleSqlQuery}) as totals
        GROUP BY id, name
        HAVING qty > 0
    `;

    const [rows] = await this.db.query(totalsSqlQuery);

    console.log(rows);

    return rows as SkuQtyRow[];
  }
}

export interface PosIdQuery {
  posId: number;
}

export interface SkuQtyRow {
  skuId: number;
  skuName: string;
  qty: number;
}
