import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class PosSkuMigration extends BaseMigration {
  table = "pos_sku";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    pos_id int unsigned,
    sku_id int unsigned,

    price decimal(10,2),
    
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (pos_id) REFERENCES pos(id),
    FOREIGN KEY (sku_id) REFERENCES sku(id)
  `;
}
