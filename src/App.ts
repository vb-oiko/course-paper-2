import { Connection } from "mysql2/promise";
import dotenv from "dotenv";
import DB from "./db/connection";
import express, { Express } from "express";
import cors from "cors";
import PosTable from "./db/table/PosTable";
import SellerTable from "./db/table/SellerTable";
import SkuTable from "./db/table/SkuTable";
import TableRouter from "./router/TableRouter";
import CategoryTable from "./db/table/CategoryTable";
import CustomerTable from "./db/table/CustomerTable";
import PosSkuTable from "./db/table/PosSkuTable";
import PurchaseRequestTable from "./db/table/PurchaseRequestTable";
import PurchaseSkuPosTable from "./db/table/PurchaseSkuPosTable";
import PurchaseSkuTable from "./db/table/PurchaseSkuTable";
import PurchaseTable from "./db/table/PurchaseTable";
import RequestSkuTable from "./db/table/RequestSkuTable";
import RequestTable from "./db/table/RequestTable";
import SaleSkuTable from "./db/table/SaleSkuTable";
import SaleTable from "./db/table/SaleTable";
import SupplierTable from "./db/table/SupplierTable";
import TransferSkuTable from "./db/table/TransferSkuTable";
import TransferTable from "./db/table/TransferTable";
import BaseTable from "./db/table/BaseTable";

export default class App {
  private static port: number;
  private static db: Connection;
  private static app: Express;

  static async init(): Promise<void> {
    dotenv.config();
    this.port = process.env.PORT ? Number(process.env.PORT) : 3001;
    this.db = await DB.getConnection();
  }

  static createEndpointsForTables(tables: BaseTable<unknown>[]): void {
    tables.forEach((table) => new TableRouter(this.app, table));
  }

  static async start(): Promise<void> {
    await this.init();

    this.app = express();
    this.app.use(
      cors({
        exposedHeaders: ["X-Total-Count"],
      })
    );

    this.app.use(express.json());

    this.createEndpointsForTables([
      new PosTable(this.db),
      new SellerTable(this.db),
      new CategoryTable(this.db),
      new SkuTable(this.db),
      new CustomerTable(this.db),
      new PosSkuTable(this.db),
      new PurchaseRequestTable(this.db),
      new PurchaseSkuPosTable(this.db),
      new PurchaseSkuTable(this.db),
      new PurchaseTable(this.db),
      new RequestSkuTable(this.db),
      new RequestTable(this.db),
      new SaleSkuTable(this.db),
      new SaleTable(this.db),
      new SupplierTable(this.db),
      new TransferSkuTable(this.db),
      new TransferTable(this.db),
    ]);

    this.app.listen(this.port, () => {
      console.log(`Server listening on ${this.port}`);
    });
  }
}
