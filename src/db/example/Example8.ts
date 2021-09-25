import { PosType } from "../../types";
import SalaryView from "../view/SalaryView";
import BaseExample from "./BaseExample";

export default class Example8 extends BaseExample {
  async run(): Promise<void> {
    const salaryView = new SalaryView(this.db, true);

    console.log(
      "\nОтримати дані про заробітну плату продавців по всіх торгових точках, по торговим точкам заданого типу, по конкретній торговій точці.\n"
    );

    console.log(
      "\nОтримати дані про заробітну плату продавців по конкретній торговій точці.\n"
    );

    await salaryView.getByPosIdOrPosType({
      posId: 11,
    });

    console.log(
      "\nОтримати дані про заробітну плату продавців по по торговим точкам заданого типу.\n"
    );

    await salaryView.getByPosIdOrPosType({
      posType: PosType.SHOP,
    });

    console.log(
      "\nОтримати дані про заробітну плату продавців по всіх торгових точках.\n"
    );

    await salaryView.getByPosIdOrPosType({});
  }
}
