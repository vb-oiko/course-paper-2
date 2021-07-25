export interface Repo<T> {
  // exists(t: T): Promise<boolean>;
  // delete(t: T): Promise<any>;
  save(t: InsertRow<T>): Promise<T>;
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

export interface Sku {
  id: number;
  name: string;
}

export interface PosSku {
  id: number;
  sku_id: number;
  pos_id: number;
  price: number;
}

export type PosCollection = Pos[];

export interface IPosRepo extends Repo<Pos> {
  // getPosById(posId: string): Promise<Pos>;
}

export type InsertRow<T> = Omit<T, "id">;

export type EntityMap = Record<string, Entity>;

export interface Request {
  id: number;
  pos_id: number;
  date: Date;
  fulfilled: boolean;
}

export interface RequestSku {
  id: number;
  request_id: number;
  sku_id: number;
  qty: number;
}
