import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import sql, { empty, join, raw, RawValue, Sql, Value } from "sql-template-tag";
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
      console.log("\n??????????????:\n");
      console.log("\nSQL ??????????:\n");
      SqlHelper.logSql(this.debug, listSqlQuery);
      console.log("\n?????????????????? ????????????:\n");
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
      console.log("\n???????????????? ??????????????????:\n");
      console.log("\nSQL ??????????:\n");
      SqlHelper.logSql(this.debug, totalSqlQuery);
      console.log("\n?????????????????? ????????????:\n");
      SqlHelper.log(this.debug, totalRows);
    }

    return total;
  }

  debugLogQuery(query: unknown): void {
    if (this.debug) {
      console.log("query parameters: ", query);
    }
  }

  async getMany(
    query: Record<string, unknown>
  ): Promise<ApiGetListResponse<T>> {
    const {
      _start: start,
      _end: end,
      _order,
      _sort: sort,
      id,
      ...filter
    } = query;
    const order = _order ? _order : "ASC";
    const offsetClause = Number(start) ? sql`OFFSET ${Number(start)}` : empty;

    const limitClause =
      start && end && Number(end) - Number(start) > 0
        ? sql`LIMIT ${Number(end) - Number(start)}`
        : empty;

    const orderClause = sort
      ? sql`ORDER BY ${raw(String(sort))} ${raw(String(order))}`
      : empty;

    const filterConditions = Object.entries(filter)
      .filter(([key, value]) => key !== "id")
      .map(([key, value]) => sql`${raw(key)} = ${value as RawValue}`);

    const idCondition = SqlHelper.getIdCondition(id as string | string[]);

    const conditions = [...filterConditions, idCondition].filter(
      (sql) => sql.text
    );

    const whereClause = conditions.length
      ? sql`WHERE ${join(conditions, " AND ")}`
      : empty;

    const listSqlQuery = sql`
      SELECT * FROM ${raw("db." + this.tableName)}
    `;

    const filteredSqlQuery = join([listSqlQuery, whereClause], " ");

    const paginatedSqlQuery = join(
      [filteredSqlQuery, orderClause, limitClause, offsetClause],
      " "
    );

    const [rows] = await this.db.query(paginatedSqlQuery);

    const list = (rows as RowDataPacket[]).map((row) => this.mapFromDb(row));

    const totalSqlQuery = sql`
      SELECT 
        COUNT(*) as total
      FROM (${filteredSqlQuery}) as list
    `;

    const [totalRows] = await this.db.query(totalSqlQuery);
    const total = (totalRows as RowDataPacket[])[0].total as unknown as number;

    return {
      list,
      total,
    };
  }

  async getOne(id: string): Promise<T> {
    const listQuery = sql`
      SELECT 
        * 
      FROM 
        ${raw("db." + this.tableName)}
      WHERE
        id = ${Number(id)}
    `;

    const [rows] = await this.db.query(listQuery);

    return this.mapFromDb((rows as RowDataPacket[])[0]);
  }

  async update(entity: T): Promise<T> {
    const { id, ...rest } = entity as unknown as Record<string, RawValue>;

    const assignmentList = join(
      Object.entries(rest).map(([key, value]) => sql`${raw(key)} = ${value}`)
    );

    const updateQuery = sql`
      UPDATE 
        ${raw("db." + this.tableName)}
      SET
        ${assignmentList}
      WHERE
        id = ${Number(id)}
    `;

    await this.db.query(updateQuery);

    return await this.getOne(String(id));
  }

  async create(entity: T): Promise<T> {
    const columnList = join(Object.keys(entity).map((key) => sql`${raw(key)}`));

    const valueList = join(Object.values(entity).map((value) => sql`${value}`));

    const createQuery = sql`
      INSERT INTO 
        ${raw("db." + this.tableName)}
        (${columnList})
        VALUES
        (${valueList})
    `;

    const [resultSetHeader] = await this.db.query(createQuery);
    const id = (resultSetHeader as ResultSetHeader).insertId;
    return { id, ...entity };
  }

  async delete(id: string): Promise<number> {
    const deleteQuery = sql`
      DELETE FROM 
        ${raw("db." + this.tableName)}
      WHERE
        id = ${Number(id)}
    `;

    await this.db.query(deleteQuery);

    return Number(id);
  }
}

export interface ApiGetListResponse<T> {
  list: T[];
  total: number;
}
