import { RowDataPacket } from "mysql2/promise";
import { Sku } from "../../entity/Sku";
import { InsertRow } from "../../types";
import BaseTable from "./BaseTable";

export default class SkuTable extends BaseTable<Sku> {
  tableName = "sku";

  mapToDb(data: InsertRow<Sku>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Sku {
    const { id, category_id, name } = data;

    return {
      id,
      category_id,
      name,
    };
  }
}
