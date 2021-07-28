import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class SaleSkuMigration extends BaseMigration {
  table = "sale_sku";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    sale_id int unsigned,
    sku_id int unsigned,

    qty decimal(10,2),
    price decimal(10,2),

    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (sale_id) REFERENCES sale(id),
    FOREIGN KEY (sku_id) REFERENCES sku(id)
  `;
}
