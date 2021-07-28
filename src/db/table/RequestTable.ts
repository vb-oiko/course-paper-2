import { RowDataPacket } from "mysql2/promise";
import { InsertRow, Request } from "../../types";
import BaseTable from "./BaseTable";

export default class RequestTable extends BaseTable<Request> {
  tableName = "request";

  mapToDb(data: InsertRow<Request>): RowDataPacket {
    const { date, pos_id, fulfilled } = data;
    
    return {
      date: this.dateToDateTime(date),
      pos_id,
      fulfilled,
    } as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Request {
    const { id, date, pos_id, fulfilled } = data;

    return {
      id,
      date: this.dateTimeToDate(date),
      pos_id,
      fulfilled: Boolean(fulfilled),
    };
  }
}