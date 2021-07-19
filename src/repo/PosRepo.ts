import { IPosRepo, Pos, PosCollection } from "../types";
import sql from "sql-template-tag";
import { Connection } from "mysql2/promise";

export default class PosRepo implements IPosRepo {
  db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async save(pos: Pos): Promise<unknown> {
    const {
      name,
      type,
      area,
      utilities,
      rent,
      floors,
      departments,
      halls,
      workplaces,
    } = pos;
    const q = sql`
            INSERT INTO db.pos (name, type, area, utilities, rent, floors, departments, halls, workplaces) 
                VALUES (${name}, ${type}, ${area}, ${utilities}, ${rent}, ${floors}, ${departments}, ${halls}, ${workplaces});
        `;
    return this.db.query(q);
  }

  async findAllPos(): Promise<PosCollection> {
    const q = sql`
            SELECT * from db.pos
        `;
    const [result] = await this.db.query(q);

    return result as Pos[];
  }
}
