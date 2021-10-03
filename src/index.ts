import express from "express";
import cors from "cors";
import DB from "./db/connection";
import PosTable from "./db/table/PosTable";
import SellerTable from "./db/table/SellerTable";
import SkuTable from "./db/table/SkuTable";
import TableRouter from "./TableRouter";
import CategoryTable from "./db/table/CategoryTable";

const main = async () => {
  const PORT = process.env.PORT || 3001;
  const db = await DB.getConnection();

  const app = express();
  app.use(
    cors({
      exposedHeaders: ["X-Total-Count"],
    })
  );

  app.use(express.json());

  new TableRouter(app, new PosTable(db));
  new TableRouter(app, new SellerTable(db));
  new TableRouter(app, new CategoryTable(db));
  new TableRouter(app, new SkuTable(db));

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

main();
