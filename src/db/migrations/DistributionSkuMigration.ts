import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class DistributionSkuMigration extends BaseMigration {
  table = "distribution_sku";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    purchase_id int unsigned,
    sku_id int unsigned,
    pos_id int unsigned,

    qty decimal(10,2),

    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (purchase_id) REFERENCES purchase(id),
    FOREIGN KEY (sku_id) REFERENCES sku(id),
    FOREIGN KEY (pos_id) REFERENCES pos(id)
  `;
}
