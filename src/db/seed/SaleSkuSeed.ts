import { Connection } from "mysql2/promise";
import SaleSkuTable from "../table/SaleSkuTable";
import SaleTable from "../table/SaleTable";
import SkuTable from "../table/SkuTable";
import { SaleSku } from "../../entity/SaleSku";
import { InsertRow } from "../../types";
import BaseSeed from "./BaseSeed";
import SaleSkuFactory from "../factory/SaleSkuFactory";

export default class SaleSkuSeed extends BaseSeed<SaleSku> {
  constructor(db: Connection) {
    super(db);
    this.table = new SaleSkuTable(db);
    this.tableName = "sale_sku";
  }

  async build(): Promise<InsertRow<SaleSku>[]> {
    const saleTable = new SaleTable(this.db);
    const skuTable = new SkuTable(this.db);

    const sales = await saleTable.findAll();
    const skus = await skuTable.findAll();

    return this.multiplyCollections(sales, skus, 0, 3).map(([sale, sku]) =>
      SaleSkuFactory.build({ sale, sku })
    );
  }
}
