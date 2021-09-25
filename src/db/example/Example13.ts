import { PosType } from "../../types";
import CustomerSkuView from "../view/CustomerSkuView";
import BaseExample from "./BaseExample";

export default class Example13 extends BaseExample {
  async run(): Promise<void> {
    const view = new CustomerSkuView(this.db, true);

    console.log(
      "\nОтримати відомості про покупців зазначеного товару по заданому періоду, або за весь період, \
      по всіх торгових точках, по торговим точкам зазначеного типу, по даній торговій точці.\n"
    );

    console.log(
      "\nОтримати відомості про покупців зазначеного товару за весь період по всіх торгових точках.\n"
    );

    await view.getByQuery({
      skuId: 23,
    });

    console.log(
      "\nОтримати відомості про покупців зазначеного товару по заданому періоду по даній торговій точці.\n"
    );

    await view.getByQuery({
      skuId: 23,
      posId: 12,
      from: new Date("2020-08-01"),
      to: new Date("2021-01-01"),
    });

    console.log(
      "\nОтримати відомості про покупців зазначеного товару по заданому періоду по торговим точкам зазначеного типу.\n"
    );

    await view.getByQuery({
      skuId: 23,
      posType: PosType.SHOP,
      from: new Date("2020-08-01"),
      to: new Date("2021-01-01"),
    });
  }
}
