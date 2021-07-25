import { InsertRow, Repo } from "../types";
import sql, { raw, join } from "sql-template-tag";
import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { format, parse } from "date-fns";

export default class BaseRepo<T> implements Repo<T> {
  db: Connection;
  private BATCH_SIZE = 100;

  table = "";

  constructor(db: Connection) {
    this.db = db;
  }

  async save(rows: InsertRow<T>[]): Promise<T[]> {
    if (rows.length === 0) {
      return [];
    }

    if (rows.length <= this.BATCH_SIZE) {
      return this.saveBatch(rows);
    }

    const batches = new Array(Math.ceil(rows.length / this.BATCH_SIZE))
      .fill(null)
      .map((_, ind) =>
        rows.slice(ind * this.BATCH_SIZE, (ind + 1) * this.BATCH_SIZE)
      );

    const savedBatches = await Promise.all(
      batches.map((batch) => this.saveBatch(batch))
    );

    return savedBatches.flat();
  }

  async saveBatch(rows: InsertRow<T>[]): Promise<T[]> {
    if (rows.length === 0) {
      return [];
    }

    const fields = Object.keys(rows[0]).filter(([key]) => key !== "id");

    const getValuesArray = (row: InsertRow<T>): any[] =>
      fields.map((field) => (row as Record<string, unknown>)[field]);

    const values = join(
      rows.map((row) => sql`(${join(getValuesArray(row), ",")})`)
    );

    const q = sql`
        INSERT INTO ${raw("db." + this.table)} (${raw(fields.join(","))}) 
            VALUES ${values}
    `;

    const res = (await this.db.query(q)) as ResultSetHeader[];
    const { insertId } = res[0];

    return rows.map(
      (row, ind) => ({ ...row, id: insertId + ind } as unknown as T)
    );
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
    return format(date, "yyyy-MM-DD HH-mm-ss");
  }

  dateTimeToDate(datetime: string): Date {
    return parse(datetime, "yyyy-MM-DD HH-mm-ss", new Date());
  }
}
