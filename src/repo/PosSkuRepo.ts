import { RowDataPacket } from "mysql2/promise";
import { InsertRow, PosSku } from "../types";
import BaseRepo from "./BaseRepo";

export default class SkuRepo extends BaseRepo<PosSku> {
  table = "pos_sku";

  mapToDb(data: InsertRow<PosSku>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): PosSku {
    const { id, sku_id, pos_id, price } = data;

    return {
      id,
      sku_id,
      pos_id,
      price: Number(price),
    };
  }
}
