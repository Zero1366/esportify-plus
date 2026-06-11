# Esportify+

Plateforme e-sport développée avec Vite, TypeScript, SCSS, Express et SQLite.

Projet réalisé dans le cadre de l'ECF du titre professionnel Développeur Web et Web Mobile (DWWM).

---

# Présentation

Esportify+ est une plateforme web de démonstration dédiée à l'univers de l'e-sport.

L'application permet de consulter des compétitions, suivre des matchs, visualiser des replays et gérer différents espaces selon le rôle de l'utilisateur connecté.

Le projet a progressivement évolué d'une démonstration front-end vers une architecture complète intégrant une API Express, une base SQLite, une validation des données avec Zod, une conteneurisation Docker ainsi qu'une documentation technique complète.

---

# Fonctionnalités principales

## Interface utilisateur

* Interface responsive ;
* Navigation dynamique ;
* Système de session ;
* Gestion des rôles ;
* Affichage des événements ;
* Système de replay simulé ;
* Protection des pages selon les rôles ;
* Notifications utilisateur.

## Gestion des rôles

Le projet intègre trois rôles :

* player ;
* organizer ;
* admin.

Chaque rôle dispose d'un accès spécifique aux fonctionnalités de la plateforme.

## Administration

* Gestion des événements ;
* Gestion des statuts ;
* Supervision de la plateforme ;
* Contrôle des accès.

## Organisation

* Gestion des événements ;
* Gestion des compétitions ;
* Suivi des inscriptions ;
* Gestion des propositions d'activités.

---

# Architecture technique

## Front-end

Technologies utilisées :

* HTML5 ;
* SCSS ;
* TypeScript ;
* Vite.

## Back-end

Technologies utilisées :

* Node.js ;
* Express ;
* TypeScript ;
* Zod ;
* SQLite ;
* Better-SQLite3.

Architecture :

```txt
Frontend
    │
    ▼
Fetch API
    │
    ▼
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

---

# Base de données

Le projet utilise SQLite pour la gestion des utilisateurs et de l'authentification.

Tables principales :

* roles ;
* users ;
* events ;
* tournaments ;
* replays ;
* registrations ;
* messages.

Le schéma SQL complet est disponible dans :

```txt
doc/database/schema.sql
```

---

# Installation

## Cloner le projet

```bash
git clone https://github.com/Zero1366/esportify-plus.git
cd esportify-plus
```

## Installer les dépendances

Frontend :

```bash
npm install
```

Backend :

```bash
cd backend
npm install
```

---

# Lancement du projet

## Backend

```bash
npm run dev
```

API :

```txt
http://localhost:3000
```

## Frontend

```bash
npm run dev
```

Application :

```txt
http://localhost:5173
```

Un guide rapide de prise en main est disponible dans le fichier :

```txt
QUICK_GUIDE.md
```

---

# Comptes de démonstration

## Administrateur

```txt
Login : admin
Mot de passe : admin123
```

## Organisateur

```txt
Login : organizer
Mot de passe : orga123
```

## Joueur

```txt
Login : player
Mot de passe : player123
```

---

# Docker

Le projet peut être exécuté avec Docker :

```bash
docker compose up --build
```

---

# Déploiement

Le frontend est déployé avec Netlify.

Le code source est hébergé sur GitHub.

Le projet dispose également d'un workflow automatisé documenté dans le fichier QUICK_GUIDE.md.

---

# Documentation

Documentation disponible dans les dossiers :

```txt
doc/
doc/database/
```

Principaux documents :

* architecture.md ;
* deployment.md ;
* security.md ;
* business-rules.md ;
* workflow-git.md ;
* poo.md ;
* mcd.md ;
* schema.sql ;
* class-diagram.md ;
* sequence-login.md ;
* use-case.md ;
* nosql.md ;
* Patch_Note.md ;
* QUICK_GUIDE.md.

---

# Évolutions futures

* authentification JWT ;
* chiffrement bcrypt ;
* variables d'environnement ;
* MongoDB ;
* Mongoose ;
* système de notifications ;
* statistiques avancées ;
* gestion complète des compétitions ;
* amélioration du système de replay.

---

# Auteur

Cyril Denaes

Graduate Développeur Web et Web Mobile

---

# Statut

Projet ECF finalisé, documenté et maintenu dans une démarche d'amélioration continue.
