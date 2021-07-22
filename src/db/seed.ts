import DB from "./connection";
import PosMock from "./mock/PosMock";
import PosRepo from "../repo/PosRepo";
import SkuRepo from "../repo/SkuRepo";
import SkuMock from "./mock/SkuMock";

const main = async () => {
  const db = await DB.getConnection();

  const posRepo = new PosRepo(db);
  const skuRepo = new SkuRepo(db);

  await posRepo.save(PosMock.build());
  await posRepo.save(PosMock.build());

  await skuRepo.save(SkuMock.build());

  await db.end();
};

main();
