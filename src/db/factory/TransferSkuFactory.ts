import faker from "faker";
import { EntityMap, InsertRow, TransferSku } from "../../types";
import BaseFactory from "./BaseFactory";

class TransferSkuFactory extends BaseFactory<TransferSku> {
  build({ transfer, sku }: EntityMap): InsertRow<TransferSku> {
    return {
      transfer_id: transfer.id,
      sku_id: sku.id,
      qty: Number(faker.commerce.price(1, 5)),
    };
  }
}

export default new TransferSkuFactory();
