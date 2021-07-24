import PosRepo from "../repo/PosRepo";
import SkuRepo from "../repo/SkuRepo";
import { InsertRow } from "../types";
import DB from "./connection";
import PosFactory from "./factory/PosFactory";
import SkuFactory from "./factory/SkuFactory";

const newCollection = <T>(n: number, factory: () => InsertRow<T>) =>
  Array(5).fill(null).map(factory);

const main = async () => {
  const db = await DB.getConnection();

  const posRepo = new PosRepo(db);
  const skuRepo = new SkuRepo(db);

  console.warn(PosFactory);

  const stores = await posRepo.saveAll(newCollection(5, PosFactory.build));
  const skus = await skuRepo.saveAll(newCollection(5, SkuFactory.build));

  console.warn({ stores, skus });

  await db.end();
};

main();
