import { EntityMap, InsertRow } from "../../types";

export default abstract class BaseFactory<T> {
  abstract build(referencedEntities: EntityMap): InsertRow<T>;
}
