import { Connection } from "mysql2/promise";
import RequestSkuRepo from "../repo/RequestSkuRepo";
import RequestRepo from "../repo/RequestRepo";
import SkuRepo from "../repo/SkuRepo";
import { InsertRow, RequestSku } from "../../types";
import BaseSeed from "./BaseSeed";
import RequestSkuFactory from "../factory/RequestSkuFactory";

export default class RequestSkuSeed extends BaseSeed<RequestSku> {
  constructor(db: Connection) {
    super(db);
    this.repo = new RequestSkuRepo(db);
    this.table = "request_sku";
  }

  async build(): Promise<InsertRow<RequestSku>[]> {
    const requestRepo = new RequestRepo(this.db);
    const skuRepo = new SkuRepo(this.db);

    const requests = await requestRepo.findAll();
    const skus = await skuRepo.findAll();

    return this.multiplyCollections(requests, skus, 0, 5).map(
      ([request, sku]) => RequestSkuFactory.build({ request, sku })
    );
  }
}
