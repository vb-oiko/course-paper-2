import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class RequestSkuMigration extends BaseMigration {
  table = "request_sku";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    request_id int unsigned,
    sku_id int unsigned,

    qty decimal(10,2),
    
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (request_id) REFERENCES request(id),
    FOREIGN KEY (sku_id) REFERENCES sku(id)
  `;
}
