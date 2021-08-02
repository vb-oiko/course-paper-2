import { format as formatDate, parse as parseDate } from "date-fns";
import {
  Connection,
  format as formatSql,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";
import sql, { empty, join, raw, Sql, Value } from "sql-template-tag";
import { InsertRow, Table } from "../../types";

export default class BaseTable<T> implements Table<T> {
  db: Connection;
  private BATCH_SIZE = 100;
  debug: boolean;

  tableName = "";

  constructor(db: Connection, debug = false) {
    this.db = db;
    this.debug = debug;
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

    const getValuesArray = (row: InsertRow<T>): Value[] =>
      fields.map((field) => (row as Record<string, unknown>)[field]) as Value[];

    const values = join(
      rows.map((row) => sql`(${join(getValuesArray(row), ",")})`)
    );

    const q = sql`
        INSERT INTO ${raw("db." + this.tableName)} (${raw(fields.join(","))}) 
            VALUES ${values}
    `;

    const res = (await this.db.query(q)) as ResultSetHeader[];
    const { insertId } = res[0];

    return rows.map(
      (row, ind) => ({ ...row, id: insertId + ind } as unknown as T)
    );
  }

  async deleteAll(): Promise<number> {
    const q = sql`DELETE FROM ${raw("db." + this.tableName)}`;

    const res = (await this.db.query(q)) as ResultSetHeader[];
    const { affectedRows } = res[0];

    return affectedRows;
  }

  async findAll(): Promise<T[]> {
    const q = sql`SELECT * FROM ${raw("db." + this.tableName)}`;

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
    return formatDate(date, "yyyy-MM-dd HH-mm-ss");
  }

  dateTimeToDate(datetime: string): Date {
    return parseDate(datetime, "yyyy-MM-dd HH-mm-ss", new Date());
  }

  joinWithAnd(values: Sql[]): Sql {
    return join(
      values.filter((value) => value.text !== ""),
      " AND "
    );
  }

  getDateRangeConditions(query: DateRangeRequestData, field: string): Sql[] {
    const { from, to } = query;
    const fromCondition = from
      ? sql`${raw(field)} > ${this.dateToDateTime(from)}`
      : empty;
    const toCondition = to
      ? sql`${raw(field)} < ${this.dateToDateTime(to)}`
      : empty;

    return [fromCondition, toCondition];
  }

  getLimitOffsetClause(query: LimitOffsetRequestData): Sql[] {
    const { limit, offset } = query;
    const limitStatement = limit ? sql`LIMIT ${limit}` : empty;
    const offsetStatement = offset ? sql`OFFSET ${offset}` : empty;

    return [limitStatement, offsetStatement];
  }

  formatSql(sql: Sql): string {
    return formatSql(sql.sql, sql.values);
  }

  addLimitOffsetClause(
    sqlQuery: Sql,
    limitOffsetQuery: LimitOffsetRequestData
  ): Sql {
    return join(
      [sqlQuery, ...this.getLimitOffsetClause(limitOffsetQuery)],
      " "
    );
  }

  async getList(listSqlQuery: Sql): Promise<T[]> {
    const [rows] = await this.db.query(listSqlQuery);
    const list = (rows as RowDataPacket[]).map((row) => this.mapFromDb(row));

    if (this.debug) {
      console.log("list sql: ", this.formatSql(listSqlQuery));
      console.log("list:", list);
    }

    return list;
  }

  async getTotal(listSqlQuery: Sql): Promise<number> {
    const totalSqlQuery = sql`
    SELECT 
      COUNT(*) as total
    FROM (${listSqlQuery}) as list
    `;

    const [totalRows] = await this.db.query(totalSqlQuery);
    const total = (totalRows as RowDataPacket[])[0].total as unknown as number;

    if (this.debug) {
      console.log("total sql: ", this.formatSql(totalSqlQuery));
      console.log("total:", total);
    }

    return total;
  }
}

export interface DateRangeRequestData {
  from?: Date;
  to?: Date;
}

export interface LimitOffsetRequestData {
  limit?: number;
  offset?: number;
}
