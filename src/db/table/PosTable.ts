import { InsertRow, Pos, PosCollection } from "../../types";
import sql from "sql-template-tag";
import BaseTable from "./BaseTable";
import { RowDataPacket } from "mysql2/promise";

export default class PosTable extends BaseTable<Pos> {
  tableName = "pos";

  async findAllPos(): Promise<PosCollection> {
    const q = sql`
            SELECT * from db.pos
        `;
    const [result] = await this.db.query(q);

    return result as Pos[];
  }

  mapToDb(data: InsertRow<Pos>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Pos {
    const {
      id,
      name,
      type,
      area,
      utilities,
      rent,
      floors,
      departments,
      halls,
      workplaces,
    } = data;

    return {
      id,
      name,
      type,
      area: Number(area),
      utilities: Number(utilities),
      rent: Number(rent),
      floors,
      departments,
      halls,
      workplaces,
    };
  }
}
