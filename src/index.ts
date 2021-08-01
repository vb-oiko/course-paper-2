import DB from "./db/connection";
import SupplierTable from "./db/table/SupplierTable";

const main = async () => {
  const db = await DB.getConnection();

  const supplierTable = new SupplierTable(db, true);

  await supplierTable.getBySkuId({
    skuId: 21,
    minQty: 500,
    from: new Date("2020-07-01"),
    to: new Date("2021-12-01"),
    limit: 2,
    offset: 3,
  });

  await db.end();
};

main();
