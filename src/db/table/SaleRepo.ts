import { RowDataPacket } from "mysql2/promise";
import { InsertRow, Sale } from "../../types";
import BaseRepo from "./BaseRepo";

export default class SaleRepo extends BaseRepo<Sale> {
  table = "sale";

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
