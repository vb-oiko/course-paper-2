import { ResourceProps } from "react-admin";
import { SaleList } from "./SaleList";

const category: Partial<ResourceProps> = {
  list: SaleList,
  options: { label: "Sales" },
};

export default category;
