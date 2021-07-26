import { EntityMap, InsertRow, Transfer } from "../../types";
import BaseFactory from "./BaseFactory";

class TransferFactory extends BaseFactory<Transfer> {
  build({ from_pos, to_pos }: EntityMap): InsertRow<Transfer> {
    return {
      from_pos_id: from_pos.id,
      to_pos_id: to_pos.id,
      date: BaseFactory.getRandomDate(),
    };
  }
}

export default new TransferFactory();
