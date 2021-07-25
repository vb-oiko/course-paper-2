import { Connection } from "mysql2/promise";
import PosRepo from "../../repo/PosRepo";
import RequestRepo from "../../repo/RequestRepo";
import { InsertRow, Request } from "../../types";
import RequestFactory from "../factory/RequestFactory";
import BaseSeed from "./BaseSeed";

export default class RequestSeed extends BaseSeed<Request> {
  constructor(db: Connection) {
    super(db);
    this.repo = new RequestRepo(db);
    this.table = "request";
  }

  async build(): Promise<InsertRow<Request>[]> {
    const posRepo = new PosRepo(this.db);
    const stores = await posRepo.findAll();

    return stores.flatMap((pos) =>
      this.newCollection(5, () => RequestFactory.build({ pos }))
    );
  }
}
