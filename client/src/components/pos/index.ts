import { ResourceProps } from "react-admin";
import { PosCreate } from "./PosCreate";
import { PosEdit } from "./PosEdit";
import { PosList } from "./PosList";
import { PosShow } from "./PosShow";

const pos: Partial<ResourceProps> = {
  edit: PosEdit,
  list: PosList,
  create: PosCreate,
  show: PosShow,
  options: { label: "Points of Sales" },
};

export default pos;
