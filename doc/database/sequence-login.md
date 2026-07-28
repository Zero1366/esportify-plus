# Diagramme de séquence — Connexion utilisateur

## Description

Ce document présente le déroulement complet de la connexion d’un utilisateur dans **Esportify+**.

Il montre les échanges entre l’interface, le backend Express, la validation des données, le service d’authentification, le repository et la base SQLite.

---

## Diagramme Mermaid

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

    User->>Front: Saisit son identifiant et son mot de passe
    Front->>Route: POST /api/auth/login
    Route->>Zod: Valide les données
    Zod-->>Route: Données validées ou erreur

    alt Données valides
        Route->>Service: loginUser(username, password)
        Service->>Repository: findUserByCredentials()
        Repository->>DB: Exécute une requête préparée
        DB-->>Repository: Retourne les données utilisateur
        Repository->>Entity: Crée une UserEntity
        Entity-->>Repository: Vérifie le mot de passe
        Repository-->>Service: SafeUser ou erreur
        Service-->>Route: Résultat de l’authentification
        Route-->>Front: Réponse JSON
        Front-->>User: Affiche le résultat
    else Données invalides
        Route-->>Front: Retourne une erreur de validation
        Front-->>User: Affiche le message d’erreur
    end
```

---

## Explication du fonctionnement

L’utilisateur saisit son identifiant et son mot de passe dans l’interface.

Le front-end envoie ensuite une requête `POST` vers la route `/api/auth/login`. La route utilise Zod pour vérifier le format des données reçues.

Lorsque les données sont valides, le service d’authentification appelle le repository utilisateur. Celui-ci interroge SQLite avec une requête préparée, puis transforme les données obtenues en `UserEntity`.

L’entité vérifie le mot de passe et retourne un `SafeUser` lorsque l’authentification réussit. La route renvoie ensuite une réponse JSON au front-end.

En cas de données invalides ou d’échec de l’authentification, un message d’erreur est retourné à l’utilisateur.

---

## Séparation des responsabilités

Le diagramme met en évidence les responsabilités suivantes :

- le front-end collecte les identifiants et affiche le résultat ;
- la route reçoit la requête et renvoie la réponse ;
- Zod valide les données d’entrée ;
- `AuthService` gère la logique d’authentification ;
- `UserRepository` accède à SQLite ;
- `UserEntity` vérifie les informations utilisateur ;
- SQLite conserve les données.

---

## Sécurité

Les requêtes vers SQLite sont préparées afin de limiter les risques d’injection SQL.

Le mot de passe n’est jamais renvoyé au front-end. Seules les données sécurisées contenues dans le `SafeUser` sont retournées après une authentification réussie.

---

## Objectif

Ce diagramme représente le flux de connexion d’Esportify+ et montre la séparation entre l’interface, la validation, la logique métier et l’accès aux données.

Il facilite également la compréhension, la maintenance et les futures évolutions du système d’authentification.