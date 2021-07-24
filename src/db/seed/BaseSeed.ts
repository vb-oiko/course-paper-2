import { Connection } from "mysql2/promise";
import BaseRepo from "../../repo/BaseRepo";
import { InsertRow } from "../../types";

export interface Seed {
  up(): Promise<void>;
  down(): Promise<void>;
}

export default abstract class BaseSeed<T> implements Seed {
  repo: BaseRepo;
  table: string;

  constructor(db: Connection) {
    this.repo = new BaseRepo(db);
    this.table = "";
  }

  build(): InsertRow<T>[] {
    return [];
  }

  async up(): Promise<void> {
    await this.repo
      .saveAll(this.build())
      .then((entities) =>
        console.log(`added ${entities.length} rows to table ${this.table}`)
      )
      .catch((err) =>
        console.warn(`error adding rows to table ${this.table}: `, err)
      );
  }

  async down(): Promise<void> {
    return this.repo
      .deleteAll()
      .then((rows) =>
        console.log(`deleted ${rows} rows in table ${this.table}`)
      )
      .catch((err) =>
        console.warn(`error deleting rows in table ${this.table}: `, err)
      );
  }

  newCollection<T>(n: number, factory: () => InsertRow<T>): InsertRow<T>[] {
    return Array(n).fill(null).map(factory);
  }
}
