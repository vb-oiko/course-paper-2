import { Connection } from "mysql2/promise";
import PosTable from "../table/PosTable";
import TransferTable from "../table/TransferTable";
import { InsertRow, Transfer } from "../../types";
import TransferFactory from "../factory/TransferFactory";
import BaseSeed from "./BaseSeed";

export default class TransferSeed extends BaseSeed<Transfer> {
  constructor(db: Connection) {
    super(db);
    this.table = new TransferTable(db);
    this.tableName = "transfer";
  }

  async build(): Promise<InsertRow<Transfer>[]> {
    const posTable = new PosTable(this.db);
    const stores = await posTable.findAll();

    const fromStores = this.generateRandomSequence(stores, 100);
    const toStores = this.generateRandomSequence(stores, fromStores.length);

    const storePairs = fromStores
      .map((fromStore, ind) => ({
        from_pos: fromStore,
        to_pos: toStores[ind],
      }))
      .filter((storePair) => storePair.from_pos !== storePair.to_pos);

    return storePairs.map((storePair) => TransferFactory.build(storePair));
  }
}
