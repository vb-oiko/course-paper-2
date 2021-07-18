import DB from "./db/connection";
import PosRepo from "./repo/PosRepo";

const main = async () => {
  const db = await DB.getConnection();

  const posRepo = new PosRepo(db);

  posRepo.save(posRepo.fake());
  posRepo.save(posRepo.fake());
  const allPos = await posRepo.findAllPos();

  console.warn({allPos});

  await db.end();
};

main();
