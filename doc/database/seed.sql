-- Esportify+ - Données d'initialisation

INSERT INTO roles (name) VALUES
('admin'),
('organizer'),
('user');

INSERT INTO users (username, email, password, role_id) VALUES
('Admin Esportify', 'admin@esportify.local', 'hashed_password_admin', 1),
('Organisateur Demo', 'organizer@esportify.local', 'hashed_password_organizer', 2),
('Utilisateur Demo', 'user@esportify.local', 'hashed_password_user', 3);

INSERT INTO events (title, description, game, event_date, status, organizer_id) VALUES
('Valorant Night Clash', 'Compétition e-sport autour de Valorant avec replay simulé.', 'Valorant', '2026-06-12 20:00:00', 'validated', 2),
('Rocket League Arena', 'Événement e-sport Rocket League en préparation.', 'Rocket League', '2026-07-05 18:00:00', 'pending', 2);

INSERT INTO tournaments (name, event_id, max_players, visibility) VALUES
('Tournoi Valorant Night Clash', 1, 16, 'public'),
('Tournoi Rocket League Arena', 2, 8, 'public');

INSERT INTO replays (title, video_url, event_id) VALUES
('Replay Valorant Night Clash', '/replay.html', 1);

INSERT INTO messages (sender_id, receiver_id, content) VALUES
(3, 1, 'Bonjour, je souhaite obtenir des informations sur les compétitions disponibles.'),
(2, 1, 'Une nouvelle proposition de compétition est en attente de validation.');

INSERT INTO registrations (user_id, event_id, status) VALUES
(3, 1, 'accepted'),
(3, 2, 'pending');