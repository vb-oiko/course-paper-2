import { InsertRow, Category } from "../../types";
import faker from "faker";
import BaseFactory from "./BaseFactory";

class CategoryFactory extends BaseFactory<Category> {
  build(): InsertRow<Category> {
    return {
      name: `${faker.commerce.department()}`,
    };
  }
}

export default new CategoryFactory();