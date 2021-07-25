import DB from "./connection";

import SeedCollection from "./seed/SeedCollection";
import PosSeed from "./seed/PosSeed";
import SkuSeed from "./seed/SkuSeed";
import PosSkuSeed from "./seed/PosSkuSeed";

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

  if (command === "up") {
    await seeds.up();
  }

  if (command === "down") {
    await seeds.down();
  }

  await db.end();
};

seed();
