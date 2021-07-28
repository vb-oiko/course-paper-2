import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class SellerMigration extends BaseMigration {
  table = "seller";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    pos_id int unsigned,

    name varchar(100) NOT NULL,
    salary decimal(10,2),

    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (pos_id) REFERENCES pos(id)
  `;
}
