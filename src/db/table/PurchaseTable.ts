import { RowDataPacket } from "mysql2/promise";
import { InsertRow, Purchase } from "../../types";
import SqlHelper from "../SqlHelper";
import BaseTable from "./BaseTable";

export default class PurchaseTable extends BaseTable<Purchase> {
  tableName = "purchase";

  mapToDb(data: InsertRow<Purchase>): RowDataPacket {
    const { date, supplier_id } = data;

    return {
      date: SqlHelper.dateToDateTime(date),
      supplier_id,
    } as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Purchase {
    const { id, date, supplier_id } = data;

    return {
      id,
      date: SqlHelper.dateTimeToDate(date),
      supplier_id,
    };
  }
}
