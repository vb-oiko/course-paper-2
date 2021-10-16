import { DataObject } from "../types";
import { Entity } from "./Entity";

export class Sku extends Entity {
  name: string;
  category_id: number;

  constructor(data: DataObject) {
    super(data);

    const { name, category_id } = data;

    this.name = name;
    this.category_id = category_id;
  }
}
