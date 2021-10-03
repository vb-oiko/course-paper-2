import { ResourceProps } from "react-admin";
import { SkuEdit } from "./SkuEdit";
import { SkuList } from "./SkuList";

const sku: Partial<ResourceProps> = {
  list: SkuList,
  edit: SkuEdit,
};

export default sku;
