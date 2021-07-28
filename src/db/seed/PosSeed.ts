import { Connection } from "mysql2/promise";
import PosTable from "../table/PosTable";
import { InsertRow, Pos } from "../../types";
import PosFactory from "../factory/PosFactory";
import BaseSeed from "./BaseSeed";

export default class PosSeed extends BaseSeed<Pos> {
  constructor(db: Connection) {
    super(db);
    this.table = new PosTable(db);
    this.tableName = "pos";
  }

  async build(): Promise<InsertRow<Pos>[]> {
    return this.newCollection(10, PosFactory.build);
  }
}
