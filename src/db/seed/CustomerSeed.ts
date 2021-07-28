import { Connection } from "mysql2/promise";
import CustomerRepo from "../repo/CustomerRepo";
import { InsertRow, Customer } from "../../types";
import CustomerFactory from "../factory/CustomerFactory";
import BaseSeed from "./BaseSeed";

export default class CustomerSeed extends BaseSeed<Customer> {
  constructor(db: Connection) {
    super(db);
    this.repo = new CustomerRepo(db);
    this.table = "customer";
  }

  async build(): Promise<InsertRow<Customer>[]> {
    return this.newCollection(20, CustomerFactory.build);
  }
}
