import { RowDataPacket } from "mysql2/promise";
import sql from "sql-template-tag";
import { Customer, InsertRow } from "../../types";
import SqlHelper from "../SqlHelper";
import BaseTable, {
  DateRangeRequestData,
  LimitOffsetRequestData,
} from "./BaseTable";

export default class CustomerTable extends BaseTable<Customer> {
  tableName = "customer";

  mapToDb(data: InsertRow<Customer>): RowDataPacket {
    return data as RowDataPacket;
  }

  mapFromDb(data: RowDataPacket): Customer {
    const { id, name } = data;

    return {
      id,
      name,
    };
  }

  async getByCategoryId(
    query: CustomerByCategoryIdRequestData
  ): Promise<CustomerResponseData> {
    const whereClause = SqlHelper.joinWithAnd([
      sql`sku.category_id = ${query.categoryId}`,
      ...SqlHelper.getDateRangeConditions(query, "sale.date"),
    ]);

    const listSql = sql`
      SELECT 
        customer.id, customer.name
      FROM
        customer
          JOIN
        sale ON sale.customer_id = customer.id
          JOIN
        sale_sku ON sale_sku.sale_id = sale.id
          JOIN
        sku ON sale_sku.sku_id = sku.id
      WHERE ${whereClause}
      GROUP BY customer.id
    `;

    this.debugLogQuery(query);

    const list = await this.getList(
      SqlHelper.addLimitOffsetClause(listSql, query)
    );
    const total = await this.getTotal(listSql);

    return { list, total };
  }

  async getBySkuIdAndMinQty(
    query: CustomerBySkuIdAndMinQtyRequestData
  ): Promise<CustomerResponseData> {
    const whereClause = SqlHelper.joinWithAnd([
      sql`sku.id = ${query.skuId}`,
      ...SqlHelper.getDateRangeConditions(query, "sale.date"),
    ]);

    const listSql = sql`
      SELECT 
        customer.id, customer.name, SUM(sale_sku.qty)
      FROM
        customer
          JOIN
        sale ON sale.customer_id = customer.id
          JOIN
        sale_sku ON sale_sku.sale_id = sale.id
          JOIN
        sku ON sale_sku.sku_id = sku.id
      WHERE ${whereClause}
      GROUP BY customer.id
      HAVING SUM(sale_sku.qty) > ${query.minQty ?? 0}
    `;

    this.debugLogQuery(query);

    const list = await this.getList(
      SqlHelper.addLimitOffsetClause(listSql, query)
    );
    const total = await this.getTotal(listSql);

    return { list, total };
  }
}

export interface CustomerBySkuIdAndMinQtyRequestData
  extends DateRangeRequestData,
    LimitOffsetRequestData {
  skuId: number;
  minQty?: number;
}

export interface CustomerByCategoryIdRequestData
  extends DateRangeRequestData,
    LimitOffsetRequestData {
  categoryId: number;
}

export interface CustomerResponseData {
  list: Customer[];
  total: number;
}
