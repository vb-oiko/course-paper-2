import { Connection } from "mysql2/promise";
import SaleSkuRepo from "../table/SaleSkuRepo";
import SaleRepo from "../table/SaleRepo";
import SkuRepo from "../table/SkuRepo";
import { InsertRow, SaleSku } from "../../types";
import BaseSeed from "./BaseSeed";
import SaleSkuFactory from "../factory/SaleSkuFactory";

export default class SaleSkuSeed extends BaseSeed<SaleSku> {
  constructor(db: Connection) {
    super(db);
    this.repo = new SaleSkuRepo(db);
    this.table = "sale_sku";
  }

  async build(): Promise<InsertRow<SaleSku>[]> {
    const saleRepo = new SaleRepo(this.db);
    const skuRepo = new SkuRepo(this.db);

    const sales = await saleRepo.findAll();
    const skus = await skuRepo.findAll();

    return this.multiplyCollections(sales, skus, 0, 3).map(
      ([sale, sku]) => SaleSkuFactory.build({ sale, sku })
    );
  }
}
