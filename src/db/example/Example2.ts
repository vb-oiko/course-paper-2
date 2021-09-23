import CustomerTable from "../table/CustomerTable";
import BaseExample from "./BaseExample";

export default class Example2 extends BaseExample {
  async run(): Promise<void> {
    const customerTable = new CustomerTable(this.db, true);

    console.log(
      "\n2. Отримати перелік і загальне число покупців, що купили зазначений вид товару за певний період\
       або зробили покупку товару в обсязі, не менше заданого.\n"
    );

    console.log(
      "\nПерелік покупців, що купили зазначений вид товару за певний період.\n"
    );
    await customerTable.getBySkuIdAndMinQty({
      skuId: 21,
      from: new Date("2020-07-01"),
      to: new Date("2021-12-01"),
    });

    console.log(
      "\nПерелік покупців, що зробили покупку товару в обсязі, не менше заданого.\n"
    );
    await customerTable.getBySkuIdAndMinQty({
      skuId: 22,
      minQty: 120,
    });
  }
}
