import { DataObject } from "../types";
import { Entity } from "./Entity";

export class Seller extends Entity {
  name: string;
  pos_id: number;
  salary: number;

  constructor(data: DataObject) {
    super(data);

    const { name, pos_id, salary } = data;

    this.name = name;
    this.pos_id = pos_id;
    this.salary = salary;
  }
}
