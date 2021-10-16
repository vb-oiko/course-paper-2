import { DataObject } from "../types";
import { Entity } from "./Entity";

export class Sale extends Entity {
  date: Date;
  seller_id: number;
  customer_id: number;
  total?: number;

  constructor(data: DataObject) {
    super(data);

    const { date, seller_id, customer_id, total } = data;

    this.date = date;
    this.seller_id = seller_id;
    this.customer_id = customer_id;
    this.total = total;
  }
}
