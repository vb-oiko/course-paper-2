import { ResourceProps } from "react-admin";
import { CategoryEdit } from "./CategoryEdit";
import { CategoryList } from "./CategoryList";

const category: Partial<ResourceProps> = {
  edit: CategoryEdit,
  list: CategoryList,
};

export default category;
