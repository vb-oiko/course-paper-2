import { RowDataPacket } from "mysql2/promise";
import { InsertRow, Supplier } from "../types";
import BaseRepo from "./BaseRepo";

export default class SupplierRepo extends BaseRepo<Supplier> {
  table = "supplier";

  mapToDb(data: InsertRow<Supplier>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Supplier {
    const { id, name } = data;

    return {
      id,
      name,
    };
  }
}
