import { InsertRow, Sku } from "../../types";
import faker from "faker";
import BaseFactory from "./BaseFactory";

class SkuFactory extends BaseFactory<Sku> {
  build(): InsertRow<Sku> {
    return {
      name: `${faker.commerce.productName()}`,
    };
  }
}

export default new SkuFactory();