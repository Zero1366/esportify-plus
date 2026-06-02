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
- Un utilisateur peut recevoir plusieurs messages
- Un utilisateur peut participer à plusieurs événements
- Une inscription relie un utilisateur à un événement

---

# Cardinalités

## Role - User

Un rôle peut être associé à plusieurs utilisateurs.

Un utilisateur possède un seul rôle.

**Role (1,n) → User (1,1)**

---

## User - Event

Un utilisateur ayant le rôle organizer peut créer plusieurs événements.

Un événement est créé par un seul organisateur.

**User (0,n) → Event (1,1)**

---

## Event - Tournament

Un événement peut contenir plusieurs tournois.

Un tournoi appartient à un seul événement.

**Event (0,n) → Tournament (1,1)**

---

## Event - Replay

Un événement peut posséder plusieurs replays.

Un replay est associé à un seul événement.

**Event (0,n) → Replay (1,1)**

---

## User - Message

Un utilisateur peut envoyer plusieurs messages.

Un utilisateur peut recevoir plusieurs messages.

Un message possède un seul expéditeur et un seul destinataire.

**User sender (0,n) → Message (1,1)**

**User receiver (0,n) → Message (1,1)**

---

## User - Registration - Event

Un utilisateur peut participer à plusieurs événements.

Un événement peut avoir plusieurs participants.

Une inscription concerne un seul utilisateur et un seul événement.

**User (0,n) → Registration (1,1)**

**Event (0,n) → Registration (1,1)**

---

# Règles de gestion

- Un utilisateur possède obligatoirement un rôle.
- Un événement est obligatoirement lié à un organisateur.
- Un tournoi est obligatoirement lié à un événement.
- Un replay est obligatoirement lié à un événement.
- Une inscription est obligatoirement liée à un utilisateur et à un événement.
- Un message est obligatoirement lié à un expéditeur et à un destinataire.
- Un administrateur peut gérer les utilisateurs, les événements et les contenus.
- Un organisateur peut créer et gérer ses propres événements.
- Un utilisateur classique peut consulter les événements et s’inscrire.

---

# Objectif du MCD

Ce MCD permet d’identifier les principales entités du projet Esportify+ ainsi que leurs relations.

Il sert de base à la création du schéma SQL relationnel, notamment avec les clés primaires, les clés étrangères et les relations entre les tables.

Il permet également de justifier la structure des données utilisée dans le projet et de préparer une future évolution vers une base de données complète.