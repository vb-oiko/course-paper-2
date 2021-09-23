import SupplierTable from "../table/SupplierTable";
import BaseExample from "./BaseExample";

export default class Example1 extends BaseExample {
  async run(): Promise<void> {
    const supplierTable = new SupplierTable(this.db, true);

    console.log(
      "\n1. Отримати перелік і загальне число постачальників, що поставляють вказаний вид товару,\
       або деякий товар в обсязі, не менше заданого, за весь період співпраці, або за вказаний період.\n"
    );

    console.log(
      "\nПерелік постачальників, що поставляють вказаний вид товару в обсязі, не менше заданого, за вказаний період.\n"
    );
    await supplierTable.getBySkuOrCategoryId({
      categoryId: 5,
      minQty: 500,
      from: new Date("2020-07-01"),
      to: new Date("2021-12-01"),
    });

    console.log(
      "\nПерелік постачальників, що поставляють деякий товар в обсязі, не менше заданого, за весь період.\n"
    );
    await supplierTable.getBySkuOrCategoryId({
      skuId: 21,
      minQty: 500,
    });
  }
}
