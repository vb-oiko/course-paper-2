import { ResourceProps } from "react-admin";
import { SkuCreate } from "./SkuCreate";
import { SkuEdit } from "./SkuEdit";
import { SkuList } from "./SkuList";
import { SkuShow } from "./SkuShow";

const sku: Partial<ResourceProps> = {
  list: SkuList,
  edit: SkuEdit,
  create: SkuCreate,
  show: SkuShow,
  options: { label: "SKUs" },
};

export default sku;
