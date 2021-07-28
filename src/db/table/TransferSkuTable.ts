import { RowDataPacket } from "mysql2/promise";
import { InsertRow, TransferSku } from "../../types";
import BaseTable from "./BaseTable";

export default class TransferSkuTable extends BaseTable<TransferSku> {
  tableName = "transfer_sku";

  mapToDb(data: InsertRow<TransferSku>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): TransferSku {
    const { id, sku_id, transfer_id, qty } = data;

    return {
      id,
      sku_id,
      transfer_id,
      qty: Number(qty),
    };
  }
}
