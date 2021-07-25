import faker from "faker";
import { EntityMap, InsertRow, RequestSku } from "../../types";
import BaseFactory from "./BaseFactory";

class RequestSkuFactory extends BaseFactory<RequestSku> {
  build({ request, sku }: EntityMap): InsertRow<RequestSku> {
    return {
      request_id: request.id,
      sku_id: sku.id,
      qty: Number(faker.commerce.price(50, 200)),
    };
  }
}

export default new RequestSkuFactory();
