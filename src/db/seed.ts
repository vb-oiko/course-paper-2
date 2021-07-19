import DB from "./connection";
import PosMock from "../mock/PosMock";
import PosRepo from "../repo/PosRepo";

const main = async () => {
  const db = await DB.getConnection();

  const posRepo = new PosRepo(db);

  await posRepo.save(PosMock.build());
  await posRepo.save(PosMock.build());

  await db.end();
};

main();
