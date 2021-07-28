import { RowDataPacket } from "mysql2/promise";
import { InsertRow, Sale } from "../../types";
import BaseTable from "./BaseTable";

export default class SaleTable extends BaseTable<Sale> {
  tableName = "sale";

  mapToDb(data: InsertRow<Sale>): RowDataPacket {
    const { date, seller_id, customer_id } = data;

    return {
      date: this.dateToDateTime(date),
      seller_id,
      customer_id,
    } as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Sale {
    const { id, date, seller_id, customer_id } = data;

    return {
      id,
      date: this.dateTimeToDate(date),
      seller_id,
      customer_id,
    };
  }
}
