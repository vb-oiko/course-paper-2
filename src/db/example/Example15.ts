import TurnoverView from "../view/TurnoverView";
import BaseExample from "./BaseExample";

export default class Example15 extends BaseExample {
  async run(): Promise<void> {
    console.log(
      "\nОтримати дані про товарообіг торгової точки, або всіх торгових точок певної групи за вказаний період.\n"
    );

    console.log("\nТоварообіг певної торгової точки за вказаний період.\n");

    const turnoverView = new TurnoverView(this.db, true);

    await turnoverView.getByQuery({
      posId: 12,
      from: new Date("2020-07-01"),
      to: new Date("2021-12-01"),
    });
  }
}
