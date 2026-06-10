# Documentation de déploiement - Esportify+

## Objectif

Ce document explique comment installer, lancer et déployer le projet Esportify+.

---

## Prérequis

Avant de lancer le projet, les outils suivants doivent être installés :

* Node.js ;
* npm ;
* Git ;
* Docker (optionnel) ;
* Docker Compose (optionnel).

---

## Récupération du projet

```bash
git clone https://github.com/Zero1366/esportify-plus.git
cd esportify-plus
```

---

## Installation des dépendances

### Front-end

```bash
npm install
```

### Back-end

```bash
cd backend
npm install
```

---

## Lancement du projet

### Lancer le backend

Depuis le dossier backend :

```bash
npm run dev
```

Le serveur démarre sur :

```txt
http://localhost:3000
```

### Lancer le frontend

Depuis la racine du projet :

```bash
npm run dev
```

Le frontend démarre sur :

```txt
http://localhost:5173
```

---

## Vérification du backend

### Route principale

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

### Route de santé

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

### Route de version

```txt
http://localhost:3000/version
```

---

## Technologies backend utilisées

Le backend repose sur :

* Node.js ;
* Express ;
* TypeScript ;
* SQLite ;
* Better-SQLite3 ;
* Zod ;
* UserEntity ;
* SafeUser.

L'architecture est organisée en couches :

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

---

## Base de données SQLite

Au démarrage du serveur :

* la base SQLite est automatiquement initialisée ;
* les tables sont créées si elles n'existent pas ;
* les données de démonstration sont ajoutées si nécessaire.

Base utilisée :

```txt
database/esportify.db
```

Les principales tables sont :

* roles ;
* users ;
* events ;
* tournaments ;
* replays ;
* registrations ;
* messages.

---

## Déploiement avec Docker

Le projet peut être lancé à l'aide de Docker et Docker Compose.

Construction et lancement :

```bash
docker compose up --build
```

Le projet devient accessible sur :

```txt
http://localhost:5173
```

---

## Fichiers Docker utilisés

### Dockerfile

Le projet utilise un Dockerfile afin de construire automatiquement une image contenant l'application Node.js ainsi que l'ensemble de ses dépendances.

Le Dockerfile permet notamment :

* d'installer les dépendances ;
* de copier les fichiers du projet ;
* de définir le répertoire de travail ;
* de lancer automatiquement l'application.

Une capture du Dockerfile est disponible dans le dossier Images/deployment.

### docker-compose.yml

Le projet utilise également Docker Compose afin d'automatiser le lancement des différents services nécessaires au projet.

Le fichier docker-compose.yml permet :

* de construire l'image Docker ;
* de lancer automatiquement les conteneurs ;
* de configurer les ports ;
* de simplifier le déploiement.

Une capture du fichier docker-compose.yml est disponible dans le dossier Images/deployment.

---

## Déploiement GitHub

Le code source est hébergé sur GitHub.

Git permet :

* le suivi des versions ;
* la sauvegarde du projet ;
* la gestion des modifications ;
* la collaboration ;
* l'historique des développements.

Commandes principales :

```bash
git add .
git commit -m "message"
git push
```

---

## Déploiement Netlify

Le frontend est déployé avec Netlify.

Le déploiement est connecté au dépôt GitHub.

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

Cette approche permet une mise à jour rapide du site.

---

## Architecture de déploiement

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

## Avantages du déploiement

Cette stratégie de déploiement permet :

* une installation rapide du projet ;
* une meilleure reproductibilité de l'environnement ;
* une gestion simplifiée des dépendances ;
* une automatisation du déploiement ;
* une maintenance facilitée ;
* une meilleure portabilité entre les différents environnements.

---

## Conclusion

Le projet Esportify+ peut être exécuté localement via Node.js ou dans un environnement conteneurisé avec Docker.

L'utilisation combinée de GitHub, Netlify, Docker, Docker Compose, Express, SQLite, Better-SQLite3 et Zod permet de professionnaliser le cycle de développement, de déploiement et de maintenance du projet.

Cette architecture facilite les futures évolutions du backend tout en conservant une base technique cohérente et maintenable.
