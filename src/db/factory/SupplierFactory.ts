import { InsertRow, Supplier } from "../../types";
import faker from "faker";
import BaseFactory from "./BaseFactory";

class SupplierFactory extends BaseFactory<Supplier> {
  build(): InsertRow<Supplier> {
    return {
      name: faker.company.companyName(),
    };
  }
}

export default new SupplierFactory();