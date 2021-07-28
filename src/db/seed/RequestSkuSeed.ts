import { Connection } from "mysql2/promise";
import RequestSkuTable from "../table/RequestSkuTable";
import RequestTable from "../table/RequestTable";
import SkuTable from "../table/SkuTable";
import { InsertRow, RequestSku } from "../../types";
import BaseSeed from "./BaseSeed";
import RequestSkuFactory from "../factory/RequestSkuFactory";

export default class RequestSkuSeed extends BaseSeed<RequestSku> {
  constructor(db: Connection) {
    super(db);
    this.table = new RequestSkuTable(db);
    this.tableName = "request_sku";
  }

  async build(): Promise<InsertRow<RequestSku>[]> {
    const requestTable = new RequestTable(this.db);
    const skuTable = new SkuTable(this.db);

    const requests = await requestTable.findAll();
    const skus = await skuTable.findAll();

    return this.multiplyCollections(requests, skus, 0, 5).map(
      ([request, sku]) => RequestSkuFactory.build({ request, sku })
    );
  }
}
