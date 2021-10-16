import { DataObject } from "../types";

export class Entity {
  id: number;

  constructor(data: DataObject) {
    const { id } = data;
    this.id = id;
  }
}
