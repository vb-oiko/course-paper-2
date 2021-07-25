import { Entity, InsertRow, Repo } from "../types";
import sql, { raw, join } from "sql-template-tag";
import { Connection, ResultSetHeader } from "mysql2/promise";

export default class BaseRepo implements Repo<Entity> {
  db: Connection;

  table = "";

  constructor(db: Connection) {
    this.db = db;
  }

  async save(entity: InsertRow<Entity>): Promise<Entity> {
    const keyValuePairs = Object.entries(entity).filter(
      ([key]) => key !== "id"
    );

    const keys = keyValuePairs.map(([key]) => key);
    const values = keyValuePairs.map(([, value]) => value as string);

    const q = sql`
        INSERT INTO ${raw("db." + this.table)} (${raw(keys.join(","))}) 
            VALUES (${join(values, ",")})
    `;

    const res = (await this.db.query(q)) as ResultSetHeader[];
    const id = res[0].insertId;
    return { ...entity, id };
  }

  async saveAll(entities: InsertRow<Entity>[]): Promise<Entity[]> {
    return Promise.all(entities.map((entity) => this.save(entity)));
  }

  async deleteAll(): Promise<number> {
    const q = sql`DELETE FROM ${raw("db." + this.table)}`;

    const res = (await this.db.query(q)) as ResultSetHeader[];
    const { affectedRows } = res[0];
    
    return affectedRows;
  }

  async findAll(): Promise<Entity[]> {
    const q = sql`SELECT * FROM ${raw("db." + this.table)}`;

    const [rows] = await this.db.query(q);

    return rows as Entity[];
  }
}
