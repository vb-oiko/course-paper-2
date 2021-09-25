import PosProfitabilityView from "../view/PosProfitabilityView";
import BaseExample from "./BaseExample";

export default class Example11 extends BaseExample {
  async run(): Promise<void> {
    const view = new PosProfitabilityView(this.db, true);

    console.log(
      "\nОтримати дані про рентабельність торговельної точки: співвідношення обсягу продажів до накладних витрат \
      (сумарна заробітна плата продавців + платежі за оренду, комунальні послуги) за вказаний період. \n"
    );

    await view.getProfitabilityByPosId({
      posId: 12,
    });
  }
}
