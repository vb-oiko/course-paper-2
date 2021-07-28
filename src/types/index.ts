export interface Table<T> {
  // exists(t: T): Promise<boolean>;
  // delete(t: T): Promise<any>;
  save(t: InsertRow<T>[]): Promise<T[]>;
}

export enum PosType {
  SHOPPING_MALL = "shopping mall",
  STORE = "store",
  SHOP = "shop",
  KIOSK = "kiosk",
}

export interface Entity {
  id: number;
}
export interface Pos extends Entity {
  name: string;
  type: PosType;
  area: number;
  utilities: number;
  rent: number;
  floors?: number;
  departments?: number;
  halls?: number;
  workplaces?: number;
}

export interface Sku extends Entity {
  name: string;
}

export interface PosSku extends Entity {
  sku_id: number;
  pos_id: number;
  price: number;
  qty: number;
}

export type PosCollection = Pos[];

export interface IPosTable extends Table<Pos> {
  // getPosById(posId: string): Promise<Pos>;
}

export type InsertRow<T> = Omit<T, "id">;

export type EntityMap = Record<string, Entity>;

export interface Request extends Entity {
  pos_id: number;
  date: Date;
  fulfilled: boolean;
}

export interface Transfer extends Entity {
  date: Date;
  from_pos_id: number;
  to_pos_id: number;
}

export interface RequestSku extends Entity {
  request_id: number;
  sku_id: number;
  qty: number;
}

export interface TransferSku extends Entity {
  transfer_id: number;
  sku_id: number;
  qty: number;
}

export interface Customer extends Entity {
  name: string;
}

export interface Supplier extends Entity {
  name: string;
}

export interface Seller extends Entity {
  name: string;
  pos_id: number;
  salary: number;
}

export interface Sale extends Entity {
  date: Date;
  seller_id: number;
  customer_id: number;
}

export interface SaleSku extends Entity {
  sale_id: number;
  sku_id: number;
  price: number;
  qty: number;
}

export interface Purchase extends Entity {
  date: Date;
  supplier_id: number;
}

export interface PurchaseSku extends Entity {
  purchase_id: number;
  sku_id: number;
  price: number;
}
export interface PurchaseSkuPos extends Entity {
  purchase_sku_id: number;
  pos_id: number;
  qty: number;
}
export interface PurchaseRequest extends Entity {
  purchase_id: number;
  request_id: number;
}
