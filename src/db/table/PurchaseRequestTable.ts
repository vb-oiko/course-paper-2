import { RowDataPacket } from "mysql2/promise";
import { InsertRow, PurchaseRequest } from "../../types";
import BaseTable from "./BaseTable";

export default class PurchaseRequestTable extends BaseTable<PurchaseRequest> {
  tableName = "purchase_request";

  mapToDb(data: InsertRow<PurchaseRequest>): RowDataPacket {
    const { purchase_id, request_id } = data;

    return {
      purchase_id,
      request_id,
    } as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): PurchaseRequest {
    const { id, purchase_id, request_id } = data;

    return {
      id,
      purchase_id,
      request_id,
    };
  }
}
