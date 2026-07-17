import { hashSync } from "bcryptjs";
import { db } from "./connection.js";

type UserRole = "player" | "organizer" | "admin";

interface SeedUser {
  username: string;
  password: string;
  role: UserRole;
}

interface StoredPassword {
  id: number;
  password: string;
}

const seedUsers: SeedUser[] = [
  {
    username: "admin",
    password: "admin123",
    role: "admin"
  },
  {
    username: "organizer",
    password: "orga123",
    role: "organizer"
  },
  {
    username: "player",
    password: "player123",
    role: "player"
  }
];

function isBcryptHash(password: string): boolean {
  return /^\$2[aby]\$\d{2}\$/.test(password);
}

export function initDatabase(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL
        CHECK (role IN ('player', 'organizer', 'admin'))
    );
  `);

  // Compatibilité avec une ancienne valeur de rôle.
  db.prepare(`
    UPDATE users
    SET role = 'player'
    WHERE role = 'user'
  `).run();

  const insertUser = db.prepare(`
    INSERT INTO users (username, password, role)
    VALUES (@username, @password, @role)
    ON CONFLICT(username) DO NOTHING
  `);

  const updatePassword = db.prepare(`
    UPDATE users
    SET password = ?
    WHERE id = ?
  `);

  const initializeUsers = db.transaction(() => {
    for (const user of seedUsers) {
      insertUser.run({
        username: user.username,
        password: hashSync(user.password, 10),
        role: user.role
      });
    }

    const storedPasswords = db
      .prepare("SELECT id, password FROM users")
      .all() as StoredPassword[];

    // Conversion automatique des anciens mots de passe en clair.
    for (const storedUser of storedPasswords) {
      if (!isBcryptHash(storedUser.password)) {
        updatePassword.run(
          hashSync(storedUser.password, 10),
          storedUser.id
        );
      }
    }
  });

  initializeUsers();

  const result = db
    .prepare("SELECT COUNT(*) AS count FROM users")
    .get() as { count: number };

  console.log(
    `Base SQLite initialisée : ${result.count} utilisateur(s)`
  );
}