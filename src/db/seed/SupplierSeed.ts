import { Connection } from "mysql2/promise";
import SupplierRepo from "../table/SupplierRepo";
import { InsertRow, Supplier } from "../../types";
import SupplierFactory from "../factory/SupplierFactory";
import BaseSeed from "./BaseSeed";

export default class SupplierSeed extends BaseSeed<Supplier> {
  constructor(db: Connection) {
    super(db);
    this.repo = new SupplierRepo(db);
    this.table = "supplier";
  }

  async build(): Promise<InsertRow<Supplier>[]> {
    return this.newCollection(20, SupplierFactory.build);
  }
}
