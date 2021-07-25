import faker from "faker";
import { EntityMap, InsertRow, PosSku } from "../../types";
import BaseFactory from "./BaseFactory";

class PosSkuFactory extends BaseFactory<PosSku> {
  build({ pos, sku }: EntityMap): InsertRow<PosSku> {
    return {
      pos_id: pos.id,
      sku_id: sku.id,
      price: Number(faker.commerce.price(10, 100, 2)),
    };
  }
}

export default new PosSkuFactory();
