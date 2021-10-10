import { ResourceProps } from "react-admin";
import { CustomerCreate } from "./CustomerCreate";
import { CustomerEdit } from "./CustomerEdit";
import { CustomerList } from "./CustomerList";
import { CustomerShow } from "./CustomerShow";

const customer: Partial<ResourceProps> = {
  list: CustomerList,
  edit: CustomerEdit,
  create: CustomerCreate,
  show: CustomerShow,
  options: { label: "Customer" },
};

export default customer;
