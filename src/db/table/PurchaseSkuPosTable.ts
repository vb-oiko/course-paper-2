import { RowDataPacket } from "mysql2/promise";
import { InsertRow, PurchaseSkuPos } from "../../types";
import BaseTable from "./BaseTable";

export default class PurchaseSkuPosTable extends BaseTable<PurchaseSkuPos> {
  tableName = "purchase_sku_pos";

  mapToDb(data: InsertRow<PurchaseSkuPos>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): PurchaseSkuPos {
    const { id, purchase_sku_id, pos_id, price } = data;

    return {
      id,
      purchase_sku_id,
      pos_id,
      qty: Number(price),
    };
  }
}
