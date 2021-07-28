import { Connection } from "mysql2/promise";
import PurchaseSkuTable from "../table/PurchaseSkuTable";
import PurchaseTable from "../table/PurchaseTable";
import SkuTable from "../table/SkuTable";
import { InsertRow, PurchaseSku } from "../../types";
import BaseSeed from "./BaseSeed";
import PurchaseSkuFactory from "../factory/PurchaseSkuFactory";

export default class PurchaseSkuSeed extends BaseSeed<PurchaseSku> {
  constructor(db: Connection) {
    super(db);
    this.table = new PurchaseSkuTable(db);
    this.tableName = "purchase_sku";
  }

  async build(): Promise<InsertRow<PurchaseSku>[]> {
    const purchaseTable = new PurchaseTable(this.db);
    const skuTable = new SkuTable(this.db);

    const purchases = await purchaseTable.findAll();
    const skus = await skuTable.findAll();

    return this.multiplyCollections(purchases, skus, 0, 5).map(
      ([purchase, sku]) => PurchaseSkuFactory.build({ purchase, sku })
    );
  }
}
