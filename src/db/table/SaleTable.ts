import { RowDataPacket } from "mysql2/promise";
import sql, { Sql } from "sql-template-tag";

import { InsertRow, Sale } from "../../types";
import SqlHelper from "../SqlHelper";
import BaseTable from "./BaseTable";

export default class SaleTable extends BaseTable<Sale> {
  tableName = "sale";

  mapToDb(data: InsertRow<Sale>): RowDataPacket {
    const { date, seller_id, customer_id } = data;

    return {
      date: SqlHelper.dateToDateTime(date),
      seller_id,
      customer_id,
    } as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Sale {
    const { id, date, seller_id, customer_id } = data;

    return {
      id,
      date,
      seller_id,
      customer_id,
    };
  }

  getJoinedTablesStatement(): Sql {
    return sql`
      JOIN seller ON sale.seller_id = seller.id
      JOIN pos ON seller.pos_id = pos.id
    `;
  }
}
