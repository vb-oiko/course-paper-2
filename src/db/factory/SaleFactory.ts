import { EntityMap, InsertRow, Sale } from "../../types";
import BaseFactory from "./BaseFactory";

class SaleFactory extends BaseFactory<Sale> {
  build({ seller, customer }: EntityMap): InsertRow<Sale> {
    return {
      seller_id: seller.id,
      customer_id: customer.id,
      date: BaseFactory.getRandomDate(),
    };
  }
}

export default new SaleFactory();
