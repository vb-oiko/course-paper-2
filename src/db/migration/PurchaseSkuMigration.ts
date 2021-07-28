import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class PurchaseSkuMigration extends BaseMigration {
  table = "purchase_sku";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    purchase_id int unsigned,
    sku_id int unsigned,

    price decimal(10,2),

    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (purchase_id) REFERENCES purchase(id),
    FOREIGN KEY (sku_id) REFERENCES sku(id)
  `;
}
