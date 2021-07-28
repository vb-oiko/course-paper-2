import faker from "faker";
import { EntityMap, InsertRow, PurchaseSkuPos } from "../../types";
import BaseFactory from "./BaseFactory";

class PurchaseSkuPosFactory extends BaseFactory<PurchaseSkuPos> {
  build({ purchase_sku, pos }: EntityMap): InsertRow<PurchaseSkuPos> {
    return {
      pos_id: pos.id,
      purchase_sku_id: purchase_sku.id,
      qty: Number(faker.commerce.price(50, 100, 2)),
    };
  }
}

export default new PurchaseSkuPosFactory();
