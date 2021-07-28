import { RowDataPacket } from "mysql2/promise";
import { InsertRow, PurchaseSku } from "../../types";
import BaseTable from "./BaseTable";

export default class PurchaseSkuTable extends BaseTable<PurchaseSku> {
  tableName = "purchase_sku";

  mapToDb(data: InsertRow<PurchaseSku>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): PurchaseSku {
    const { id, sku_id, purchase_id, price } = data;

    return {
      id,
      sku_id,
      purchase_id,
      price: Number(price),
    };
  }
}
