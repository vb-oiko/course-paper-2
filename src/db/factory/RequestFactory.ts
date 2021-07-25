import { EntityMap, InsertRow, Request } from "../../types";
import BaseFactory from "./BaseFactory";

class RequestFactory extends BaseFactory<Request> {
  build({ pos }: EntityMap): InsertRow<Request> {
    return {
      pos_id: pos.id,
      date: BaseFactory.getRandomDate(),
      fulfilled: false,
    };
  }
}

export default new RequestFactory();
