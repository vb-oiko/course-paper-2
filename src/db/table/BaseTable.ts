import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import sql, { empty, join, raw, Sql, Value } from "sql-template-tag";
import { InsertRow, Table } from "../../types";
import SqlHelper from "../SqlHelper";

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

  async getList(listSqlQuery: Sql): Promise<T[]> {
    const [rows] = await this.db.query(listSqlQuery);
    const list = (rows as RowDataPacket[]).map((row) => this.mapFromDb(row));

    if (this.debug) {
      console.log("\nПерелік:\n");
      console.log("\nSQL запит:\n");
      SqlHelper.logSql(this.debug, listSqlQuery);
      console.log("\nРезультат запиту:\n");
      SqlHelper.log(this.debug, rows);
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
      console.log("\nЗагальна кількість:\n");
      console.log("\nSQL запит:\n");
      SqlHelper.logSql(this.debug, totalSqlQuery);
      console.log("\nРезультат запиту:\n");
      SqlHelper.log(this.debug, totalRows);
    }

    return total;
  }

  debugLogQuery(query: unknown): void {
    if (this.debug) {
      console.log("query parameters: ", query);
    }
  }

  async apiGetList(query: ApiListQuery): Promise<ApiGetListResponse<T>> {
    const { _start: start, _end: end } = query;
    const offsetClause = Number(start) ? sql`OFFSET ${Number(start)}` : empty;

    const limitClause =
      start && end && end - start > 0 ? sql`LIMIT ${end - start}` : empty;

    const listSqlQuery = sql`
      SELECT * FROM ${raw("db." + this.tableName)}
    `;

    const pageSqlQuery = join([listSqlQuery, limitClause, offsetClause], " ");
    SqlHelper.logSql(true, pageSqlQuery);
    const [rows] = await this.db.query(pageSqlQuery);

    const list = (rows as RowDataPacket[]).map((row) => this.mapFromDb(row));

    const totalSqlQuery = sql`
      SELECT 
        COUNT(*) as total
      FROM (${listSqlQuery}) as list
    `;

    const [totalRows] = await this.db.query(totalSqlQuery);
    const total = (totalRows as RowDataPacket[])[0].total as unknown as number;

    return {
      list,
      total,
    };
  }
}

export interface ApiListQuery {
  _start?: number;
  _end?: number;
}

export interface ApiGetListResponse<T> {
  list: T[];
  total: number;
}
