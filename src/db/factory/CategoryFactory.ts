import { InsertRow } from "../../types";
import faker from "faker";
import BaseFactory from "./BaseFactory";
import { Category } from "../../entity/Category";

class CategoryFactory extends BaseFactory<Category> {
  build(): InsertRow<Category> {
    return {
      name: `${faker.commerce.department()}`,
    };
  }
}

export default new CategoryFactory();
