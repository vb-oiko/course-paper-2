import PurchaseSkuView from "../view/PurchaseSkuView";
import BaseExample from "./BaseExample";

export default class Example12 extends BaseExample {
  async run(): Promise<void> {
    const view = new PurchaseSkuView(this.db, true);

    console.log(
      "\nОтримати відомості про поставки товарів за вказаним номером замовлення.\n"
    );

    await view.getByRequestId({
      requestId: 121,
    });
  }
}
