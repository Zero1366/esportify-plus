import { db } from "./connection";

export function initDatabase(): void {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `).run();

  const existingUsers = db
    .prepare("SELECT COUNT(*) as count FROM users")
    .get() as { count: number };

  if (existingUsers.count === 0) {
    const insert = db.prepare(`
      INSERT INTO users (username, password, role)
      VALUES (?, ?, ?)
    `);

    insert.run("admin", "admin123", "admin");
    insert.run("organizer", "orga123", "organizer");
    insert.run("player", "player123", "user");

    console.log("Utilisateurs SQLite créés");
  }
}