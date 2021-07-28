import { RowDataPacket } from "mysql2/promise";
import { InsertRow, Supplier } from "../../types";
import BaseTable from "./BaseTable";

export default class SupplierTable extends BaseTable<Supplier> {
  tableName = "supplier";

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
