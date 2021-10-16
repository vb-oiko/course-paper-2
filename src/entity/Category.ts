import { DataObject } from "../types";
import { Entity } from "./Entity";

export class Category extends Entity {
  name: string;

  constructor(data: DataObject) {
    super(data);

    const { name } = data;

    this.name = name;
  }
}
