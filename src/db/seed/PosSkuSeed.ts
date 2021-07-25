import { Connection } from "mysql2/promise";
import PosSkuRepo from "../../repo/PosSkuRepo";
import PosRepo from "../../repo/PosRepo";
// import SkuRepo from "../../repo/SkuRepo";
import { InsertRow, Sku } from "../../types";
// import SkuFactory from "../factory/SkuFactory";
import BaseSeed from "./BaseSeed";

export default class PosSkuSeed extends BaseSeed<Sku> {
  db: Connection;

  constructor(db: Connection) {
    super(db);
    this.db = db;
    this.repo = new PosSkuRepo(db);
    this.table = "pos_sku";
  }

  async build(): Promise<InsertRow<Sku>[]> {
    const posRepo = new PosRepo(this.db);

    const stores = await posRepo.findAll();

    console.warn({ stores });

    return [];
  }
}
