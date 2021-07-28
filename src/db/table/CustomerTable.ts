import { RowDataPacket } from "mysql2/promise";
import { InsertRow, Customer } from "../../types";
import BaseTable from "./BaseTable";

export default class CustomerTable extends BaseTable<Customer> {
  tableName = "customer";

  mapToDb(data: InsertRow<Customer>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Customer {
    const { id, name } = data;

    return {
      id,
      name,
    };
  }
}
