import { Connection } from "mysql2/promise";
import { Seed } from "./BaseSeed";

export default class SeedCollection {
  db: Connection;
  seeds: Seed[] = [];

  constructor(db: Connection) {
    this.db = db;
  }

  add(seed: Seed): void {
    this.seeds.push(seed);
  }

  async up(): Promise<void> {
    await Promise.all(this.seeds.map((seed) => seed.up()));
  }

  async down(): Promise<void> {
    await Promise.all([...this.seeds].reverse().map((seed) => seed.down()));
  }
}
