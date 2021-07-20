import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class OrderMigration extends BaseMigration {
  table = "order";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,
    pos_id int unsigned,
    date datetime(0),
    fulfilled boolean,
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (pos_id) REFERENCES pos(id),
  `;
}
