import { PosType } from "../../types";
import SellerProductivityView from "../view/SellerProductivityView";
import BaseExample from "./BaseExample";

export default class Example6 extends BaseExample {
  async run(): Promise<void> {
    const sellerProductivityView = new SellerProductivityView(this.db, true);

    console.log(
      "\nОтримати дані про продуктивність окремо взятого продавця окремо взятої торговельної точки за вказаний період.\n"
    );

    await sellerProductivityView.getSellerProductivity({
      sellerId: 32,
      from: new Date("2020-07-01"),
      to: new Date("2021-12-01"),
    });
  }
}
