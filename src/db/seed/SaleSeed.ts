import { Connection } from "mysql2/promise";
import SaleRepo from "../table/SaleRepo";
import SellerRepo from "../table/SellerRepo";
import CustomerRepo from "../table/CustomerRepo";
import { InsertRow, Sale } from "../../types";
import BaseSeed from "./BaseSeed";
import SaleFactory from "../factory/SaleFactory";

export default class SaleSeed extends BaseSeed<Sale> {
  constructor(db: Connection) {
    super(db);
    this.repo = new SaleRepo(db);
    this.table = "sale";
  }

  async build(): Promise<InsertRow<Sale>[]> {
    const sellerRepo = new SellerRepo(this.db);
    const customerRepo = new CustomerRepo(this.db);

    const sellers = await sellerRepo.findAll();
    const customers = await customerRepo.findAll();

    return this.multiplyCollections(sellers, customers).flatMap(
      ([seller, customer]) =>
        this.newCollection(3, () => SaleFactory.build({ seller, customer }))
    );
  }
}
