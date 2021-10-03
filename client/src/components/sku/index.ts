import { ResourceProps } from "react-admin";
import { SkuCreate } from "./SkuCreate";
import { SkuEdit } from "./SkuEdit";
import { SkuList } from "./SkuList";

const sku: Partial<ResourceProps> = {
  list: SkuList,
  edit: SkuEdit,
  create: SkuCreate,
};

export default sku;
