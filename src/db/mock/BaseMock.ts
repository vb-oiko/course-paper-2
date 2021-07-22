import { Entity } from "../../types";

export default abstract class BaseMock {
  abstract build(): Entity;
}
