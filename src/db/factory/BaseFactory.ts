import { EntityMap, InsertRow } from "../../types";

export default abstract class BaseFactory<T> {
  abstract build(referencedEntities: EntityMap): InsertRow<T>;

  static capitalize(str: string): string {
    return str.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) =>
      letter.toUpperCase()
    );
  }
}
