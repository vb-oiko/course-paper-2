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

export interface Sku extends Entity {
  name: string;
}

export interface PosSku extends Entity {
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

export interface Request extends Entity {
  pos_id: number;
  date: Date;
  fulfilled: boolean;
}

export interface RequestSku extends Entity {
  request_id: number;
  sku_id: number;
  qty: number;
}


export interface Customer extends Entity {
  name: string;
}


export interface Supplier extends Entity {
  name: string;
}