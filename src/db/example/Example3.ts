import SkuQtyView from "../view/SkuQtyView";
import BaseExample from "./BaseExample";

export default class Example3 extends BaseExample {
  async run(): Promise<void> {
    const skuQtyView = new SkuQtyView(this.db, true);

    console.log(
      "\n3. Отримати номенклатуру і обсяг товарів у зазначеній торговельній точці\n"
    );

    await skuQtyView.getByPosIdOrPosType({
      posId: 11,
    });
  }
}
