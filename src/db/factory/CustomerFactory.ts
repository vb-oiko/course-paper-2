import { InsertRow, Customer } from "../../types";
import faker from "faker";
import BaseFactory from "./BaseFactory";

class CustomerFactory extends BaseFactory<Customer> {
  build(): InsertRow<Customer> {
    return {
      name: `${faker.name.findName()}`,
    };
  }
}

export default new CustomerFactory();