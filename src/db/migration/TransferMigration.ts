import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class TransferMigration extends BaseMigration {
  table = "transfer";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    from_pos_id int unsigned,
    to_pos_id int unsigned,
    
    date datetime(0),

    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (from_pos_id) REFERENCES pos(id),
    FOREIGN KEY (to_pos_id) REFERENCES pos(id)
  `;
}
