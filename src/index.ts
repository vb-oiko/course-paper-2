import { Connection } from "mysql2/promise";
import DB from "./db/connection";
import SupplierTable from "./db/table/SupplierTable";

import SellerProductivityView from "./db/view/SellerProductivityView";
import TurnoverView from "./db/view/TurnoverView";
import { PosType } from "./types";

const request1 = async (db: Connection): Promise<void> => {
  const supplierTable = new SupplierTable(db, true);

  console.log(
    "\n1. Отримати перелік і загальне число постачальників, що поставляють вказаний вид товару, або деякий товар в обсязі, не менше заданого, за весь період співпраці, або за вказаний період.\n"
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
};

const request15 = async (db: Connection): Promise<void> => {
  const turnoverView = new TurnoverView(db, true);

  await turnoverView.getByQuery({
    posId: 12,
  });
};

const main = async () => {
  const db = await DB.getConnection();

  await request1(db);
  // await request15(db);

  await db.end();
};

main();
