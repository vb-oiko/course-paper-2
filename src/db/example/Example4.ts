import { PosType } from "../../types";
import SkuPriceView from "../view/SkuPriceView";
import BaseExample from "./BaseExample";

export default class Example4 extends BaseExample {
  async run(): Promise<void> {
    const skuPriceView = new SkuPriceView(this.db, true);

    console.log(
      "\n4. Отримати відомості про обсяг і ціни на зазначений товар по всіх торгових точках, \
      по торговим точкам заданого типу, по конкретній торговій точці.\n"
    );

    console.log(
      "\n4. Отримати відомості про обсяг і ціни на зазначений товар по конкретній торговій точці.\n"
    );

    await skuPriceView.getByPosIdOrPosType({
      posId: 11,
      skuId: 21,
    });

    console.log(
      "\n4. Отримати відомості про обсяг і ціни на зазначений товар по по торговим точкам заданого типу\n"
    );

    await skuPriceView.getByPosIdOrPosType({
      posType: PosType.SHOP,
      skuId: 21,
    });

    console.log(
      "\n4. Отримати відомості про обсяг і ціни на зазначений товар по всіх торгових точках.\n"
    );

    await skuPriceView.getByPosIdOrPosType({
      skuId: 21,
    });
  }
}
