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

```txt
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
    |--- Routes
    |--- Services
    |--- Repositories
    |--- Entities
    |
    ▼
SQLite
(esportify.db)