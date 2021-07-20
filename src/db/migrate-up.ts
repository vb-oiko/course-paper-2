import sql from "sql-template-tag";
import DB from "./connection";

const q = {
  pos: sql`
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,

  sku: sql`
    CREATE TABLE sku (
        id int unsigned NOT NULL AUTO_INCREMENT,
        name varchar(100) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY id_UNIQUE (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,

  pos_sku: sql`
    CREATE TABLE pos_sku (
        id int unsigned NOT NULL AUTO_INCREMENT,
        pos_id int unsigned,
        sku_id int unsigned,
        price decimal(10,2),
        PRIMARY KEY (id),
        UNIQUE KEY id_UNIQUE (id),
        FOREIGN KEY (pos_id) REFERENCES pos(id),
        FOREIGN KEY (sku_id) REFERENCES sku(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `,
};

const migrateUp = async () => {
  const db = await DB.getConnection();

  await db.connect();

  await Promise.all(
    Object.entries(q).map(([table, query]) =>
      db
        .execute(query)
        .then(() => console.log(`table ${table} created`))
        .catch((err) => console.warn(`error creating table ${table}: `, err))
    )
  );

  await db.end();
};

migrateUp();
