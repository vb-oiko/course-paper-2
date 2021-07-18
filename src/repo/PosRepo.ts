import { IPosRepo, Pos, PosCollection, PosTypes } from "../types";
import faker from "faker";
import sql from "sql-template-tag";
import { Connection } from "mysql2/promise";

export default class PosRepo implements IPosRepo {
  db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  fake(): Pos {
    return {
      id: 0,
      name: faker.company.companyName(),
      type: PosTypes.SHOPPING_MALL,
      area: faker.datatype.number(10000),
      utilities: faker.datatype.number(1000),
      rent: faker.datatype.number(1000),
      floors: faker.datatype.number(3),
      departments: faker.datatype.number(100),
      halls: faker.datatype.number(10),
      workplaces: faker.datatype.number(500),
    };
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
