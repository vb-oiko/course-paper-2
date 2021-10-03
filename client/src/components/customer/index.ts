import { ResourceProps } from "react-admin";
import { CustomerCreate } from "./CustomerCreate";
import { CustomerEdit } from "./CustomerEdit";
import { CustomerList } from "./CustomerList";

const customer: Partial<ResourceProps> = {
  list: CustomerList,
  edit: CustomerEdit,
  create: CustomerCreate,
};

export default customer;
