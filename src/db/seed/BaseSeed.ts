import { Connection } from "mysql2/promise";
import BaseTable from "../table/BaseTable";
import { InsertRow } from "../../types";
import faker from "faker";
import { Entity } from "../../entity/Entity";

export interface Seed {
  up(): Promise<void>;
  down(): Promise<void>;
}

export default abstract class BaseSeed<T> implements Seed {
  table: BaseTable<T>;
  tableName: string;
  db: Connection;

  constructor(db: Connection) {
    this.db = db;
    this.table = new BaseTable(db);
    this.tableName = "";
  }

  async build(): Promise<InsertRow<T>[]> {
    return [];
  }

  async up(): Promise<void> {
    await this.table
      .save(await this.build())
      .then((entities) =>
        console.log(`added ${entities.length} rows to table ${this.tableName}`)
      )
      .catch((err) =>
        console.warn(`error adding rows to table ${this.tableName}: `, err)
      );
  }

  async down(): Promise<void> {
    return this.table
      .deleteAll()
      .then((rows) =>
        console.log(`deleted ${rows} rows from table ${this.tableName}`)
      )
      .catch((err) =>
        console.warn(`error deleting rows from table ${this.tableName}: `, err)
      );
  }

  newCollection<T>(n: number, factory: () => InsertRow<T>): InsertRow<T>[] {
    return Array(n).fill(null).map(factory);
  }

  selectRandomItems<T>(collection: T[], n = 0): T[] {
    return !n || n >= collection.length
      ? collection
      : faker.helpers.shuffle(collection).slice(0, n);
  }

  generateRandomSequence<T>(collection: T[], n = 0): T[] {
    return new Array(Math.ceil(n / collection.length))
      .fill(null)
      .flatMap(() => faker.helpers.shuffle(collection))
      .slice(0, n);
  }

  multiplyCollections(
    collectionA: Entity[],
    collectionB: Entity[],
    limitA = 0,
    limitB = 0
  ): Entity[][] {
    return this.selectRandomItems(collectionA, limitA).flatMap((a) =>
      this.selectRandomItems(collectionB, limitB).map((b) => [a, b])
    );
  }
}
