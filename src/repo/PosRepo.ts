import { Pos, PosCollection } from "../types";
import sql from "sql-template-tag";
import BaseRepo from "./BaseRepo";

export default class PosRepo extends BaseRepo {
  table = "pos";
  
  async findAllPos(): Promise<PosCollection> {
    const q = sql`
            SELECT * from db.pos
        `;
    const [result] = await this.db.query(q);

    return result as Pos[];
  }
}
