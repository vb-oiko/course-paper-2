import { RowDataPacket } from "mysql2/promise";
import { InsertRow, Transfer } from "../../types";
import BaseRepo from "./BaseRepo";

export default class TransferRepo extends BaseRepo<Transfer> {
  table = "transfer";

  mapToDb(data: InsertRow<Transfer>): RowDataPacket {
    const { date, from_pos_id, to_pos_id } = data;

    return {
      date: this.dateToDateTime(date),
      from_pos_id,
      to_pos_id,
    } as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Transfer {
    const { id, date, from_pos_id, to_pos_id } = data;

    return {
      id,
      date: this.dateTimeToDate(date),
      from_pos_id,
      to_pos_id,
    };
  }
}
