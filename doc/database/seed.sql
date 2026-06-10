-- =====================================================
-- Esportify+
-- Données d'initialisation
-- Base de données SQLite
-- =====================================================

PRAGMA foreign_keys = ON;

-- =====================================================
-- Rôles
-- =====================================================

INSERT INTO roles (name)
VALUES
  ('admin'),
  ('organizer'),
  ('player');

-- =====================================================
-- Utilisateurs de démonstration
-- =====================================================

INSERT INTO users (username, email, password, role_id)
VALUES
  ('admin', 'admin@esportify.com', 'admin123', 1),
  ('organizer', 'organizer@esportify.com', 'orga123', 2),
  ('player', 'player@esportify.com', 'player123', 3);

-- =====================================================
-- Événements
-- =====================================================

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

-- =====================================================
-- Tournois
-- =====================================================

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
  ),
  (
    'Rocket League Arena',
    2,
    8,
    'public'
  );

-- =====================================================
-- Replays
-- =====================================================

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

-- =====================================================
-- Inscriptions
-- =====================================================

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
  ),
  (
    3,
    2,
    'pending'
  );

-- =====================================================
-- Messages
-- =====================================================

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
  ),
  (
    2,
    1,
    'Une nouvelle proposition de compétition est disponible pour validation.'
  );

-- =====================================================
-- Fin du script d'initialisation
-- =====================================================