import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class PosMigration extends BaseMigration {
  table = "pos";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    type enum("shopping mall", "store", "shop", "kiosk") DEFAULT NULL,
    area decimal(10,2) NOT NULL,
    utilities decimal(10,2) DEFAULT NULL,
    rent decimal(10,2) DEFAULT NULL,
    floors int NOT NULL DEFAULT 1,
    departments int NOT NULL DEFAULT 1,
    halls int NOT NULL DEFAULT 1,
    workplaces int NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id)
  `;
}
