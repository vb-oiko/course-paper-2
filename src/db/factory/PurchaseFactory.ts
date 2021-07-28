import { EntityMap, InsertRow, Purchase } from "../../types";
import BaseFactory from "./BaseFactory";

class PurchaseFactory extends BaseFactory<Purchase> {
  build({ supplier }: EntityMap): InsertRow<Purchase> {
    return {
      supplier_id: supplier.id,
      date: BaseFactory.getRandomDate(),
    };
  }
}

export default new PurchaseFactory();
