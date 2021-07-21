import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class PurchaseOrderMigration extends BaseMigration {
  table = "purchase_order";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    purchase_id int unsigned,
    order_id int unsigned,

    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (purchase_id) REFERENCES purchase(id),
    FOREIGN KEY (order_id) REFERENCES order(id)
  `;
}
