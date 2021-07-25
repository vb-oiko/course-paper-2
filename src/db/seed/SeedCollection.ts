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
    for (let i = 0; i < this.seeds.length; i++) {
      await this.seeds[i].up();
    }
  }

  async down(): Promise<void> {
    for (let i = this.seeds.length - 1; i >= 0; i--) {
      await this.seeds[i].down();
    }
  }
}
