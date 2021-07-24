import { Connection } from "mysql2/promise";
import posRepo from "../../repo/PosRepo";
import { InsertRow, Pos } from "../../types";
import PosFactory from "../factory/PosFactory";
import BaseSeed from "./BaseSeed";

export default class PosSeed extends BaseSeed<Pos> {
  constructor(db: Connection) {
    super(db);
    this.repo = new posRepo(db);
    this.table = "pos";
  }

  build(): InsertRow<Pos>[] {
    return this.newCollection(5, PosFactory.build);
  }
}
