import faker from "faker";
import { SaleSku } from "../../entity/SaleSku";
import { EntityMap, InsertRow } from "../../types";
import BaseFactory from "./BaseFactory";

class SaleSkuFactory extends BaseFactory<SaleSku> {
  build({ sale, sku }: EntityMap): InsertRow<SaleSku> {
    return {
      sale_id: sale.id,
      sku_id: sku.id,
      qty: Number(faker.commerce.price(1, 10)),
      price: Number(faker.commerce.price(10, 100)),
    };
  }
}

export default new SaleSkuFactory();
