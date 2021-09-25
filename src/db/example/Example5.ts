import { PosType } from "../../types";
import SellerProductivityView from "../view/SellerProductivityView";
import BaseExample from "./BaseExample";

export default class Example5 extends BaseExample {
  async run(): Promise<void> {
    const sellerProductivityView = new SellerProductivityView(this.db, true);

    console.log(
      "\nОтримати дані про продуктивність одного продавця за вказаний період по всіх торгових точках, по торговим точкам заданого типу.\n"
    );

    console.log(
      "\nОтримати дані про продуктивність одного продавця за вказаний період по всіх торгових точках.\n"
    );

    await sellerProductivityView.getAverageSellerProductivity({
      from: new Date("2020-07-01"),
      to: new Date("2021-12-01"),
    });

    console.log(
      "\nОтримати дані про продуктивність одного продавця за вказаний період по торговим точкам заданого типу.\n"
    );

    await sellerProductivityView.getAverageSellerProductivity({
      posType: PosType.SHOPPING_MALL,
      from: new Date("2020-07-01"),
      to: new Date("2021-12-01"),
    });
  }
}
