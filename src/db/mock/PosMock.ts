import { Pos, PosType } from "../../types";
import faker from "faker";

export default class PosMock {
  private static mockType() {
    return faker.helpers.shuffle(Object.values(PosType))[0];
  }

  private static mockFloors(type: PosType): number {
    return {
      [PosType.SHOPPING_MALL]: () => faker.datatype.number(3) + 1,
      [PosType.STORE]: () => faker.datatype.number(1) + 1,
      [PosType.SHOP]: () => 1,
      [PosType.KIOSK]: () => 1,
    }[type]();
  }

  private static mockArea(type: PosType): number {
    return {
      [PosType.SHOPPING_MALL]: () => this.mockNumberInRange(30000, 60000),
      [PosType.STORE]: () => this.mockNumberInRange(1000, 6000),
      [PosType.SHOP]: () => this.mockNumberInRange(50, 500),
      [PosType.KIOSK]: () => this.mockNumberInRange(10, 60),
    }[type]();
  }

  private static mockNumberInRange(a: number, b: number): number {
    return faker.datatype.number(b - a) + a;
  }

  static build(): Pos {
    const type = this.mockType();
    const area = this.mockArea(type);

    return {
      id: 0,
      name: `${faker.address.county()} ${type}`,
      type,
      area,
      utilities: area * this.mockNumberInRange(10, 20),
      rent: area * this.mockNumberInRange(50, 150),
      floors: this.mockFloors(type),
      halls: Math.floor(area / this.mockNumberInRange(1000, 2000)) || 1,
      departments: Math.floor(area / this.mockNumberInRange(100, 500)) || 1,
      workplaces: Math.floor(area / this.mockNumberInRange(50, 100)) || 1,
    };
  }
}
