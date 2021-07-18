import DB from "./db/connection";

const main = async () => {
  const db = await DB.getConnection();
  const [res] = await db.query("SELECT * from pos");
  console.warn({ res });
  await db.end();
};

main();
