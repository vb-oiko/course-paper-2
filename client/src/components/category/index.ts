import { ResourceProps } from "react-admin";
import { CategoryCreate } from "./CategoryCreate";
import { CategoryEdit } from "./CategoryEdit";
import { CategoryList } from "./CategoryList";
import { CategoryShow } from "./CategoryShow";

const category: Partial<ResourceProps> = {
  edit: CategoryEdit,
  list: CategoryList,
  create: CategoryCreate,
  show: CategoryShow,
  options: { label: "SKU Categories" },
};

export default category;
