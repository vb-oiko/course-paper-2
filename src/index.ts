import DB from "./db/connection";
import Example1 from "./db/example/Example1";
import Example15 from "./db/example/Example15";
import Example2 from "./db/example/Example2";
import Example3 from "./db/example/Example3";
import Example4 from "./db/example/Example4";
import Example5 from "./db/example/Example5";

const main = async () => {
  const db = await DB.getConnection();

  // await new Example1(db).run();
  // await new Example2(db).run();
  // await new Example15(db).run();
  // await new Example3(db).run();
  // await new Example4(db).run();
  await new Example5(db).run();

  await db.end();
};

main();
