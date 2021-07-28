import DB from "./connection";

import MigrationCollection from "./migration/MigrationCollection";
import PosMigration from "./migration/PosMigration";
import SkuMigration from "./migration/SkuMigration";
import RequestMigration from "./migration/RequestMigration";
import SellerMigration from "./migration/SellerMigration";
import SupplierMigration from "./migration/SupplierMigration";
import TransferMigration from "./migration/TransferMigration";
import PurchaseMigration from "./migration/PurchaseMigration";
import CustomerMigration from "./migration/CustomerMigration";
import SaleMigration from "./migration/SaleMigration";

import PosSkuMigration from "./migration/PosSkuMigration";
import TransferSkuMigration from "./migration/TransferSkuMigration";
import RequestSkuMigration from "./migration/RequestSkuMigration";
import PurchaseSkuMigration from "./migration/PurchaseSkuMigration";
import SaleSkuMigration from "./migration/SaleSkuMigration";
import PurchaseSkuPosMigration from "./migration/PurchaseSkuPosMigration";
import PurchaseRequestMigration from "./migration/PurchaseRequestMigration";

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
