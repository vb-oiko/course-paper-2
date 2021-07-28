import { Connection } from "mysql2/promise";
import PosRepo from "../table/PosRepo";
import TransferRepo from "../table/TransferRepo";
import { InsertRow, Transfer } from "../../types";
import TransferFactory from "../factory/TransferFactory";
import BaseSeed from "./BaseSeed";

export default class TransferSeed extends BaseSeed<Transfer> {
  constructor(db: Connection) {
    super(db);
    this.repo = new TransferRepo(db);
    this.table = "transfer";
  }

  async build(): Promise<InsertRow<Transfer>[]> {
    const posRepo = new PosRepo(this.db);
    const stores = await posRepo.findAll();

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
