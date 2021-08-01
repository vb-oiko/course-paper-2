import { Connection } from "mysql2/promise";
import { InsertRow, Sku } from "../../types";
import SkuFactory from "../factory/SkuFactory";
import CategoryTable from "../table/CategoryTable";
import SkuTable from "../table/SkuTable";
import BaseSeed from "./BaseSeed";

export default class SkuSeed extends BaseSeed<Sku> {
  constructor(db: Connection) {
    super(db);
    this.db = db;
    this.table = new SkuTable(db);
    this.tableName = "sku";
  }

  async build(): Promise<InsertRow<Sku>[]> {
    const categoryTable = new CategoryTable(this.db);
    const categories = this.generateRandomSequence(
      await categoryTable.findAll(),
      20
    );

    return categories.map((category) => SkuFactory.build({ category }));
  }
}
