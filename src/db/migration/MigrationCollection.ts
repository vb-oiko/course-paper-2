import { Connection } from "mysql2/promise";
import { Migration } from "./BaseMigration";

export default class MigrationCollection {
  db: Connection;
  migrations: Migration[] = [];

  constructor(db: Connection) {
    this.db = db;
  }

  add(migration: Migration): void {
    this.migrations.push(migration);
  }

  async up(): Promise<void> {
    await Promise.all(this.migrations.map((migration) => migration.up()));
  }

  async down(): Promise<void> {
    await Promise.all(
      [...this.migrations].reverse().map((migration) => migration.down())
    );
  }
}
