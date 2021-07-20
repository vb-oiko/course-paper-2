import sql from "sql-template-tag";
import DB from "./connection";

const q = {
  pos_sku: sql`DROP TABLE db.pos_sku`,
  sku: sql`DROP TABLE db.sku`,
  pos: sql`DROP TABLE db.pos`, 
};

const migrateDown = async () => {
  const db = await DB.getConnection();

  await db.connect();
  
  await Promise.all(
    Object.entries(q).map(([table, query]) =>
      db
        .execute(query)
        .then(() => console.log(`table ${table} created`))
        .catch((err) => console.warn(`error creating table ${table}: `, err))
    )
  );

  await db.end();
};

migrateDown();
