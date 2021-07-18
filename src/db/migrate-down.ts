import sql from "sql-template-tag";
import DB from "./connection";

const q = sql`DROP TABLE db.pos`;

const migrateDown = async () => {
  const db = await DB.getConnection();

  await db.connect();
  await db.query(q).catch((err) => console.warn(err));
  await db.end();
};

migrateDown();
