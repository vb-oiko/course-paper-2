import { DataObject } from "../types";
import { Entity } from "./Entity";

export class SaleSku extends Entity {
  sale_id: number;
  sku_id: number;
  price: number;
  qty: number;

  constructor(data: DataObject) {
    super(data);

    const { sale_id, sku_id, price, qty } = data;

    this.sale_id = sale_id;
    this.sku_id = sku_id;
    this.price = price;
    this.qty = qty;
  }
}
