# Esportify+

Projet ECF DWWM - Plateforme e-sport développée avec Vite, TypeScript, SCSS et Express.

---

# Présentation

Esportify+ est une plateforme web de démonstration dédiée à l'univers de l'e-sport.

Le projet permet de consulter des événements compétitifs, suivre des matchs, gérer différents rôles utilisateurs et simuler un environnement proche d'une plateforme e-sport professionnelle.

Ce projet a été réalisé dans le cadre de l'ECF du titre professionnel Développeur Web et Web Mobile.

---

# Objectifs du projet

L'objectif du projet était de concevoir une application web moderne tout en mettant en pratique :

* le développement front-end avec TypeScript ;
* l'organisation SCSS modulaire ;
* le responsive design ;
* la gestion de rôles utilisateurs ;
* les requêtes asynchrones avec Fetch ;
* le développement d'une API REST avec Express ;
* la validation des données avec Zod ;
* l'organisation backend en couches ;
* la documentation technique ;
* la conteneurisation avec Docker ;
* le versionnement avec Git et GitHub.

---

# Fonctionnalités principales

## Interface utilisateur

* navigation responsive ;
* sidebar dynamique ;
* header interactif ;
* interface moderne développée en SCSS ;
* compatibilité desktop et mobile.

## Gestion des rôles

Le projet intègre plusieurs profils :

* visiteur ;
* joueur ;
* organisateur ;
* administrateur.

Chaque rôle dispose d'accès spécifiques selon ses permissions.

## Système Replay / Live

Simulation d'un système de suivi e-sport :

* affichage des matchs ;
* score dynamique ;
* contrôle du replay ;
* gestion des équipes ;
* affichage des événements.

## Administration

* gestion des événements ;
* gestion des utilisateurs ;
* gestion des statuts ;
* tableau d'administration.

## Organisation

* création d'événements ;
* gestion des tournois ;
* espace organisateur.

---

# Architecture du projet

## Front-end

Technologies utilisées :

* HTML5 ;
* SCSS ;
* TypeScript ;
* Vite.

Architecture :

```txt
src/
├── pages/
├── scss/
├── ui/
├── data.ts
├── session.ts
├── navigation.ts
└── apiClient.ts
```

## Back-end

Technologies utilisées :

* Node.js ;
* Express ;
* Zod ;
* Fetch API.

Architecture en couches :

```txt
backend/src/
├── controllers/
├── services/
├── repositories/
├── entities/
├── routes/
├── data/
└── server.ts
```

Cette organisation permet :

* une séparation claire des responsabilités ;
* une meilleure maintenabilité ;
* une évolution simplifiée du projet ;
* une architecture proche des standards professionnels.

---

# Fonctionnalités Backend

## API REST

Le backend expose plusieurs routes permettant :

* l'authentification ;
* la gestion des utilisateurs ;
* la communication avec le front-end via Fetch.

## Validation des données

Les données reçues par l'API sont validées avec Zod avant traitement.

Cette validation permet :

* de contrôler les données entrantes ;
* d'éviter les erreurs de format ;
* d'améliorer la robustesse de l'application.

## Middleware

Un middleware global de gestion des erreurs a été mis en place afin de :

* centraliser le traitement des erreurs ;
* améliorer le débogage ;
* garantir des réponses cohérentes à l'utilisateur.

---

# Base de données

## SQL

Le projet contient :

* un schéma SQL complet ;
* les scripts de création ;
* les données de démonstration ;
* la modélisation relationnelle.

## NoSQL

Une étude d'architecture NoSQL est également présente afin de préparer les futures évolutions du projet.

Les collections étudiées concernent :

* users ;
* events ;
* registrations ;
* replays.

---

# Technologies utilisées

## Front-end

* HTML5
* SCSS
* TypeScript
* Vite

## Back-end

* Node.js
* Express
* Zod
* Fetch API

## Base de données

* SQLite
* SQL
* Architecture NoSQL documentée

## Outils

* Git
* GitHub
* Docker
* Docker Compose
* Netlify

---

# Installation du projet

## Cloner le projet

```bash
git clone https://github.com/Zero1366/esportify-plus.git
```

## Installer les dépendances

Frontend :

```bash
npm install
```

Backend :

```bash
npm install
```

## Lancer le frontend

```bash
npm run dev
```

## Lancer le backend

```bash
npm run dev
```

---

# Lancement avec Docker

```bash
docker compose up --build
```

Application disponible sur :

```txt
http://localhost:5173
```

---

# Comptes de démonstration

## Administrateur

* login : admin
* mot de passe : admin123

## Organisateur

* login : organizer
* mot de passe : orga123

## Joueur

* login : player
* mot de passe : player123

---

# Déploiement

Le projet est déployé avec Netlify.

Le code source est versionné avec GitHub et le déploiement est automatisé.

---

# Documentation technique

Le projet contient :

* architecture.md ;
* deployment.md ;
* security.md ;
* mcd.md ;
* use-case.md ;
* sequence-login.md ;
* class-diagram.md ;
* schema.sql ;
* business-rules.md ;
* poo.md ;
* nosql.md.

---

# Diagrammes UML

Le projet contient :

* diagramme de cas d'utilisation ;
* diagramme de séquence ;
* diagramme de classes ;
* règles métier ;
* documentation POO.

---

# Conteneurisation

Docker est utilisé afin de :

* standardiser l'environnement de développement ;
* simplifier le déploiement ;
* améliorer la reproductibilité ;
* professionnaliser l'architecture du projet.

Fichiers utilisés :

* Dockerfile ;
* docker-compose.yml.

---

# Workflow Git

Git et GitHub sont utilisés pour :

* le suivi des versions ;
* la gestion des modifications ;
* la sauvegarde du projet ;
* le déploiement continu ;
* la documentation technique.

---

# Perspectives d'évolution

## Évolutions techniques

* intégration de MongoDB ;
* utilisation de Mongoose ;
* authentification JWT ;
* chiffrement bcrypt ;
* variables d'environnement ;
* amélioration du système de logs ;
* amélioration de l'architecture backend.

## Évolutions fonctionnelles

* gestion avancée des tournois ;
* système de notifications ;
* historique des matchs ;
* statistiques détaillées ;
* dashboard analytics ;
* gestion avancée des inscriptions.

## Évolutions graphiques et UX/UI

* refonte graphique complète ;
* intégration définitive des logos Nova Squad et Red Pulse ;
* amélioration de la barre de navigation ;
* amélioration des cartes événements ;
* nouvelles animations ;
* amélioration du responsive mobile ;
* harmonisation de l'identité visuelle ;
* amélioration de l'accessibilité.

## Évolutions e-sport

* système de live en direct ;
* scores en temps réel ;
* suivi avancé des compétitions ;
* statistiques de match ;
* amélioration du système de replay.

---

# Auteur

Cyril Denaes

Graduate Développeur Web et Web Mobile

---

# Statut du projet

Projet ECF en cours d'amélioration et de professionnalisation.
