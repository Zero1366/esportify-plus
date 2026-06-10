# Diagramme de séquence - Connexion utilisateur

```mermaid
sequenceDiagram
  actor User as Utilisateur
  participant Front as Front-end
  participant Route as Route Auth
  participant Zod as Validation Zod
  participant Service as AuthService
  participant Repository as UserRepository
  participant Entity as UserEntity
  participant DB as SQLite

  User->>Front: Saisit identifiant et mot de passe
  Front->>Route: POST /api/auth/login
  Route->>Zod: Validation des données
  Zod-->>Route: Données validées ou erreur
  Route->>Service: loginUser(username, password)
  Service->>Repository: findUserByCredentials()
  Repository->>DB: Requête préparée utilisateur
  DB-->>Repository: Données utilisateur
  Repository->>Entity: Création de UserEntity
  Entity-->>Repository: Vérification du mot de passe
  Repository-->>Service: SafeUser ou erreur
  Service-->>Route: Succès ou erreur
  Route-->>Front: Réponse JSON
  Front-->>User: Affiche connexion réussie ou erreur
Explication du fonctionnement
L'utilisateur saisit ses identifiants dans l'interface.
Le front-end envoie une requête POST vers l'API d'authentification.
La route d'authentification reçoit la requête.
Les données sont validées avec Zod.
Si les données sont invalides, une erreur est renvoyée au front-end.
Si les données sont valides, la route transmet les identifiants au service d'authentification.
Le service appelle le repository utilisateur.
Le repository interroge SQLite à l'aide d'une requête préparée.
Les données utilisateur sont transformées en UserEntity.
UserEntity vérifie les informations et génère un SafeUser.
Le service retourne un résultat sécurisé à la route.
La route renvoie une réponse JSON au front-end.
Le front-end affiche le résultat à l'utilisateur.
Objectif

Le but de ce diagramme est de représenter le flux complet de connexion dans Esportify+.

Il met en évidence la séparation des responsabilités entre le front-end, la validation Zod, les routes, les services, les repositories, l'entité métier UserEntity et la base SQLite.

Ce diagramme montre également que les données sensibles, comme le mot de passe, ne sont pas renvoyées au front-end.