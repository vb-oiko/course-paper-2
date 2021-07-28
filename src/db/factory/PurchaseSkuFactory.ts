import faker from "faker";
import { EntityMap, InsertRow, PurchaseSku } from "../../types";
import BaseFactory from "./BaseFactory";

class PurchaseSkuFactory extends BaseFactory<PurchaseSku> {
  build({ purchase, sku }: EntityMap): InsertRow<PurchaseSku> {
    return {
      purchase_id: purchase.id,
      sku_id: sku.id,
      price: Number(faker.commerce.price(5, 50)),
    };
  }
}

export default new PurchaseSkuFactory();
