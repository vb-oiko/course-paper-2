import { PosType } from "../../types";
import CustomerActivityView from "../view/CustomerActivityView";
import BaseExample from "./BaseExample";

export default class Example14 extends BaseExample {
  async run(): Promise<void> {
    const turnoverView = new CustomerActivityView(this.db, true);

    console.log(
      "\nОтримати відомості про найбільш активних покупців по всіх торгових точках, по торговим точкам зазначеного типу, по даній торговій точці.\n"
    );

    console.log(
      "\nОтримати відомості про найбільш активних покупців по по всіх торгових точках.\n"
    );

    await turnoverView.getByQuery({});

    console.log(
      "\nОтримати відомості про найбільш активних покупців по торговим точкам зазначеного типу.\n"
    );

    await turnoverView.getByQuery({
      posType: PosType.KIOSK,
    });

    console.log(
      "\nОтримати відомості про найбільш активних покупців по даній торговій точці.\n"
    );

    await turnoverView.getByQuery({
      posId: 12,
    });
  }
}
