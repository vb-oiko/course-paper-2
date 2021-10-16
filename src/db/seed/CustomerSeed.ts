import { Connection } from "mysql2/promise";
import CustomerTable from "../table/CustomerTable";
import { Customer } from "../../entity/Customer";
import { InsertRow } from "../../types";
import CustomerFactory from "../factory/CustomerFactory";
import BaseSeed from "./BaseSeed";

export default class CustomerSeed extends BaseSeed<Customer> {
  constructor(db: Connection) {
    super(db);
    this.table = new CustomerTable(db);
    this.tableName = "customer";
  }

  async build(): Promise<InsertRow<Customer>[]> {
    return this.newCollection(20, CustomerFactory.build);
  }
}
