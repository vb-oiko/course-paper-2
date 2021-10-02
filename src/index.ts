import express, { Request, Response } from "express";
import cors from "cors";
import DB from "./db/connection";
import PosTable from "./db/table/PosTable";
import SellerTable from "./db/table/SellerTable";
import BaseTable from "./db/table/BaseTable";

const main = async () => {
  const PORT = process.env.PORT || 3001;
  const db = await DB.getConnection();

  const app = express();
  app.use(
    cors({
      allowedHeaders: ["X-Total-Count"],
      exposedHeaders: ["X-Total-Count"],
    })
  );

  const posTable = new PosTable(db);
  const sellerTable = new SellerTable(db);

  const listRequestHandler =
    <T>(table: BaseTable<T>) =>
    async (req: Request, res: Response) => {
      const { list, total } = await table.apiGetList(req.query);
      res.setHeader("X-Total-Count", total);
      res.json(list);
    };

  app.get("/api/poss", listRequestHandler(posTable));
  app.get("/api/sellers", listRequestHandler(sellerTable));

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

main();
