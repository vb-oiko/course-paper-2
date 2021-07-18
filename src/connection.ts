import {createConnection, Connection} from "mysql2";
import dotenv from "dotenv";

export default class DB {
    private static instance: DB = new DB();

    connection: Connection;

    private constructor() {
        dotenv.config();

        this.connection = createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD
        });
    }

    static getInstance(): DB {
        return this.instance;
    }
}