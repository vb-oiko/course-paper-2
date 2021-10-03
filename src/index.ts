import express, { NextFunction, Request, Response } from "express";
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
      exposedHeaders: ["X-Total-Count"],
    })
  );

  app.use(express.json());

  const posTable = new PosTable(db);
  const sellerTable = new SellerTable(db);

  const defaultErrorHandler = (res: Response) => (error: Error) => {
    res.status(500).json({ message: error.message });
  };

  const getManyRequestHandler =
    <T>(table: BaseTable<T>) =>
    async (req: Request, res: Response) => {
      try {
        const { list, total } = await table.getMany(req.query);
        res.setHeader("X-Total-Count", total);
        res.json(list);
      } catch (err) {
        defaultErrorHandler(res)(err);
      }
    };

  const getOneRequestHandler =
    <T>(table: BaseTable<T>) =>
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const entity = await table.getOne(id).catch(defaultErrorHandler(res));
      res.json(entity);
    };

  const putRequestHandler =
    <T>(table: BaseTable<T>) =>
    async (req: Request, res: Response) => {
      res.json(await table.update(req.body).catch(defaultErrorHandler(res)));
    };

  const createRequestHandler =
    <T>(table: BaseTable<T>) =>
    async (req: Request, res: Response) => {
      res.json(await table.create(req.body).catch(defaultErrorHandler(res)));
    };

  const deleteRequestHandler =
    <T>(table: BaseTable<T>) =>
    async (req: Request, res: Response) => {
      const { id } = req.params;
      res.json(await table.delete(id).catch(defaultErrorHandler(res)));
    };

  app.get("/api/pos", getManyRequestHandler(posTable));
  app.get("/api/seller", getManyRequestHandler(sellerTable));

  app.get("/api/pos/:id", getOneRequestHandler(posTable));
  app.get("/api/seller/:id", getOneRequestHandler(sellerTable));

  app.put("/api/pos/:id", putRequestHandler(posTable));
  app.put("/api/seller/:id", putRequestHandler(sellerTable));

  app.post("/api/pos", createRequestHandler(posTable));
  app.post("/api/seller", createRequestHandler(sellerTable));

  app.delete("/api/pos/:id", deleteRequestHandler(posTable));
  app.delete("/api/seller/:id", deleteRequestHandler(sellerTable));

  app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    res.render("error", { error: err });
  });

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

main();
