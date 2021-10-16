import { DataObject, PosType } from "../types";
import { Entity } from "./Entity";

export class Pos extends Entity {
  name: string;
  type: PosType;
  area: number;
  utilities: number;
  rent: number;
  floors?: number;
  departments?: number;
  halls?: number;
  workplaces?: number;

  constructor(data: DataObject) {
    super(data);

    const {
      name,
      type,
      area,
      utilities,
      rent,
      floors,
      departments,
      halls,
      workplaces,
    } = data;

    this.name = name;
    this.type = type;
    this.area = area;
    this.utilities = utilities;
    this.rent = rent;
    this.floors = floors;
    this.departments = departments;
    this.halls = halls;
    this.workplaces = workplaces;
  }
}
