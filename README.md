# Esportify+

Projet ECF DWWM - Plateforme e-sport développée avec Vite, TypeScript et SCSS.

---

# Présentation

Esportify+ est une plateforme web de démonstration et de gestion e-sport permettant :

- la consultation d’événements compétitifs,
- la gestion de plusieurs rôles utilisateurs,
- un système de replay/live simulé,
- une interface administrateur,
- une interface organisateur,
- une expérience responsive desktop/mobile.

Le projet a été réalisé dans le cadre de l’ECF du titre professionnel Développeur Web et Web Mobile.

---

# Objectifs du projet

L’objectif principal du projet était de développer une plateforme moderne inspirée des plateformes e-sport professionnelles tout en mettant en pratique :

- le développement front-end dynamique,
- la modularisation TypeScript,
- l’organisation SCSS,
- la gestion de rôles utilisateurs,
- la simulation de sessions,
- le déploiement web,
- la documentation technique,
- la conteneurisation Docker.

---

# Fonctionnalités principales

## Interface utilisateur

- Navigation responsive
- Sidebar dynamique
- Header interactif
- Interface moderne SCSS
- Gestion responsive mobile/desktop

## Gestion des rôles

Le projet intègre plusieurs rôles :

- Visiteur
- Joueur
- Organisateur
- Administrateur

Chaque rôle possède des accès spécifiques.

## Replay / Live

Simulation d’un système de replay e-sport :

- score dynamique,
- cartes événements,
- contrôles replay,
- affichage des équipes,
- état des matchs.

## Administration

- Gestion des événements
- Gestion des utilisateurs
- Gestion des statuts
- Tableau d’administration

## Organisation

- Création d’événements
- Gestion de tournois
- Interface organisateur

---

# Architecture du projet

## Front-end

Le front-end est développé avec :

- HTML5
- SCSS
- TypeScript
- Vite

Architecture modulaire :

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

Le back-end utilise :

- Node.js
- Express

Architecture pensée pour séparer :

- routes,
- logique métier,
- accès aux données,
- modèles applicatifs.

---

# Technologies utilisées

## Front-end

- HTML5
- SCSS
- TypeScript
- Vite

## Back-end

- Node.js
- Express

## Base de données

- SQL
- Scripts de création et de seed

## Outils

- Git
- GitHub
- Docker
- Docker Compose
- Netlify

---

# Installation du projet

## Cloner le projet

```bash
git clone https://github.com/Zero1366/esportify-plus.git
```

## Installer les dépendances

```bash
npm install
```

## Lancer le projet

```bash
npm run dev
```

---

# Lancement avec Docker

## Construction du conteneur

```bash
docker compose up --build
```

Le projet sera accessible sur :

```txt
http://localhost:5173
```

---

# Comptes de démonstration

## Administrateur

- login : admin
- mot de passe : admin123

## Organisateur

- login : organizer
- mot de passe : orga123

## Joueur

- login : player
- mot de passe : player123

---

# Déploiement

Le projet est déployé avec Netlify.

Déploiement automatique via GitHub.

---

# Documentation technique

La documentation technique est disponible dans :

```txt
doc/database/
```

## Contenu

- architecture.md
- deployment.md
- git-workflow.md
- mcd.md
- schema.sql
- seed.sql
- security.md

---

# Conteneurisation

Le projet utilise Docker afin de :

- standardiser l’environnement,
- simplifier le déploiement,
- améliorer la reproductibilité,
- professionnaliser l’architecture applicative.

Fichiers utilisés :

- Dockerfile
- docker-compose.yml

---

# Workflow Git

Le projet utilise Git et GitHub pour :

- le suivi des versions,
- la gestion des modifications,
- la sauvegarde du projet,
- la gestion documentaire,
- le déploiement continu.

---

# Perspectives d’évolution

Plusieurs améliorations peuvent être ajoutées :

- backend complet avec base de données réelle,
- authentification sécurisée,
- système live temps réel,
- API complète,
- WebSocket,
- PostgreSQL,
- système tournoi avancé,
- statistiques joueurs,
- chat temps réel,
- système matchmaking.

---

# Auteur

Cyril Denaes  
Graduate Développeur Web et Web Mobile

---

# Statut du projet

Projet ECF en cours d’amélioration et de professionnalisation.