import { Connection } from "mysql2/promise";
import CategoryTable from "../table/CategoryTable";
import { InsertRow } from "../../types";
import CategoryFactory from "../factory/CategoryFactory";
import BaseSeed from "./BaseSeed";
import { Category } from "../../entity/Category";

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
