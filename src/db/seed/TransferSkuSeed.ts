import { Connection } from "mysql2/promise";
import TransferSkuTable from "../table/TransferSkuTable";
import TransferTable from "../table/TransferTable";
import SkuTable from "../table/SkuTable";
import { InsertRow, TransferSku } from "../../types";
import BaseSeed from "./BaseSeed";
import TransferSkuFactory from "../factory/TransferSkuFactory";

export default class TransferSkuSeed extends BaseSeed<TransferSku> {
  constructor(db: Connection) {
    super(db);
    this.table = new TransferSkuTable(db);
    this.tableName = "transfer_sku";
  }

  async build(): Promise<InsertRow<TransferSku>[]> {
    const transferTable = new TransferTable(this.db);
    const skuTable = new SkuTable(this.db);

    const transfers = await transferTable.findAll();
    const skus = await skuTable.findAll();

    return this.multiplyCollections(transfers, skus, 0, 3).map(
      ([transfer, sku]) => TransferSkuFactory.build({ transfer, sku })
    );
  }
}
