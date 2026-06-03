# Architecture applicative - Esportify+

# Objectif

L'objectif de cette architecture est de séparer les responsabilités entre l'interface utilisateur, la logique métier, l'accès aux données et les modèles de données.

Cette organisation permet d'améliorer la maintenabilité, la lisibilité et l'évolutivité du projet.

# Vue d'ensemble

Esportify+ repose sur une architecture client / serveur.

Le frontend est responsable de l'affichage et des interactions utilisateur tandis que le backend gère la logique métier, la validation des données et l'accès aux informations.

Le frontend communique avec le backend grâce à l'API Fetch et reçoit des réponses au format JSON.

---

# Architecture générale

Utilisateur
|
▼
Frontend
(Vite + TypeScript + SCSS)
|
▼
Fetch API
|
▼
Backend Express
|
|---|----|---|
▼   ▼    ▼
Routes Services Repositories
|
▼
Base de données

---

# Architecture Front-end

Le front-end est développé avec :

* HTML5 ;
* SCSS ;
* TypeScript ;
* Vite.

Structure principale :

src/
|--- pages/
|--- scss/
|--- ui/
|--- data.ts
|--- session.ts
|--- navigation.ts
|--- apiClient.ts
...

# Responsabilités du Front-end

Le front-end assure :

* l'affichage des pages ;
* la navigation utilisateur ;
* la gestion des rôles ;
* l'envoi des requêtes API ;
* l'affichage des données reçues ;
* la gestion des sessions.

...

# Architecture Back-end

Le backend repose sur :

* Node.js ;
* Express ;
* Zod.

Structure principale :

backend/src/
|--- controllers/
|--- services/
|--- repositories/
|--- entities/
|--- routes/
|--- data/
|--- database/
|--- server.ts
...

Cette organisation permet de séparer les différentes responsabilités de l'application.

...

```
  Formulaire
    |
    ▼
  Fetch
    |
    ▼
   POST
    |
    ▼
   API
    |
    ▼
   Auth
    |
    ▼
   Login
```

Ensuite les routes transmettent les informations aux services concernés.

...

# Services

Les services contiennent la logique métier.

Exemple :

...

loginUser()

...

Cette couche centralise les traitements applicatifs.

...

# Repositories

Les repositories gèrent l'accès aux données.

Exemple :

...

findUserByCredentials()

...

Cette couche permet d'isoler la récupération des données du reste de l'application.

...

# Entities

Les entités permettent de structurer les données manipulées par l'application.

...

# Communication Frontend / Backend

La communication entre le frontend et le backend repose sur Fetch API.

Processus de connexion :

```
  Formulaire utilisateur
          |
          ▼
Fetch POST /api/auth/login
          |
          ▼
    Route Express
          |
          ▼
    Validation Zod
          |
          ▼
Service d'authentification
          |
          ▼
     Réponse JSON
          |
          ▼
  Création de la session
```

...

Cette approche permet de découpler le frontend du backend.

...

# Validation des données

Le projet utilise la bibliothèque Zod.

Les données reçues par l'API sont validées avant traitement.

Cette validation permet :

* de vérifier les données utilisateur ;
* d'éviter les formats invalides ;
* de limiter les erreurs côté serveur ;
* d'améliorer la robustesse de l'API.

...

# Middleware

Un middleware global de gestion des erreurs a été mis en place.

Il permet :

* de centraliser les erreurs ;
* de faciliter le débogage ;
* de garantir des réponses cohérentes ;
* d'améliorer la maintenance du backend.

Exemple :

...

{
"success": false,
"message": "Erreur interne du serveur"
}

...

# Architecture NoSQL

Une étude d'architecture NoSQL a également été réalisée.

Collections étudiées :

* users ;
* events ;
* registrations ;
* replays.

Cette étude prépare une future intégration de MongoDB.

# Conteneurisation

Le projet utilise Docker afin de standardiser l'environnement de développement.

Fichiers utilisés :

...

Dockerfile
docker-compose.yml

...

Cette approche facilite le déploiement et améliore la reproductibilité du projet.

...

# Avantages de cette architecture

Cette architecture permet :

* une meilleure maintenabilité ;
* une séparation claire des responsabilités ;
* une évolution simplifiée du projet ;
* une meilleure organisation du code ;
* une architecture proche des standards professionnels.

...

# Conclusion

L'architecture d'Esportify+ repose sur une séparation claire entre le frontend, le backend, la logique métier et les données.

Cette organisation facilite la maintenance du projet, l'ajout de nouvelles fonctionnalités et les futures évolutions techniques.
