import { Connection } from "mysql2/promise";
import PosSkuTable from "../table/PosSkuTable";
import PosTable from "../table/PosTable";
import SkuTable from "../table/SkuTable";
import { InsertRow } from "../../types";
import { PosSku } from "../../entity/PosSku";
import BaseSeed from "./BaseSeed";
import PosSkuFactory from "../factory/PosSkuFactory";

export default class PosSkuSeed extends BaseSeed<PosSku> {
  constructor(db: Connection) {
    super(db);
    this.table = new PosSkuTable(db);
    this.tableName = "pos_sku";
  }

  async build(): Promise<InsertRow<PosSku>[]> {
    const posTable = new PosTable(this.db);
    const skuTable = new SkuTable(this.db);

    const stores = await posTable.findAll();
    const skus = await skuTable.findAll();

    return this.multiplyCollections(stores, skus).map(([pos, sku]) =>
      PosSkuFactory.build({ pos, sku })
    );
  }
}
