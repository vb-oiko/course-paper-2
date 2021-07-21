import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class TransferSkuMigration extends BaseMigration {
  table = "transfer_sku";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    transfer_id int unsigned,
    sku_id int unsigned,
    
    qty decimal(10,2),

    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (transfer_id) REFERENCES transfer(id),
    FOREIGN KEY (sku_id) REFERENCES sku(id)
  `;
}
