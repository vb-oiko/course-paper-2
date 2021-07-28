import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class PurchaseSkuPosMigration extends BaseMigration {
  table = "purchase_sku_pos";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    purchase_sku_id int unsigned,
    pos_id int unsigned,

    qty decimal(10,2),

    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (purchase_sku_id) REFERENCES purchase(id),
    FOREIGN KEY (pos_id) REFERENCES pos(id)
  `;
}
