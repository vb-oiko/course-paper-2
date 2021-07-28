import { Connection } from "mysql2/promise";
import { InsertRow, Purchase } from "../../types";
import PurchaseFactory from "../factory/PurchaseFactory";
import PurchaseTable from "../table/PurchaseTable";
import SupplierTable from "../table/SupplierTable";
import BaseSeed from "./BaseSeed";

export default class PurchaseSeed extends BaseSeed<Purchase> {
  constructor(db: Connection) {
    super(db);
    this.table = new PurchaseTable(db);
    this.tableName = "purchase";
  }

  async build(): Promise<InsertRow<Purchase>[]> {
    const supplierTable = new SupplierTable(this.db);

    const suppliers = await supplierTable.findAll();

    return suppliers.flatMap((supplier) =>
      this.newCollection(3, () => PurchaseFactory.build({ supplier }))
    );
  }
}
