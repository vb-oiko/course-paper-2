import { Connection } from "mysql2/promise";
import BaseRepo from "../repo/BaseRepo";
import { Entity, InsertRow } from "../../types";
import faker from "faker";

export interface Seed {
  up(): Promise<void>;
  down(): Promise<void>;
}

export default abstract class BaseSeed<T> implements Seed {
  repo: BaseRepo<T>;
  table: string;
  db: Connection;

  constructor(db: Connection) {
    this.db = db;
    this.repo = new BaseRepo(db);
    this.table = "";
  }

  async build(): Promise<InsertRow<T>[]> {
    return [];
  }

  async up(): Promise<void> {
    await this.repo
      .save(await this.build())
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
        console.log(`deleted ${rows} rows from table ${this.table}`)
      )
      .catch((err) =>
        console.warn(`error deleting rows from table ${this.table}: `, err)
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
    countA = 0,
    countB = 0
  ): Entity[][] {
    return this.selectRandomItems(collectionA, countA).flatMap((a) =>
      this.selectRandomItems(collectionB, countB).map((b) => [a, b])
    );
  }
}
