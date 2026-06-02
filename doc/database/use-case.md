# Diagramme de classes - Esportify+

## Description

Ce diagramme de classes présente les principales entités utilisées dans le projet Esportify+.  
Il permet de visualiser la structure logique des données ainsi que les relations entre les utilisateurs, les rôles, les événements, les tournois, les replays, les messages et les inscriptions.

---

## Diagramme Mermaid

```mermaid
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
  Event "1" --> "*" Replay : possede
  User "1" --> "*" Registration : effectue
  Event "1" --> "*" Registration : recoit
  User "1" --> "*" Message : envoie
  User "1" --> "*" Message : recoit