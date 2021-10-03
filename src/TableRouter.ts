import { Express, Request, Response } from "express";
import BaseTable from "./db/table/BaseTable";

export default class TableRouter<T> {
  private readonly table: BaseTable<T>;
  private readonly app: Express;

  constructor(app: Express, table: BaseTable<T>) {
    this.app = app;
    this.table = table;

    app.get(
      `/api/${this.table.tableName}`,
      this.getManyRequestHandler.bind(this)
    );
    app.get(
      `/api/${this.table.tableName}/:id`,
      this.getOneRequestHandler.bind(this)
    );
    app.put(
      `/api/${this.table.tableName}/:id`,
      this.putRequestHandler.bind(this)
    );
    app.post(
      `/api/${this.table.tableName}`,
      this.createRequestHandler.bind(this)
    );
    app.delete(
      `/api/${this.table.tableName}/:id`,
      this.deleteRequestHandler.bind(this)
    );
  }

  defaultErrorHandler(res: Response): (error: Error) => void {
    return (error: Error) => {
      res.status(500).json({ message: error.message });
    };
  }

  async getManyRequestHandler(req: Request, res: Response): Promise<void> {
    try {
      const { list, total } = await this.table.getMany(req.query);
      res.setHeader("X-Total-Count", total);
      res.json(list);
    } catch (err) {
      this.defaultErrorHandler(res)(err as Error);
    }
  }

  async getOneRequestHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    res.json(await this.table.getOne(id).catch(this.defaultErrorHandler(res)));
  }

  async putRequestHandler(req: Request, res: Response): Promise<void> {
    res.json(
      await this.table.update(req.body).catch(this.defaultErrorHandler(res))
    );
  }

  async createRequestHandler(req: Request, res: Response): Promise<void> {
    res.json(
      await this.table.create(req.body).catch(this.defaultErrorHandler(res))
    );
  }

  async deleteRequestHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    res.json(await this.table.delete(id).catch(this.defaultErrorHandler(res)));
  }
}
