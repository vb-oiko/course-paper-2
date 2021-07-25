import { EntityMap, InsertRow, Seller } from "../../types";
import BaseFactory from "./BaseFactory";
import faker from "faker";

class SellerFactory extends BaseFactory<Seller> {
  build({ pos }: EntityMap): InsertRow<Seller> {
    return {
      pos_id: pos.id,
      name: faker.name.findName(),
      salary: Number(faker.commerce.price(300, 1000, 2)),
    };
  }
}

export default new SellerFactory();
