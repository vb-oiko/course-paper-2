import { RowDataPacket } from "mysql2/promise";
import { InsertRow, Customer } from "../../types";
import BaseRepo from "./BaseRepo";

export default class CustomerRepo extends BaseRepo<Customer> {
  table = "customer";

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
