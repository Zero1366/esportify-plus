# Diagramme de classes - Esportify+

## Objectif du document

Ce document présente une modélisation orientée objet simplifiée du projet Esportify+.

L'objectif est de représenter les principales entités manipulées par l'application ainsi que leurs relations.

Ce diagramme complète les autres documents techniques du projet, notamment :

* le MCD ;
* la documentation SQL ;
* la documentation POO ;
* les cas d'utilisation ;
* le diagramme de séquence de connexion.

---

# Rôle du diagramme de classes

Le diagramme de classes permet de visualiser l'organisation logique des principales entités du projet.

Il aide à comprendre :

* les objets manipulés par l'application ;
* les informations associées à chaque objet ;
* les relations entre les utilisateurs, les événements, les inscriptions et les replays ;
* la séparation des responsabilités dans la conception du backend.

---

# Classes principales

## User

La classe `User` représente un utilisateur de la plateforme.

Elle permet de gérer les comptes de démonstration utilisés dans l'application.

Attributs principaux :

* `id` ;
* `username` ;
* `password` ;
* `role`.

Rôles possibles :

* `user` ;
* `organizer` ;
* `admin`.

Responsabilités :

* représenter un compte utilisateur ;
* permettre l'authentification ;
* différencier les droits selon le rôle.

---

## Event

La classe `Event` représente un événement e-sport disponible sur la plateforme.

Attributs principaux :

* `id` ;
* `title` ;
* `game` ;
* `date` ;
* `status` ;
* `organizerId`.

Responsabilités :

* représenter un événement ;
* stocker les informations principales de l'événement ;
* être associé à un organisateur ;
* permettre l'affichage des événements côté frontend.

---

## Registration

La classe `Registration` représente l'inscription d'un utilisateur à un événement.

Attributs principaux :

* `id` ;
* `userId` ;
* `eventId` ;
* `status`.

Responsabilités :

* relier un utilisateur à un événement ;
* représenter l'état d'une inscription ;
* permettre le suivi des participations.

---

## Replay

La classe `Replay` représente un replay de match disponible dans l'application.

Attributs principaux :

* `id` ;
* `eventId` ;
* `teamA` ;
* `teamB` ;
* `scoreA` ;
* `scoreB` ;
* `duration`.

Responsabilités :

* stocker les informations liées à un match ;
* être associé à un événement ;
* permettre l'affichage d'un replay simulé.

---

# Relations entre les classes

## User et Event

Un utilisateur ayant le rôle `organizer` peut créer ou gérer plusieurs événements.

Relation :

```txt
User 1 --- * Event
```

Un organisateur peut donc être associé à plusieurs événements.

---

## User et Registration

Un utilisateur peut effectuer plusieurs inscriptions.

Relation :

```txt
User 1 --- * Registration
```

Chaque inscription appartient à un seul utilisateur.

---

## Event et Registration

Un événement peut posséder plusieurs inscriptions.

Relation :

```txt
Event 1 --- * Registration
```

Chaque inscription concerne un seul événement.

---

## Event et Replay

Un événement peut être associé à un replay.

Relation :

```txt
Event 1 --- 0..1 Replay
```

Le replay permet de présenter un match simulé lié à un événement.

---

# Diagramme simplifié

```txt
+------------------+
|      User        |
+------------------+
| id               |
| username         |
| password         |
| role             |
+------------------+
        |
        | 1
        |
        | *
+------------------+
|      Event       |
+------------------+
| id               |
| title            |
| game             |
| date             |
| status           |
| organizerId      |
+------------------+
        |
        | 1
        |
        | *
+------------------+
|  Registration    |
+------------------+
| id               |
| userId           |
| eventId          |
| status           |
+------------------+

+------------------+
|      Replay      |
+------------------+
| id               |
| eventId          |
| teamA            |
| teamB            |
| scoreA           |
| scoreB           |
| duration         |
+------------------+
```

---

# Lecture du diagramme

Le diagramme montre que le projet Esportify+ repose sur plusieurs entités principales.

L'utilisateur peut posséder différents rôles selon son profil. Les organisateurs sont liés aux événements, les utilisateurs peuvent s'inscrire à ces événements, et certains événements peuvent être associés à un replay.

Cette modélisation permet de mieux comprendre la logique générale du projet et les liens entre les données utilisées par l'application.

---

# Limites du diagramme

Ce diagramme reste volontairement simplifié.

Il ne représente pas l'ensemble des détails techniques du code, mais il permet de donner une vue claire des principales entités utilisées dans le projet.

L'objectif est de fournir une représentation compréhensible de la structure logique de l'application, en complément du MCD et de la documentation POO.

---

# Conclusion

La réalisation de ce diagramme de classes a permis de compléter la documentation technique du projet Esportify+.

Il apporte une vision orientée objet de l'application et facilite la compréhension des relations entre les principales entités du projet.

Cette documentation contribue à améliorer la lisibilité du projet et à renforcer la cohérence entre la conception, la base de données et l'organisation du backend.
