import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class SkuMigration extends BaseMigration {
  table = "sku";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    category_id int unsigned,

    name varchar(100) NOT NULL,
    
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (category_id) REFERENCES category(id)
  `;
}
