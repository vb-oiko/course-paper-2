import { format as formatDate, parse as parseDate } from "date-fns";
import { format as formatSql } from "mysql2/promise";
import sql, { empty, join, raw, Sql, Value } from "sql-template-tag";
import { DateRangeRequestData, LimitOffsetRequestData } from "../types";
import prettier from "prettier";

export default class SqlHelper {
  static booleanToInt(value: boolean): number {
    return value ? 1 : 0;
  }

  static intToBoolean(value: number): boolean {
    return value !== 0;
  }

  static dateToDateTime(date: Date = new Date()): string {
    return formatDate(date, "yyyy-MM-dd HH-mm-ss");
  }

  static dateTimeToDate(datetime: string): Date {
    return parseDate(datetime, "yyyy-MM-dd HH-mm-ss", new Date());
  }

  static joinWithAnd(values: Sql[]): Sql {
    const nonEmptyValues = values.filter((value) => value.text !== "");

    if (nonEmptyValues.length === 0) {
      return empty;
    }

    return join(nonEmptyValues, " AND ");
  }

  static getCombinedWhereClause(conditions: Sql[]): Sql {
    const notEmptyConditions = conditions.filter((value) => value.text !== "");

    if (notEmptyConditions.length === 0) {
      return empty;
    }

    return sql`WHERE ${join(notEmptyConditions, " AND ")}`;
  }

  static getDateRangeConditions(
    query: DateRangeRequestData,
    field: string
  ): Sql[] {
    const { from, to } = query;
    const fromCondition = from
      ? sql`${raw(field)} > ${this.dateToDateTime(from)}`
      : empty;
    const toCondition = to
      ? sql`${raw(field)} < ${this.dateToDateTime(to)}`
      : empty;

    return [fromCondition, toCondition];
  }

  static getLimitOffsetClause(query: LimitOffsetRequestData): Sql[] {
    const { limit, offset } = query;
    const limitStatement = limit ? sql`LIMIT ${limit}` : empty;
    const offsetStatement = offset ? sql`OFFSET ${offset}` : empty;

    return [limitStatement, offsetStatement];
  }

  static formatSql(sql: Sql): string {
    return formatSql(sql.sql, sql.values);
  }

  static addLimitOffsetClause(
    sqlStatement: Sql,
    limitOffsetQuery: LimitOffsetRequestData
  ): Sql {
    return join(
      [sqlStatement, ...this.getLimitOffsetClause(limitOffsetQuery)],
      " "
    );
  }

  static logSql(debug = true, sql: Sql): void {
    if (debug) {
      const getNext = (arr: Value[]) => {
        let i = 0;

        return (_: string, ..._args: any) => {
          const res = arr[i];
          i += 1;
          return typeof res === "number" ? `${res}` : `'${res}'`;
        };
      };

      const next = getNext(sql.values);

      const sourceCode = sql.sql.replace(/\?/g, next);

      const formattedCode = prettier.format(sourceCode, {
        parser: "sql",
      });

      console.log();
      console.log(formattedCode);
    }
  }

  static log(debug = true, ...args: unknown[]): void {
    if (debug) {
      const sourceCodes = args.map((code) =>
        prettier.format(JSON.stringify(code), {
          parser: "json",
        })
      );
      console.log();
      console.log(...sourceCodes);
    }
  }

  static getIdCondition(id: undefined | string | string[]): Sql {
    if (!id) {
      return empty;
    }

    if (typeof id === "string") {
      return sql`id = ${id}`;
    }

    return sql`id IN (${join(id)})`;
  }
}
