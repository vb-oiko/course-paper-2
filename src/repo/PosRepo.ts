import { InsertRow, Pos, PosCollection, Repo } from "../types";
import sql from "sql-template-tag";
import BaseRepo from "./BaseRepo";

export default class PosRepo extends BaseRepo implements Repo<Pos> {
  table = "pos";

  async findAllPos(): Promise<PosCollection> {
    const q = sql`
            SELECT * from db.pos
        `;
    const [result] = await this.db.query(q);

    return result as Pos[];
  }

  async save(pos: InsertRow<Pos>): Promise<Pos> {
    return super.save(pos) as Promise<Pos>;
  }

  async saveAll(stores: InsertRow<Pos>[]): Promise<Pos[]> {
    return super.saveAll(stores) as Promise<Pos[]>;
  }
}
