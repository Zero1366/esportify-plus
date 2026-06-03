# Documentation de déploiement - Esportify+

## Objectif

Ce document explique comment installer, lancer et déployer le projet Esportify+.

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

# Lancement du projet

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

Une route de test est disponible :

```txt
http://localhost:3000/health
```

Réponse attendue :

```json
{
  "status": "ok",
  "service": "Esportify+ API"
}
```

---

# Déploiement avec Docker

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

# Déploiement GitHub

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

# Déploiement Netlify

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
Données
```

---

# Conclusion

Le projet Esportify+ peut être exécuté localement via Node.js ou dans un environnement conteneurisé avec Docker.

L'utilisation combinée de GitHub, Netlify et Docker permet de professionnaliser le cycle de déploiement et de maintenance du projet.
