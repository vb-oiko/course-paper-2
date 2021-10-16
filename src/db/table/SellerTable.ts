import { RowDataPacket } from "mysql2/promise";
import { Seller } from "../../entity/Seller";
import { InsertRow } from "../../types";
import BaseTable from "./BaseTable";

export default class SellerTable extends BaseTable<Seller> {
  tableName = "seller";

  mapToDb(data: InsertRow<Seller>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Seller {
    const { id, pos_id, name, salary } = data;

    return {
      id,
      pos_id,
      name,
      salary: Number(salary),
    };
  }
}
