import { RowDataPacket } from "mysql2/promise";
import { InsertRow, Category } from "../../types";
import BaseTable from "./BaseTable";

export default class CategoryTable extends BaseTable<Category> {
  tableName = "category";

  mapToDb(data: InsertRow<Category>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Category {
    const { id, name } = data;

    return {
      id,
      name,
    };
  }
}
