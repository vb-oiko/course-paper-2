import { Connection } from "mysql2/promise";
import SkuRepo from "../../repo/SkuRepo";
import { InsertRow, Sku } from "../../types";
import SkuFactory from "../factory/SkuFactory";
import BaseSeed from "./BaseSeed";

export default class SkuSeed extends BaseSeed<Sku> {
  constructor(db: Connection) {
    super(db);
    this.repo = new SkuRepo(db);
    this.table = "sku";
  }

  build(): InsertRow<Sku>[] {
    return this.newCollection(20, SkuFactory.build);
  }
}
