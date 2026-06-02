-- =====================================================
-- Esportify+
-- Script SQL de création et d'initialisation
-- =====================================================

---

-- Table des rôles

---

CREATE TABLE roles (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR(50) NOT NULL UNIQUE
);

---

-- Table des utilisateurs

---

CREATE TABLE users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
username VARCHAR(80) NOT NULL,
email VARCHAR(120) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
role_id INTEGER NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (role_id) REFERENCES roles(id)
);

---

-- Table des événements

---

CREATE TABLE events (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title VARCHAR(120) NOT NULL,
description TEXT,
game VARCHAR(80) NOT NULL,
event_date DATETIME NOT NULL,
status VARCHAR(50) NOT NULL DEFAULT 'pending',
organizer_id INTEGER NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (organizer_id) REFERENCES users(id)
);

---

-- Table des tournois

---

CREATE TABLE tournaments (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR(120) NOT NULL,
event_id INTEGER NOT NULL,
max_players INTEGER NOT NULL,
visibility VARCHAR(50) NOT NULL DEFAULT 'public',
FOREIGN KEY (event_id) REFERENCES events(id)
);

---

-- Table des replays

---

CREATE TABLE replays (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title VARCHAR(120) NOT NULL,
video_url TEXT,
event_id INTEGER NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (event_id) REFERENCES events(id)
);

---

-- Table des messages

---

CREATE TABLE messages (
id INTEGER PRIMARY KEY AUTOINCREMENT,
sender_id INTEGER NOT NULL,
receiver_id INTEGER,
content TEXT NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (sender_id) REFERENCES users(id),
FOREIGN KEY (receiver_id) REFERENCES users(id)
);

---

-- Table des inscriptions

---

CREATE TABLE registrations (
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INTEGER NOT NULL,
event_id INTEGER NOT NULL,
status VARCHAR(50) NOT NULL DEFAULT 'pending',
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (event_id) REFERENCES events(id),
UNIQUE (user_id, event_id)
);

-- =====================================================
-- Données de démonstration
-- =====================================================

INSERT INTO roles (name)
VALUES
('admin'),
('organizer'),
('user');

INSERT INTO users (username, email, password, role_id)
VALUES
('Admin', '[admin@esportify.com](mailto:admin@esportify.com)', 'hashed_password', 1),
('Organizer', '[organizer@esportify.com](mailto:organizer@esportify.com)', 'hashed_password', 2),
('PlayerOne', '[player@esportify.com](mailto:player@esportify.com)', 'hashed_password', 3);

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
'Tournoi Valorant en direct',
'Valorant',
'2026-05-15 20:00:00',
'live',
2
),
(
'Rocket League Cup',
'Compétition Rocket League',
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
'Bonjour, je souhaite participer au tournoi.'
);
