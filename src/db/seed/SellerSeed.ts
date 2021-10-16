import { Connection } from "mysql2/promise";
import SellerTable from "../table/SellerTable";
import PosTable from "../table/PosTable";
import { Seller } from "../../entity/Seller";
import { InsertRow } from "../../types";
import BaseSeed from "./BaseSeed";
import SellerFactory from "../factory/SellerFactory";

export default class SellerSeed extends BaseSeed<Seller> {
  constructor(db: Connection) {
    super(db);
    this.table = new SellerTable(db);
    this.tableName = "seller";
  }

  async build(): Promise<InsertRow<Seller>[]> {
    const posTable = new PosTable(this.db);
    const stores = await posTable.findAll();

    return stores.flatMap((pos) =>
      this.newCollection(pos.workplaces || 1, () =>
        SellerFactory.build({ pos })
      )
    );
  }
}
