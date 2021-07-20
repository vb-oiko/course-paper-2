import DB from "./connection";
import MigrationCollection from "./migrations/MigrationCollection";
import PosMigration from "./migrations/PosMigration";

const command = process.argv[2];
if (command !== "up" && command !== "down") {
  console.error("unknown comand. please specify 'up' or 'down");
  process.exit(1);
}

const migrateUp = async () => {
  const db = await DB.getConnection();

  await db.connect();
  const migrations = new MigrationCollection(db);

  migrations.add(new PosMigration(db));

  if (command === "up" ) {
    migrations.up();
  }

  if (command === "down" ) {
    migrations.down();
  }

  await db.end();
};

migrateUp();
