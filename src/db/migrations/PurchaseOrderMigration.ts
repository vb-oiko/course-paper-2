import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class PurchaseRequestMigration extends BaseMigration {
  table = "purchase_request";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    purchase_id int unsigned,
    request_id int unsigned,

    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (purchase_id) REFERENCES purchase(id),
    FOREIGN KEY (request_id) REFERENCES request(id)
  `;
}
