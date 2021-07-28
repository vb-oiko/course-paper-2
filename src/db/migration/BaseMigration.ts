import sql, { raw, Sql } from "sql-template-tag";
import { Connection } from "mysql2/promise";

export interface Migration {
  table: string;
  columns: Sql;
  up(): Promise<void>;
  down(): Promise<void>;
}

export default class BaseMigration implements Migration {
  table = "";
  columns= sql``;
  db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async up(): Promise<void> {
    await this.db
      .execute(
        sql`
          CREATE TABLE ${raw(this.table)} (
            ${this.columns}
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `
      )
      .then(() => console.log(`table ${this.table} created`))
      .catch((err) =>
        console.warn(`error creating table ${this.table}: `, err)
      );
  }
  async down(): Promise<void> {
    await this.db
      .execute(sql`DROP TABLE ${raw(this.table)}`)
      .then(() => console.log(`table ${this.table} dropped`))
      .catch((err) =>
        console.warn(`error dropping table ${this.table}: `, err)
      );
  }
}
