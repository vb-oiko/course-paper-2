import { RowDataPacket } from "mysql2/promise";
import { InsertRow, Sku } from "../../types";
import BaseRepo from "./BaseRepo";

export default class SkuRepo extends BaseRepo<Sku> {
  table = "sku";

  mapToDb(data: InsertRow<Sku>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Sku {
    const { id, name } = data;

    return {
      id,
      name,
    };
  }
}
