-- =====================================================
-- Esportify+
-- Script SQL de création et d'initialisation
-- Base de données SQLite
-- =====================================================

PRAGMA foreign_keys = ON;

-- =====================================================
-- Suppression des tables existantes
-- Ordre inverse des dépendances
-- =====================================================

DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS replays;
DROP TABLE IF EXISTS tournaments;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

-- =====================================================
-- Table des rôles
-- =====================================================

CREATE TABLE roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE CHECK (
    name IN ('player', 'organizer', 'admin')
  )
);

-- =====================================================
-- Table des utilisateurs
-- =====================================================

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- =====================================================
-- Table des événements
-- =====================================================

CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  game TEXT NOT NULL,
  event_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'validated', 'refused', 'cancelled', 'live', 'upcoming')
  ),
  organizer_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (organizer_id) REFERENCES users(id)
);

-- =====================================================
-- Table des tournois
-- =====================================================

CREATE TABLE tournaments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  event_id INTEGER NOT NULL,
  max_players INTEGER NOT NULL CHECK (max_players > 0),
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (
    visibility IN ('public', 'private')
  ),

  FOREIGN KEY (event_id) REFERENCES events(id)
);

-- =====================================================
-- Table des replays
-- =====================================================

CREATE TABLE replays (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  event_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (event_id) REFERENCES events(id)
);

-- =====================================================
-- Table des messages
-- =====================================================

CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- =====================================================
-- Table des inscriptions
-- =====================================================

CREATE TABLE registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  event_id INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'accepted', 'refused', 'confirmed')
  ),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (event_id) REFERENCES events(id),

  UNIQUE (user_id, event_id)
);

-- =====================================================
-- Index utiles
-- =====================================================

CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_organizer_id ON events(organizer_id);
CREATE INDEX idx_tournaments_event_id ON tournaments(event_id);
CREATE INDEX idx_replays_event_id ON replays(event_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_registrations_user_id ON registrations(user_id);
CREATE INDEX idx_registrations_event_id ON registrations(event_id);

-- =====================================================
-- Données de démonstration
-- =====================================================

INSERT INTO roles (name)
VALUES
  ('admin'),
  ('organizer'),
  ('player');

INSERT INTO users (username, email, password, role_id)
VALUES
  ('admin', 'admin@esportify.com', 'admin123', 1),
  ('organizer', 'organizer@esportify.com', 'orga123', 2),
  ('player', 'player@esportify.com', 'player123', 3);

INSERT INTO events (
  title,
  description,
  game,
  event_date,
  status,
  organizer_id
)
VALUES
  (
    'Valorant Night Clash',
    'Tournoi Valorant en direct entre Nova Squad et Red Pulse.',
    'Valorant',
    '2026-05-15 20:00:00',
    'live',
    2
  ),
  (
    'Rocket League Cup',
    'Compétition Rocket League à venir.',
    'Rocket League',
    '2026-05-20 18:00:00',
    'upcoming',
    2
  );

INSERT INTO tournaments (
  name,
  event_id,
  max_players,
  visibility
)
VALUES
  (
    'Nova Squad Invitational',
    1,
    16,
    'public'
  );

INSERT INTO replays (
  title,
  video_url,
  event_id
)
VALUES
  (
    'Nova Squad vs Red Pulse',
    'https://replay.esportify/demo',
    1
  );

INSERT INTO registrations (
  user_id,
  event_id,
  status
)
VALUES
  (
    3,
    1,
    'confirmed'
  );

INSERT INTO messages (
  sender_id,
  receiver_id,
  content
)
VALUES
  (
    3,
    2,
    'Bonjour, je souhaite participer au tournoi Valorant Night Clash.'
  );

-- =====================================================
-- Fin du script SQL
-- =====================================================