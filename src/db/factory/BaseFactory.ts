import { addYears } from "date-fns";
import faker from "faker";
import { EntityMap, InsertRow } from "../../types";

export default abstract class BaseFactory<T> {
  abstract build(referencedEntities: EntityMap): InsertRow<T>;

  static capitalize(str: string): string {
    return str.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) =>
      letter.toUpperCase()
    );
  }

  static getRandomDate(): Date {
    return faker.date.between(addYears(new Date(), -1), new Date());
  }
}
