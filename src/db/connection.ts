import { createConnection, Connection } from "mysql2/promise";
import dotenv from "dotenv";

export default class DB {
  private static connection: Connection;

  static async init(): Promise<Connection> {
    dotenv.config();
    this.connection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
    }).catch((err) => {
        console.warn("DB connection eror", err);
        return Promise.reject();
    });

    console.warn("DB connection created succesfully");
    return this.connection;
  }

  static async getConnection(): Promise<Connection> {
    if (this.connection) {
      return this.connection;
    }

    return this.init();
  }
}