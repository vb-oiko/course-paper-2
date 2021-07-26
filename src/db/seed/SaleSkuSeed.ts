import { Connection } from "mysql2/promise";
import SaleSkuRepo from "../../repo/SaleSkuRepo";
import SaleRepo from "../../repo/SaleRepo";
import SkuRepo from "../../repo/SkuRepo";
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
