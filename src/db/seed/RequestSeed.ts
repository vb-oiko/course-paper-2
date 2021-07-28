import { Connection } from "mysql2/promise";
import { InsertRow, Request } from "../../types";
import RequestFactory from "../factory/RequestFactory";
import PosTable from "../table/PosTable";
import RequestTable from "../table/RequestTable";
import BaseSeed from "./BaseSeed";

export default class RequestSeed extends BaseSeed<Request> {
  constructor(db: Connection) {
    super(db);
    this.table = new RequestTable(db);
    this.tableName = "request";
  }

  async build(): Promise<InsertRow<Request>[]> {
    const posTable = new PosTable(this.db);
    const stores = await posTable.findAll();

    return stores.flatMap((pos) =>
      this.newCollection(12, () => RequestFactory.build({ pos }))
    );
  }
}
