import { ResourceProps } from "react-admin";
import { PosCreate } from "./PosCreate";
import { PosEdit } from "./PosEdit";
import { PosList } from "./PosList";

const pos: Partial<ResourceProps> = {
  edit: PosEdit,
  list: PosList,
  create: PosCreate,
};

export default pos;
