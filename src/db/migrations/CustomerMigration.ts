import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class CustomerMigration extends BaseMigration {
  table = "customer";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    name varchar(100) NOT NULL,
    
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id)
  `;
}
