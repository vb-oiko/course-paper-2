import { ResourceProps } from "react-admin";
import { SaleCreate } from "./SaleCreate";
import { SaleEdit } from "./SaleEdit";
import { SaleList } from "./SaleList";
import { SaleShow } from "./SaleShow";

const category: Partial<ResourceProps> = {
  list: SaleList,
  edit: SaleEdit,
  show: SaleShow,
  create: SaleCreate,
  options: { label: "Sales" },
};

export default category;
