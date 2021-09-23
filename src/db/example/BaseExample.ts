import { Connection } from "mysql2/promise";

export default class BaseExample {
  db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  public async run(): Promise<void> {
    throw new Error("Method run is not implemented");
  }
}
