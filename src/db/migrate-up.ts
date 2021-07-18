import sql from "sql-template-tag";
import DB from "./connection";

const q = sql`
    CREATE TABLE pos (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`;

const migrateUp = async () => {
  const db = await DB.getConnection();

  await db.connect();
  await db.query(q).catch((err) => console.warn(err));
  await db.end();
};

migrateUp();
