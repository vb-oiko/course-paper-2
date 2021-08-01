import { Connection } from "mysql2/promise";
import CategoryTable from "../table/CategoryTable";
import { InsertRow, Category } from "../../types";
import CategoryFactory from "../factory/CategoryFactory";
import BaseSeed from "./BaseSeed";

export default class CategorySeed extends BaseSeed<Category> {
  constructor(db: Connection) {
    super(db);
    this.table = new CategoryTable(db);
    this.tableName = "category";
  }

  async build(): Promise<InsertRow<Category>[]> {
    return this.newCollection(4, CategoryFactory.build);
  }
}
