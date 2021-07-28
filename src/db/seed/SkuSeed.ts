import { Connection } from "mysql2/promise";
import SkuTable from "../table/SkuTable";
import { InsertRow, Sku } from "../../types";
import SkuFactory from "../factory/SkuFactory";
import BaseSeed from "./BaseSeed";

export default class SkuSeed extends BaseSeed<Sku> {
  constructor(db: Connection) {
    super(db);
    this.table = new SkuTable(db);
    this.tableName = "sku";
  }

  async build(): Promise<InsertRow<Sku>[]> {
    return this.newCollection(20, SkuFactory.build);
  }
}
