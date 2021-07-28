import DB from "./db/connection";
import PosTable from "./db/table/PosTable";

const main = async () => {
  const db = await DB.getConnection();

  const posTable = new PosTable(db);

  const allPos = await posTable.findAllPos();

  console.warn({allPos});

  await db.end();
};

main();
