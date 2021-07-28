import DB from "./db/connection";
import PosRepo from "./db/table/PosRepo";

const main = async () => {
  const db = await DB.getConnection();

  const posRepo = new PosRepo(db);

  const allPos = await posRepo.findAllPos();

  console.warn({allPos});

  await db.end();
};

main();
