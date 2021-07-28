import { RowDataPacket } from "mysql2/promise";
import { InsertRow, RequestSku } from "../../types";
import BaseTable from "./BaseTable";

export default class RequestSkuTable extends BaseTable<RequestSku> {
  tableName = "request_sku";

  mapToDb(data: InsertRow<RequestSku>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): RequestSku {
    const { id, sku_id, request_id, qty } = data;

    return {
      id,
      sku_id,
      request_id,
      qty: Number(qty),
    };
  }
}
