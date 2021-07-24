import DB from "./connection";

import SeedCollection from "./seed/SeedCollection";
import PosSeed from "./seed/PosSeed";
import SkuSeed from "./seed/SkuSeed";

const command = process.argv[2];
if (command !== "up" && command !== "down") {
  console.error("unknown comand. please specify 'up' or 'down");
  process.exit(1);
}

const seed = async () => {
  const db = await DB.getConnection();

  await db.connect();
  const seeds = new SeedCollection(db);

  seeds.add(new PosSeed(db));
  seeds.add(new SkuSeed(db));

  if (command === "up" ) {
    seeds.up();
  }

  if (command === "down" ) {
    seeds.down();
  }

  await db.end();
};

seed();
