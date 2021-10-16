import faker from "faker";
import { Sku } from "../../entity/Sku";
import { EntityMap, InsertRow } from "../../types";
import BaseFactory from "./BaseFactory";

class SkuFactory extends BaseFactory<Sku> {
  build({ category }: EntityMap): InsertRow<Sku> {
    return {
      name: `${faker.commerce.productName()}`,
      category_id: category.id,
    };
  }
}

export default new SkuFactory();
