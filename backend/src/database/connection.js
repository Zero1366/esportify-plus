import Database from "better-sqlite3";
import path from "path";
const dbPath = path.join(__dirname, "../../database/esportify.db");
export const db = new Database(dbPath);
db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 5000");
console.log(`SQLite connecté : ${dbPath}`);
