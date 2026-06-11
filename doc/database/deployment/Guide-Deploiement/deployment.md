# Documentation de déploiement - Esportify+

## Objectif

Ce document présente les différentes méthodes permettant d'installer, exécuter et déployer le projet Esportify+.

Il décrit également l'architecture de déploiement, les technologies utilisées ainsi que les outils mis en place afin de simplifier le développement et la maintenance du projet.

---

# Prérequis

Avant de lancer le projet, les outils suivants doivent être installés :

* Node.js ;
* npm ;
* Git ;
* Docker (optionnel) ;
* Docker Compose (optionnel).

---

# Récupération du projet

Cloner le dépôt GitHub :

```bash
git clone https://github.com/Zero1366/esportify-plus.git
cd esportify-plus
```

---

# Installation des dépendances

## Front-end

```bash
npm install
```

## Back-end

```bash
cd backend
npm install
```

---

# Workflow automatisé

Lors des dernières phases du développement, plusieurs opérations récurrentes ont été automatisées afin de simplifier le cycle de développement, de vérification et de déploiement.

Cette évolution a été mise en place lorsque le projet a atteint un niveau de stabilité suffisant pour permettre l'automatisation d'une partie du workflow.

## Développement complet

```bash
npm run dev:full
```

Cette commande lance simultanément :

* le frontend Vite ;
* le backend Express ;
* la connexion à la base SQLite.

---

## Vérification complète

```bash
npm run build:full
```

Cette commande :

* compile le frontend ;
* compile le backend ;
* vérifie l'ensemble du projet TypeScript.

---

## Déploiement

```bash
npm run deploy:full
```

Cette commande permet d'automatiser le processus de déploiement défini pour le projet.

---

## Bénéfices obtenus

* réduction des manipulations manuelles ;
* gain de temps lors des phases de test ;
* vérification centralisée ;
* simplification du déploiement ;
* amélioration de la cohérence du workflow ;
* réduction des risques d'erreurs.

---

# Lancement manuel du projet

## Lancer le backend

Depuis le dossier backend :

```bash
npm run dev
```

Le serveur démarre sur :

```txt
http://localhost:3000
```

---

## Lancer le frontend

Depuis la racine du projet :

```bash
npm run dev
```

Le frontend démarre sur :

```txt
http://localhost:5173
```

---

# Vérification du backend

## Route principale

```txt
http://localhost:3000
```

Réponse attendue :

```json
{
  "success": true,
  "message": "Backend Esportify+ actif",
  "service": "Esportify+ API",
  "version": "1.0.0"
}
```

---

## Route de santé

```txt
http://localhost:3000/health
```

Réponse attendue :

```json
{
  "success": true,
  "status": "ok",
  "service": "Esportify+ API",
  "database": "connected",
  "version": "1.0.0"
}
```

---

## Route de version

```txt
http://localhost:3000/version
```

---

# Technologies backend utilisées

Le backend repose sur :

* Node.js ;
* Express ;
* TypeScript ;
* SQLite ;
* Better-SQLite3 ;
* Zod ;
* UserEntity ;
* SafeUser.

Architecture utilisée :

```txt
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

Cette organisation favorise :

* la maintenabilité ;
* la lisibilité ;
* l'évolutivité ;
* la séparation des responsabilités.

---

# Base de données SQLite

Au démarrage du serveur :

* la base SQLite est automatiquement initialisée ;
* les tables sont créées si nécessaire ;
* les données de démonstration sont ajoutées automatiquement ;
* les contraintes de sécurité sont appliquées.

Base utilisée :

```txt
database/esportify.db
```

Principales tables :

* roles ;
* users ;
* events ;
* tournaments ;
* replays ;
* registrations ;
* messages.

---

# Déploiement avec Docker

Le projet peut être exécuté dans un environnement conteneurisé grâce à Docker et Docker Compose.

Construction et lancement :

```bash
docker compose up --build
```

Application accessible sur :

```txt
http://localhost:5173
```

---

# Fichiers Docker utilisés

## Dockerfile

Le Dockerfile permet :

* l'installation automatique des dépendances ;
* la copie des fichiers du projet ;
* la définition de l'environnement d'exécution ;
* le lancement automatisé de l'application.

Une capture du Dockerfile est disponible dans le dossier Images/deployment.

---

## docker-compose.yml

Le fichier docker-compose.yml permet :

* la construction automatique des images ;
* le lancement des conteneurs ;
* la configuration des ports ;
* la simplification du déploiement.

Une capture du fichier docker-compose.yml est disponible dans le dossier Images/deployment.

---

# Déploiement GitHub

Le code source est hébergé sur GitHub.

Git permet :

* le suivi des versions ;
* la sauvegarde du projet ;
* la gestion des modifications ;
* l'historisation du développement ;
* la préparation aux évolutions futures.

Commandes principales :

```bash
git add .
git commit -m "message"
git push
```

---

# Déploiement Netlify

Le frontend est déployé avec Netlify.

Le déploiement est directement connecté au dépôt GitHub.

Processus :

```txt
Modification du projet
        │
        ▼
Commit Git
        │
        ▼
Push GitHub
        │
        ▼
Déploiement Netlify
```

Cette approche permet une mise à jour rapide et centralisée du site.

---

# Architecture de déploiement

```txt
Utilisateur
      │
      ▼
Site Netlify
      │
      ▼
Frontend Vite
      │
      ▼
API Express
      │
      ▼
SQLite
(esportify.db)
```

---

# Avantages du déploiement

Cette stratégie apporte :

* une installation rapide ;
* une meilleure reproductibilité ;
* une gestion simplifiée des dépendances ;
* une automatisation partielle du workflow ;
* une maintenance facilitée ;
* une meilleure portabilité entre environnements ;
* une préparation aux évolutions futures.

---

# Conclusion

Le projet Esportify+ peut être exécuté localement via Node.js ou dans un environnement conteneurisé avec Docker.

L'utilisation combinée de GitHub, Netlify, Docker, Docker Compose, Express, SQLite, Better-SQLite3 et Zod permet de professionnaliser le cycle de développement, de déploiement et de maintenance du projet.

Cette architecture facilite les futures évolutions du backend tout en conservant une base technique cohérente, maintenable et évolutive.

Les dernières améliorations ont également permis d'automatiser une partie du workflow de développement et de déploiement afin de simplifier les opérations de maintenance, de compilation et de livraison du projet.
