import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class OrderSkuMigration extends BaseMigration {
  table = "order_sku";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    order_id int unsigned,
    sku_id int unsigned,

    qty decimal(10,2),
    
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (order_id) REFERENCES order(id),
    FOREIGN KEY (sku_id) REFERENCES sku(id)
  `;
}
