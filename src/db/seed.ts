import DB from "./connection";

import SeedCollection from "./seed/SeedCollection";
import PosSeed from "./seed/PosSeed";
import SkuSeed from "./seed/SkuSeed";
import PosSkuSeed from "./seed/PosSkuSeed";
import RequestSeed from "./seed/RequestSeed";
import RequestSkuSeed from "./seed/RequestSkuSeed";
import CustomerSeed from "./seed/CustomerSeed";
import SupplierSeed from "./seed/SupplierSeed";
import SellerSeed from "./seed/SellerSeed";
import SaleSeed from "./seed/SaleSeed";
import SaleSkuSeed from "./seed/SaleSkuSeed";
import TransferSeed from "./seed/TransferSeed";
import TransferSkuSeed from "./seed/TransferSkuSeed";
import PurchaseSeed from "./seed/PurchaseSeed";
import PurchaseSkuSeed from "./seed/PurchaseSkuSeed";

const command = process.argv[2];
if (command !== "up" && command !== "down") {
  console.error("unknown comand. please specify 'up' or 'down");
  process.exit(1);
}

const seed = async () => {
  const db = await DB.getConnection();

  const seeds = new SeedCollection(db);

  seeds.add(new PosSeed(db));
  seeds.add(new SkuSeed(db));
  seeds.add(new PosSkuSeed(db));
  seeds.add(new RequestSeed(db));
  seeds.add(new RequestSkuSeed(db));
  seeds.add(new CustomerSeed(db));
  seeds.add(new SupplierSeed(db));
  seeds.add(new SellerSeed(db));
  seeds.add(new SaleSeed(db));
  seeds.add(new SaleSkuSeed(db));
  seeds.add(new TransferSeed(db));
  seeds.add(new TransferSkuSeed(db));
  seeds.add(new PurchaseSeed(db));
  seeds.add(new PurchaseSkuSeed(db));

  if (command === "up") {
    await seeds.up();
  }

  if (command === "down") {
    await seeds.down();
  }

  await db.end();
};

seed();
