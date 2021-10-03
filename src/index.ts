import express from "express";
import cors from "cors";
import DB from "./db/connection";
import PosTable from "./db/table/PosTable";
import SellerTable from "./db/table/SellerTable";
import SkuTable from "./db/table/SkuTable";
import TableRouter from "./TableRouter";
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
  new TableRouter(app, new CustomerTable(db));
  new TableRouter(app, new PosSkuTable(db));
  new TableRouter(app, new PurchaseRequestTable(db));
  new TableRouter(app, new PurchaseSkuPosTable(db));
  new TableRouter(app, new PurchaseSkuTable(db));
  new TableRouter(app, new PurchaseTable(db));
  new TableRouter(app, new RequestSkuTable(db));
  new TableRouter(app, new RequestTable(db));
  new TableRouter(app, new SaleSkuTable(db));
  new TableRouter(app, new SaleTable(db));
  new TableRouter(app, new SupplierTable(db));
  new TableRouter(app, new TransferSkuTable(db));
  new TableRouter(app, new TransferTable(db));

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

main();
