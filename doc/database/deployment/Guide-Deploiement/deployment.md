🚀 Esportify+ - Deployment Guide

Projet full-stack utilisant :

Vite
Express
SQLite
Docker
Netlify
📦 Build Production
🔧 Build complet

Commande :

npm run build:full

Cette commande :

compile le frontend ;
compile le backend ;
vérifie le projet TypeScript ;
prépare le build de production.
🚀 Développement local

Commande :

npm run dev:full

Cette commande :

lance le frontend ;
lance le backend ;
initialise l'environnement de développement.
🚀 Déploiement

Commande :

npm run deploy:full

Cette commande :

exécute le build de production ;
prépare l'envoi vers GitHub ;
déclenche le workflow de déploiement.
🐳 Docker

Lancement de l'environnement containerisé :

docker compose up --build

Cette commande :

construit les images Docker ;
démarre les conteneurs ;
isole le backend dans un environnement dédié.
🌐 Netlify

Le frontend est déployé automatiquement via Netlify.

Workflow :

GitHub Push
      ↓
Netlify détecte le changement
      ↓
Build automatique
      ↓
Publication du site
🔁 Workflow global
Développement local
      ↓
Git Push
      ↓
GitHub
      ↓
Netlify (Frontend)
      ↓
Docker (Backend optionnel)
      ↓
Application déployée
⚙️ Architecture
Utilisateur
      ↓
Frontend (Vite)
      ↓
API Express
      ↓
SQLite Database
📌 Notes
Le backend peut être exécuté localement ou via Docker.
Le frontend est déployé automatiquement via Netlify.
SQLite est utilisé comme base de données légère pour la démonstration.
Les scripts automatisés simplifient le workflow de développement et de déploiement.
⭐ Conclusion

Ce document présente le cycle de déploiement du projet Esportify+.

Il permet de comprendre :

le lancement local ;
le build de production ;
le déploiement du frontend ;
l'utilisation de Docker ;
le workflow GitHub et Netlify.

L'objectif est de reproduire une architecture moderne, simple à maintenir et facilement reproductible.