import { InsertRow, Pos, PosType } from "../../types";
import faker from "faker";
import BaseFactory from "./BaseFactory";

class PosFactory extends BaseFactory<Pos> {
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
      [PosType.SHOPPING_MALL]: () => PosFactory.mockNumberInRange(30000, 60000),
      [PosType.STORE]: () => PosFactory.mockNumberInRange(1000, 6000),
      [PosType.SHOP]: () => PosFactory.mockNumberInRange(50, 500),
      [PosType.KIOSK]: () => PosFactory.mockNumberInRange(10, 60),
    }[type]();
  }

  private static mockNumberInRange(a: number, b: number): number {
    return faker.datatype.number(b - a) + a;
  }

  build(): InsertRow<Pos> {
    const type = PosFactory.mockType();
    const area = PosFactory.mockArea(type);
    const workplaces = Math.min(
      10,
      Math.floor(area / PosFactory.mockNumberInRange(400, 700))
    );

    return {
      name: `${faker.address.streetName()} ${BaseFactory.capitalize(type)}`,
      type,
      area,
      utilities: area * PosFactory.mockNumberInRange(10, 20),
      rent: area * PosFactory.mockNumberInRange(50, 150),
      floors: PosFactory.mockFloors(type),
      halls: Math.floor(area / PosFactory.mockNumberInRange(1000, 2000)) || 1,
      departments:
        Math.floor(area / PosFactory.mockNumberInRange(100, 500)) || 1,
      workplaces: workplaces || 1,
    };
  }
}

export default new PosFactory();
