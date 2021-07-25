import { InsertRow, Repo } from "../types";
import sql, { raw, join } from "sql-template-tag";
import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { format, parse } from "date-fns";

export default class BaseRepo<T> implements Repo<T> {
  db: Connection;

  table = "";

  constructor(db: Connection) {
    this.db = db;
  }

  async save(entity: InsertRow<T>): Promise<T> {
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
    return { ...entity, id } as unknown as T;
  }

  async saveAll(entities: InsertRow<T>[]): Promise<T[]> {
    return Promise.all(entities.map((entity) => this.save(entity)));
  }

  async deleteAll(): Promise<number> {
    const q = sql`DELETE FROM ${raw("db." + this.table)}`;

    const res = (await this.db.query(q)) as ResultSetHeader[];
    const { affectedRows } = res[0];

    return affectedRows;
  }

  async findAll(): Promise<T[]> {
    const q = sql`SELECT * FROM ${raw("db." + this.table)}`;

    const [rows] = await this.db.query(q);

    return (rows as RowDataPacket[]).map((row) => this.mapFromDb(row));
  }

  mapToDb(data: InsertRow<T>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): T {
    return data as T;
  }

  booleanToInt(value: boolean): number {
    return value ? 1 : 0;
  }

  intToBoolean(value: number): boolean {
    return value !== 0;
  }

  dateToDateTime(date: Date = new Date()): string {
    return format(date, "YYYY-MM-DD HH-mm-ss");
  }

  dateTimeToDate(datetime: string): Date {
    return parse(datetime, "YYYY-MM-DD HH-mm-ss", new Date());
  }
}
