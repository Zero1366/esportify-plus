Diagramme de classes - Esportify+
Description

Ce diagramme de classes présente les principales entités utilisées dans le projet Esportify+.

Il permet de visualiser la structure logique des données ainsi que les relations entre les utilisateurs, les rôles, les événements, les tournois, les replays, les messages et les inscriptions.

Diagramme Mermaid
classDiagram

  class Role {
    +number id
    +string name
  }

  class User {
    +number id
    +string username
    +string email
    +string password
    +number roleId
    +Date createdAt
  }

  class Event {
    +number id
    +string title
    +string description
    +string game
    +Date eventDate
    +string status
    +number organizerId
    +Date createdAt
  }

  class Tournament {
    +number id
    +string name
    +number eventId
    +number maxPlayers
    +string visibility
  }

  class Replay {
    +number id
    +string title
    +string videoUrl
    +number eventId
    +Date createdAt
  }

  class Registration {
    +number id
    +number userId
    +number eventId
    +string status
    +Date createdAt
  }

  class Message {
    +number id
    +number senderId
    +number receiverId
    +string content
    +Date createdAt
  }

  Role "1" --> "*" User : attribue
  User "1" --> "*" Event : organise
  Event "1" --> "*" Tournament : contient
  Event "1" --> "*" Replay : possède
  User "1" --> "*" Registration : effectue
  Event "1" --> "*" Registration : reçoit
  User "1" --> "*" Message : envoie
  User "1" --> "*" Message : reçoit
Objectif du diagramme

Ce diagramme permet de représenter les principales classes métiers du projet Esportify+.

Il montre les relations entre les utilisateurs, les rôles, les événements, les tournois, les replays, les inscriptions et les messages.

Il sert de support à la compréhension de la structure logique du projet et complète le MCD ainsi que le schéma SQL.

Lien avec l’implémentation actuelle

Le diagramme de classes présente une vision complète et évolutive du projet Esportify+.

Dans l’implémentation actuelle, la base SQLite est utilisée pour la gestion des utilisateurs, des rôles, des événements, des inscriptions, des replays et des messages conformément au schéma SQL du projet.

Le backend repose sur une architecture en couches composée des routes, services, repositories et entités métier.

L'entité UserEntity est utilisée pour encapsuler les données utilisateur et générer des objets sécurisés de type SafeUser avant leur transmission au frontend.

Cette modélisation permet de préparer les futures évolutions du projet tout en conservant une cohérence avec l'architecture actuelle.

Correspondance avec la base de données

Les classes représentées dans ce diagramme correspondent directement aux principales tables du schéma SQLite :

Role ;
User ;
Event ;
Tournament ;
Replay ;
Registration ;
Message.

Cette correspondance facilite la compréhension des relations entre la couche métier et la couche de persistance des données.

Conclusion

Le diagramme de classes constitue une représentation simplifiée de la structure métier d'Esportify+.

Il facilite la compréhension des relations entre les différentes entités du système et sert de base pour les futures évolutions fonctionnelles et techniques du projet.

Il complète la documentation d’architecture, le schéma SQL, les règles métier et les autres diagrammes UML du projet.