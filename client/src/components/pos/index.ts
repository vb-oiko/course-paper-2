import { ResourceProps } from "react-admin";
import { PosEdit } from "./PosEdit";
import { PosList } from "./PosList";

const pos: Partial<ResourceProps> = {
  edit: PosEdit,
  list: PosList,
};

export default pos;
