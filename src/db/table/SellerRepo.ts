import { RowDataPacket } from "mysql2/promise";
import { InsertRow, Seller } from "../../types";
import BaseRepo from "./BaseRepo";

export default class SellerRepo extends BaseRepo<Seller> {
  table = "seller";

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
