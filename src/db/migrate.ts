import DB from "./connection";

import MigrationCollection from "./migrations/MigrationCollection";
import PosMigration from "./migrations/PosMigration";
import SkuMigration from "./migrations/SkuMigration";
import RequestMigration from "./migrations/RequestMigration";
import SellerMigration from "./migrations/SellerMigration";
import SupplierMigration from "./migrations/SupplierMigration";
import TransferMigration from "./migrations/TransferMigration";
import PurchaseMigration from "./migrations/PurchaseMigration";
import CustomerMigration from "./migrations/CustomerMigration";
import SaleMigration from "./migrations/SaleMigration";

import PosSkuMigration from "./migrations/PosSkuMigration";
import TransferSkuMigration from "./migrations/TransferSkuMigration";
import RequestSkuMigration from "./migrations/RequestSkuMigration";
import PurchaseSkuMigration from "./migrations/PurchaseSkuMigration";
import SaleSkuMigration from "./migrations/SaleSkuMigration";
import PurchaseSkuPosMigration from "./migrations/PurchaseSkuPosMigration";
import PurchaseRequestMigration from "./migrations/PurchaseRequestMigration";

const command = process.argv[2];
if (command !== "up" && command !== "down") {
  console.error("unknown comand. please specify 'up' or 'down");
  process.exit(1);
}

const migrate = async () => {
  const db = await DB.getConnection();

  await db.connect();
  const migrations = new MigrationCollection(db);

  migrations.add(new PosMigration(db));
  migrations.add(new SkuMigration(db));
  migrations.add(new RequestMigration(db));
  migrations.add(new TransferMigration(db));
  migrations.add(new SellerMigration(db));
  migrations.add(new SupplierMigration(db));
  migrations.add(new PurchaseMigration(db));
  migrations.add(new CustomerMigration(db));
  migrations.add(new SaleMigration(db));

  migrations.add(new PosSkuMigration(db));
  migrations.add(new TransferSkuMigration(db));
  migrations.add(new RequestSkuMigration(db));
  migrations.add(new PurchaseSkuMigration(db));
  migrations.add(new SaleSkuMigration(db));
  migrations.add(new PurchaseSkuPosMigration(db));
  migrations.add(new PurchaseRequestMigration(db));

  if (command === "up" ) {
    migrations.up();
  }

  if (command === "down" ) {
    migrations.down();
  }

  await db.end();
};

migrate();
