import { Connection } from "mysql2/promise";
import TransferSkuRepo from "../table/TransferSkuRepo";
import TransferRepo from "../table/TransferRepo";
import SkuRepo from "../table/SkuRepo";
import { InsertRow, TransferSku } from "../../types";
import BaseSeed from "./BaseSeed";
import TransferSkuFactory from "../factory/TransferSkuFactory";

export default class TransferSkuSeed extends BaseSeed<TransferSku> {
  constructor(db: Connection) {
    super(db);
    this.repo = new TransferSkuRepo(db);
    this.table = "transfer_sku";
  }

  async build(): Promise<InsertRow<TransferSku>[]> {
    const transferRepo = new TransferRepo(this.db);
    const skuRepo = new SkuRepo(this.db);

    const transfers = await transferRepo.findAll();
    const skus = await skuRepo.findAll();

    return this.multiplyCollections(transfers, skus, 0, 3).map(
      ([transfer, sku]) => TransferSkuFactory.build({ transfer, sku })
    );
  }
}
