import { PosType } from "../../types";
import SkuSupplierView from "../view/SkuSupplierView";
import BaseExample from "./BaseExample";

export default class Example9 extends BaseExample {
  async run(): Promise<void> {
    const view = new SkuSupplierView(this.db, true);

    console.log(
      "\nОтримати відомості про поставки певного товару зазначеним постачальником за весь час поставок, або за деякий період.\n"
    );

    console.log(
      "\nОтримати відомості про поставки певного товару зазначеним постачальником за деякий період.\n"
    );

    await view.getBySkuIdAndSupplierId({
      skuId: 23,
      supplierId: 21,
      from: new Date("2020-08-01"),
      to: new Date("2021-01-01"),
    });

    console.log(
      "\nОтримати відомості про поставки певного товару зазначеним постачальником за весь час поставок.\n"
    );

    await view.getBySkuIdAndSupplierId({
      skuId: 23,
      supplierId: 21,
    });
  }
}
