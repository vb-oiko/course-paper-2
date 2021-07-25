import { Connection } from "mysql2/promise";
import PosSkuRepo from "../../repo/PosSkuRepo";
import PosRepo from "../../repo/PosRepo";
import SkuRepo from "../../repo/SkuRepo";
import { InsertRow, PosSku } from "../../types";
import BaseSeed from "./BaseSeed";
import PosSkuFactory from "../factory/PosSkuFactory";

export default class PosSkuSeed extends BaseSeed<PosSku> {
  constructor(db: Connection) {
    super(db);
    this.repo = new PosSkuRepo(db);
    this.table = "pos_sku";
  }

  async build(): Promise<InsertRow<PosSku>[]> {
    const posRepo = new PosRepo(this.db);
    const skuRepo = new SkuRepo(this.db);

    const stores = await posRepo.findAll();
    const skus = await skuRepo.findAll();

    return this.multiplyCollections(stores, skus).map(([pos, sku]) =>
      PosSkuFactory.build({ pos, sku })
    );
  }
}
