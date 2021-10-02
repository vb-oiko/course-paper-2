import express from "express";
import cors from "cors";
import DB from "./db/connection";
import PosTable from "./db/table/PosTable";
import SellerTable from "./db/table/SellerTable";

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

  app.get("/api/poss", async (req, res) => {
    const { list, total } = await posTable.apiGetList(req.query);
    res.setHeader("X-Total-Count", total);
    res.json(list);
  });

  app.get("/api/sellers", async (req, res) => {
    const { list, total } = await sellerTable.apiGetList(req.query);
    res.setHeader("X-Total-Count", total);
    res.json(list);
  });

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

main();
