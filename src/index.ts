import DB from "./db/connection";
import Example1 from "./db/example/Example1";
import Example10 from "./db/example/Example10";
import Example11 from "./db/example/Example11";
import Example12 from "./db/example/Example12";
import Example13 from "./db/example/Example13";
import Example15 from "./db/example/Example15";
import Example2 from "./db/example/Example2";
import Example3 from "./db/example/Example3";
import Example4 from "./db/example/Example4";
import Example5 from "./db/example/Example5";
import Example6 from "./db/example/Example6";
import Example7 from "./db/example/Example7";
import Example8 from "./db/example/Example8";
import Example9 from "./db/example/Example9";

const main = async () => {
  const db = await DB.getConnection();

  // await new Example1(db).run();
  // await new Example2(db).run();
  // await new Example15(db).run();
  // await new Example3(db).run();
  // await new Example4(db).run();
  // await new Example5(db).run();
  // await new Example6(db).run();
  // await new Example7(db).run();
  // await new Example8(db).run();
  // await new Example9(db).run();
  // await new Example10(db).run();
  // await new Example11(db).run();
  // await new Example12(db).run();
  await new Example13(db).run();

  await db.end();
};

main();
