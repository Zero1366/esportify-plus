# Patch Notes - Esportify+

## Présentation

Ce document recense les principales améliorations apportées au projet Esportify+ après la première version du projet et suite aux retours d'évaluation.

L'objectif de cette mise à jour est de professionnaliser l'architecture du projet, renforcer sa maintenabilité et améliorer la qualité globale de la documentation technique.

---

# Front-end

## Refonte de l'interface

Améliorations réalisées :

* harmonisation de l'identité visuelle ;
* amélioration des pages Replay ;
* amélioration des espaces Admin et Organisateur ;
* optimisation du responsive design ;
* amélioration de la navigation ;
* amélioration des composants d'interface.

---

## Gestion des rôles

Refonte du système de rôles :

* player ;
* organizer ;
* admin.

Les interfaces affichent désormais les fonctionnalités adaptées au rôle connecté.

Cette nomenclature est désormais identique entre :

* le frontend ;
* le backend ;
* SQLite ;
* la documentation technique.

---

## Communication API

Ajout d'une communication structurée avec le backend :

* requêtes Fetch ;
* traitement des réponses JSON ;
* gestion des erreurs ;
* authentification utilisateur ;
* timeout des requêtes ;
* fallback automatique vers les données de démonstration.

Ajout du fichier :

* apiClient.ts.

Fonctionnement :

```text
Frontend
    │
    ▼
Fetch API
    │
    ▼
Backend Express
    │
    ▼
SQLite

Si indisponible :
    │
    ▼
Mode démonstration
```

---

# Back-end

## Création d'une API Express

Ajout d'un backend complet basé sur :

* Node.js ;
* Express ;
* TypeScript.

Fonctionnalités ajoutées :

* route d'authentification ;
* route health ;
* route version ;
* gestion des erreurs ;
* réponses JSON normalisées.

---

## Validation avec Zod

Mise en place de la validation des données :

* validation du nom d'utilisateur ;
* validation du mot de passe ;
* contrôle des données reçues ;
* gestion des erreurs de validation.

---

## Architecture en couches

Refonte complète de l'architecture backend :

```text
Routes
    │
    ▼
Services
    │
    ▼
Repositories
    │
    ▼
Entities
    │
    ▼
SQLite
```

Cette organisation améliore :

* la maintenabilité ;
* la lisibilité ;
* l'évolutivité ;
* la réutilisation du code.

---

## Programmation orientée objet

Ajout de l'entité métier :

* UserEntity.

Ajout du type sécurisé :

* SafeUser.

Fonctionnalités :

* encapsulation des données ;
* méthodes métier ;
* contrôle d'accès aux propriétés ;
* suppression des données sensibles ;
* centralisation de certaines règles métier.

---

## Gestion centralisée des erreurs

Ajout d'un middleware global permettant :

* la centralisation des erreurs ;
* des réponses cohérentes ;
* une maintenance facilitée.

---

# Base de données

## Migration SQLite

Remplacement du stockage JSON par une base SQLite.

Technologies ajoutées :

* SQLite ;
* Better-SQLite3.

Ajouts :

* esportify.db ;
* couche database ;
* connexion centralisée ;
* initialisation automatique ;
* persistance des utilisateurs.

---

## Configuration SQLite

Ajout de plusieurs mécanismes de fiabilité :

* PRAGMA foreign_keys = ON ;
* journal_mode WAL ;
* busy_timeout ;
* contraintes SQL.

Objectifs :

* intégrité référentielle ;
* amélioration des performances ;
* limitation des corruptions ;
* meilleure gestion des accès concurrents.

---

## Schéma SQL

Création d'un schéma SQL complet :

* roles ;
* users ;
* events ;
* tournaments ;
* replays ;
* registrations ;
* messages.

---

## Contraintes SQL

Ajout de plusieurs mécanismes de protection :

* PRIMARY KEY ;
* FOREIGN KEY ;
* UNIQUE ;
* CHECK ;
* index de performance.

---

# Sécurité

## Sécurisation de l'authentification

Ajouts :

* validation Zod ;
* SafeUser ;
* contrôles de rôles ;
* requêtes préparées ;
* encapsulation des données utilisateur.

---

## Sécurisation SQLite

Configuration :

* PRAGMA foreign_keys ;
* journal_mode WAL ;
* busy_timeout ;
* contraintes SQL.

---

## Sécurisation Express

Ajouts :

* désactivation de X-Powered-By ;
* contrôle des routes ;
* middleware global d'erreurs ;
* validation systématique des données.

---

# Documentation

Création ou mise à jour des documents :

* README.md ;
* architecture.md ;
* security.md ;
* deployment.md ;
* workflow-git.md ;
* schema.sql ;
* mcd.md ;
* business-rules.md ;
* nosql.md ;
* poo.md ;
* class-diagram.md ;
* use-case.md ;
* sequence-login.md.

---

# UML

Ajout de plusieurs diagrammes :

* diagramme de classes ;
* diagramme de séquence ;
* diagramme de cas d'utilisation ;
* modèle conceptuel de données.

---

# Docker

Ajout de la conteneurisation :

* Dockerfile ;
* docker-compose.yml.

Objectifs :

* reproductibilité ;
* standardisation ;
* simplification du déploiement.

---

# Git et GitHub

Amélioration du suivi de version :

* organisation du dépôt ;
* historisation des évolutions ;
* documentation des modifications ;
* préparation à un workflow plus avancé.

---

# Évolutions prévues

Fonctionnalités envisagées :

* authentification JWT ;
* chiffrement bcrypt ;
* variables d'environnement ;
* MongoDB ;
* Mongoose ;
* journalisation avancée ;
* limitation des tentatives de connexion ;
* système de notifications ;
* statistiques avancées ;
* gestion complète des tournois.

---

# Conclusion

Cette mise à jour marque une évolution importante du projet Esportify+.

Le projet dispose désormais :

* d'une architecture backend en couches ;
* d'une base SQLite sécurisée ;
* d'une authentification connectée au backend ;
* d'une validation des données avec Zod ;
* d'une communication Fetch frontend/backend ;
* d'une couche Repository ;
* d'une entité UserEntity ;
* d'un type SafeUser ;
* d'une documentation technique complète ;
* d'une architecture proche des standards professionnels.
