import { DataObject } from "../types";
import { Entity } from "./Entity";

export class PosSku extends Entity {
  sku_id: number;
  pos_id: number;
  price: number;
  qty: number;

  constructor(data: DataObject) {
    super(data);

    const { sku_id, pos_id, price, qty } = data;

    this.sku_id = sku_id;
    this.pos_id = pos_id;
    this.price = price;
    this.qty = qty;
  }
}
