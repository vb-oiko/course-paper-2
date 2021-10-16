import { DataObject } from "../types";
import { Entity } from "./Entity";

export class Customer extends Entity {
  name: string;

  constructor(data: DataObject) {
    super(data);

    const { name } = data;

    this.name = name;
  }
}
