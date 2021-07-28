import sql from "sql-template-tag";
import BaseMigration from "./BaseMigration";

export default class SaleMigration extends BaseMigration {
  table = "sale";

  columns = sql`
    id int unsigned NOT NULL AUTO_INCREMENT,

    customer_id int unsigned,
    seller_id int unsigned,

    date datetime(0),

    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id),
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (seller_id) REFERENCES seller(id)
  `;
}
