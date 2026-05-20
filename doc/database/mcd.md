# MCD - Esportify+

## Description

Le projet Esportify+ est une plateforme de gestion d’événements e-sport permettant la consultation de compétitions, la gestion des utilisateurs selon différents rôles ainsi que l’intégration d’un système de replay et d’administration.

---

# Entités principales

## User

| Champ | Type | Description |
|---|---|---|
| id | INT | Identifiant utilisateur |
| username | VARCHAR | Nom utilisateur |
| email | VARCHAR | Adresse email |
| password | VARCHAR | Mot de passe hashé |
| role_id | INT | Rôle associé |
| created_at | DATETIME | Date de création |

---

## Role

| Champ | Type | Description |
|---|---|---|
| id | INT | Identifiant rôle |
| name | VARCHAR | Nom du rôle |

Exemples :
- admin
- organizer
- user

---

## Event

| Champ | Type | Description |
|---|---|---|
| id | INT | Identifiant événement |
| title | VARCHAR | Nom de l’événement |
| description | TEXT | Description |
| game | VARCHAR | Jeu concerné |
| date | DATETIME | Date événement |
| status | VARCHAR | Statut |
| organizer_id | INT | Organisateur |

---

## Tournament

| Champ | Type | Description |
|---|---|---|
| id | INT | Identifiant tournoi |
| name | VARCHAR | Nom tournoi |
| event_id | INT | Événement lié |
| max_players | INT | Nombre max joueurs |
| visibility | VARCHAR | Public ou privé |

---

## Replay

| Champ | Type | Description |
|---|---|---|
| id | INT | Identifiant replay |
| title | VARCHAR | Titre replay |
| video_url | TEXT | Lien vidéo |
| event_id | INT | Événement associé |

---

## Message

| Champ | Type | Description |
|---|---|---|
| id | INT | Identifiant message |
| sender_id | INT | Expéditeur |
| receiver_id | INT | Destinataire |
| content | TEXT | Contenu |
| created_at | DATETIME | Date création |

---

## Registration

| Champ | Type | Description |
|---|---|---|
| id | INT | Identifiant inscription |
| user_id | INT | Utilisateur |
| event_id | INT | Événement |
| status | VARCHAR | Statut inscription |

---

# Relations

- Un utilisateur possède un rôle
- Un organisateur peut créer plusieurs événements
- Un événement peut contenir plusieurs tournois
- Un événement peut posséder plusieurs replays
- Un utilisateur peut envoyer plusieurs messages
- Un utilisateur peut participer à plusieurs événements