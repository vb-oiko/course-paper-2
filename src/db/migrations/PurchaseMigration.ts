import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class PurchaseMigration extends BaseMigration {
  table = "purchase";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,
    supplier_id int unsigned,
    date datetime(0),
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id)
    FOREIGN KEY (supplier_id) REFERENCES supplier(id)
  `;
}
