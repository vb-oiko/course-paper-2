import { PosType } from "../../types";
import SkuSaleView from "../view/SkuSaleView";
import BaseExample from "./BaseExample";

export default class Example6 extends BaseExample {
  async run(): Promise<void> {
    const skuSaleView = new SkuSaleView(this.db, true);

    console.log(
      "\nОтримати дані про обсяг продажів зазначеного товару за певний період по всіх торгових точках, \
      по торговим точкам заданого типу, по конкретній  торговій точці.\n"
    );

    console.log(
      "\nОтримати дані про обсяг продажів зазначеного товару за певний період по конкретній торговій точці.\n"
    );

    await skuSaleView.getByPosIdOrPosType({
      skuId: 21,
      posId: 12,
      from: new Date("2020-07-01"),
      to: new Date("2021-12-01"),
    });

    console.log(
      "\nОтримати дані про обсяг продажів зазначеного товару за певний період по торговим точкам заданого типу.\n"
    );

    await skuSaleView.getByPosIdOrPosType({
      skuId: 21,
      posType: PosType.STORE,
      from: new Date("2020-07-01"),
      to: new Date("2021-12-01"),
    });

    console.log(
      "\nОтримати дані про обсяг продажів зазначеного товару за певний період по по всіх торгових точках.\n"
    );

    await skuSaleView.getByPosIdOrPosType({
      skuId: 21,
      from: new Date("2020-07-01"),
      to: new Date("2021-12-01"),
    });
  }
}
