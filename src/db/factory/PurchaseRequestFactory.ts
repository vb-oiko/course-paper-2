import { EntityMap, InsertRow, PurchaseRequest } from "../../types";
import BaseFactory from "./BaseFactory";

class PurchaseRequestFactory extends BaseFactory<PurchaseRequest> {
  build({ purchase, request }: EntityMap): InsertRow<PurchaseRequest> {
    return {
      purchase_id: purchase.id,
      request_id: request.id,
    };
  }
}

export default new PurchaseRequestFactory();
