import PosRepo from "../repo/PosRepo";
import SkuRepo from "../repo/SkuRepo";
import { InsertRow } from "../types";
import DB from "./connection";
import PosFactory from "./factory/PosFactory";
import SkuFactory from "./factory/SkuFactory";

class Seeder {
  static newCollection<T>(n: number, factory: () => InsertRow<T>) {
    return Array(5).fill(null).map(factory);
  }

  static async main() {
    const db = await DB.getConnection();

    const posRepo = new PosRepo(db);
    const skuRepo = new SkuRepo(db);

    const stores = await posRepo.saveAll(
      Seeder.newCollection(5, PosFactory.build)
    );
    const skus = await skuRepo.saveAll(
      Seeder.newCollection(5, SkuFactory.build)
    );

    console.warn({ stores, skus });

    await db.end();
  }
}

Seeder.main();
