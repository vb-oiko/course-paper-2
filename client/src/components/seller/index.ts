import { ResourceProps } from "react-admin";
import { SellerCreate } from "./SellerCreate";
import { SellerEdit } from "./SellerEdit";
import { SellerList } from "./SellerList";
import { SellerShow } from "./SellerShow";

const seller: Partial<ResourceProps> = {
  edit: SellerEdit,
  list: SellerList,
  create: SellerCreate,
  show: SellerShow,
};

export default seller;
