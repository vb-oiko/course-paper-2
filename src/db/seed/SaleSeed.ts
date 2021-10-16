import { Connection } from "mysql2/promise";
import SaleTable from "../table/SaleTable";
import SellerTable from "../table/SellerTable";
import CustomerTable from "../table/CustomerTable";
import { Sale } from "../../entity/Sale";
import { InsertRow } from "../../types";
import BaseSeed from "./BaseSeed";
import SaleFactory from "../factory/SaleFactory";

export default class SaleSeed extends BaseSeed<Sale> {
  constructor(db: Connection) {
    super(db);
    this.table = new SaleTable(db);
    this.tableName = "sale";
  }

  async build(): Promise<InsertRow<Sale>[]> {
    const sellerTable = new SellerTable(this.db);
    const customerTable = new CustomerTable(this.db);

    const sellers = await sellerTable.findAll();
    const customers = await customerTable.findAll();

    return this.multiplyCollections(sellers, customers).flatMap(
      ([seller, customer]) =>
        this.newCollection(3, () => SaleFactory.build({ seller, customer }))
    );
  }
}
