export interface Repo<T> {
  // exists(t: T): Promise<boolean>;
  // delete(t: T): Promise<any>;
  save(t: T): Promise<any>;
  fake(): T;
}

export enum PosTypes {
  SHOPPING_MALL = "shopping mall",
  STORE = "store",
  SHOP = "shop",
  KIOSK = "kiosk",
}

export interface Pos {
  id: number;
  name: string;
  type: PosTypes;
  area: number;
  utilities: number;
  rent: number;
  floors?: number;
  departments?: number;
  halls?: number;
  workplaces?: number;
}

export type PosCollection = Pos[];

export interface IPosRepo extends Repo<Pos> {
  // getPosById(posId: string): Promise<Pos>;
}
