import { Connection } from "mysql2/promise";
import PurchaseSkuPosTable from "../table/PurchaseSkuPosTable";
import { InsertRow, PurchaseSkuPos } from "../../types";
import PurchaseSkuPosFactory from "../factory/PurchaseSkuPosFactory";
import BaseSeed from "./BaseSeed";
import PurchaseSkuTable from "../table/PurchaseSkuTable";
import PosTable from "../table/PosTable";

export default class PurchaseSkuPosSeed extends BaseSeed<PurchaseSkuPos> {
  constructor(db: Connection) {
    super(db);
    this.table = new PurchaseSkuPosTable(db);
    this.tableName = "purchase_sku_pos";
  }

  async build(): Promise<InsertRow<PurchaseSkuPos>[]> {
    const purchaseSkus = await new PurchaseSkuTable(this.db).findAll();
    const stores = await new PosTable(this.db).findAll();

    return this.multiplyCollections(purchaseSkus, stores, 0, 3).map(
      ([purchase_sku, pos]) =>
        PurchaseSkuPosFactory.build({ pos, purchase_sku })
    );
  }
}
