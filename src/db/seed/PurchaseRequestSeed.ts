import { Connection } from "mysql2/promise";
import PurchaseRequestTable from "../table/PurchaseRequestTable";
import PurchaseTable from "../table/PurchaseTable";
import RequestTable from "../table/RequestTable";
import { InsertRow, PurchaseRequest } from "../../types";
import BaseSeed from "./BaseSeed";
import PurchaseRequestFactory from "../factory/PurchaseRequestFactory";

export default class PurchaseRequestSeed extends BaseSeed<PurchaseRequest> {
  constructor(db: Connection) {
    super(db);
    this.table = new PurchaseRequestTable(db);
    this.tableName = "purchase_request";
  }

  async build(): Promise<InsertRow<PurchaseRequest>[]> {
    const purchaseTable = new PurchaseTable(this.db);
    const requestTable = new RequestTable(this.db);

    const purchases = await purchaseTable.findAll();
    const requests = await requestTable.findAll();

    return this.multiplyCollections(purchases, requests, 0, 2).map(
      ([purchase, request]) =>
        PurchaseRequestFactory.build({ purchase, request })
    );
  }
}
