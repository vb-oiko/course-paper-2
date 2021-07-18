import sql from "sql-template-tag";
import DB from "./connection";

const db = DB.getInstance().connection;

const q = sql`DROP TABLE db.pos`;

db.connect();
db.query(q, (error, results, fields) => {
  if (error) throw error;
  console.log("table 'pos' deleted");
});
db.end();
