import { PosType } from "../../types";
import SalesRateView from "../view/SalesRateView";
import BaseExample from "./BaseExample";

export default class Example10 extends BaseExample {
  async run(): Promise<void> {
    const view = new SalesRateView(this.db, true);

    console.log(
      "\nОтримати дані про ставлення обсягу продажів до обсягу торгових площ, або до числа торгових залів, \
      або до числа прилавків по торговим точкам зазначеного типу, про вироблення окремо взятого продавця торгової точки, для даної торгової точки.\n"
    );

    console.log(
      "\nОтримати дані про ставлення обсягу продажів до обсягу торгових площ, або до числа торгових залів, \
      або до числа прилавків по торговим точкам зазначеного типу.\n"
    );

    await view.getSalesRate({
      posType: PosType.SHOPPING_MALL,
    });

    console.log(
      "\nОтримати дані про вироблення окремо взятого продавця торгової точки, для даної торгової точки.\n"
    );

    await view.getSellersTotals({
      posId: 14,
    });
  }
}
