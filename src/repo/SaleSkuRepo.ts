import { RowDataPacket } from "mysql2/promise";
import { InsertRow, SaleSku } from "../types";
import BaseRepo from "./BaseRepo";

export default class SaleSkuRepo extends BaseRepo<SaleSku> {
  table = "sale_sku";

  mapToDb(data: InsertRow<SaleSku>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): SaleSku {
    const { id, sku_id, sale_id, qty, price } = data;

    return {
      id,
      sku_id,
      sale_id,
      qty: Number(qty),
      price: Number(price),
    };
  }
}
