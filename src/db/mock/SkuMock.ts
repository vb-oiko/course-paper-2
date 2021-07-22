import { InsertRow, Sku } from "../../types";
import faker from "faker";

export default class SkuMock {
  static build(): InsertRow<Sku> {
    return {
      name: `${faker.commerce.productName()}`,
    };
  }
}
