import { ResourceProps } from "react-admin";
import { CategoryCreate } from "./CategoryCreate";
import { CategoryEdit } from "./CategoryEdit";
import { CategoryList } from "./CategoryList";

const category: Partial<ResourceProps> = {
  edit: CategoryEdit,
  list: CategoryList,
  create: CategoryCreate,
  options: { label: "SKU Categories" },
};

export default category;
