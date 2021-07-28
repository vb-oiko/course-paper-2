import faker from "faker";
import { Connection } from "mysql2/promise";
import PosTable from "../table/PosTable";
import RequestTable from "../table/RequestTable";
import { InsertRow, Request } from "../../types";
import RequestFactory from "../factory/RequestFactory";
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
      this.newCollection(faker.datatype.number(5) + 1, () =>
        RequestFactory.build({ pos })
      )
    );
  }
}
