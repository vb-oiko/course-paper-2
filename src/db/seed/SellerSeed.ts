import { Connection } from "mysql2/promise";
import SellerRepo from "../table/SellerRepo";
import PosRepo from "../table/PosRepo";
import { InsertRow, Seller } from "../../types";
import BaseSeed from "./BaseSeed";
import SellerFactory from "../factory/SellerFactory";

export default class SellerSeed extends BaseSeed<Seller> {
  constructor(db: Connection) {
    super(db);
    this.repo = new SellerRepo(db);
    this.table = "seller";
  }

  async build(): Promise<InsertRow<Seller>[]> {
    const posRepo = new PosRepo(this.db);
    const stores = await posRepo.findAll();

    return stores.flatMap((pos) =>
      this.newCollection(pos.workplaces || 1, () =>
        SellerFactory.build({ pos })
      )
    );
  }
}
