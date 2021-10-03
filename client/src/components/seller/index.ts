import { ResourceProps } from "react-admin";
import { SellerCreate } from "./SellerCreate";
import { SellerEdit } from "./SellerEdit";
import { SellerList } from "./SellerList";

const seller: Partial<ResourceProps> = {
  edit: SellerEdit,
  list: SellerList,
  create: SellerCreate,
};

export default seller;
