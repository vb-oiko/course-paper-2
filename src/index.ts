import DB from "./connection";

const db = DB.getInstance().connection;

const res = db.query("SELECT * from user");

console.warn({res});
