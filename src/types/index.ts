export interface Repo<T> {
  // exists(t: T): Promise<boolean>;
  // delete(t: T): Promise<any>;
  save(t: T): Promise<any>;
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

export type PosCollection = Pos[];

export interface IPosRepo extends Repo<Pos> {
  // getPosById(posId: string): Promise<Pos>;
}

export type InsertRow<T> = Omit<T, "id">;