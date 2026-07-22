Esportify+ - Guide de déploiement

Esportify+ est un projet full-stack de démonstration utilisant :

Vite ;

TypeScript ;

Express ;

SQLite ;

Docker ;

Docker Compose ;

GitHub ;

Netlify.

Dans la version actuelle :

le frontend Vite peut être publié sur Netlify ;

le backend Express est exécuté localement ou avec Docker ;

la base SQLite est utilisée par le backend ;

Netlify ne déploie pas directement le serveur Express.

✅ Prérequis

Avant de lancer le projet, vérifier que les outils suivants sont installés :

Node.js ;

npm ;

Git ;

Docker ;

Docker Compose.

📦 Installation des dépendances

Frontend

Depuis la racine du projet :

npm install

Backend

Depuis le dossier backend :

cd backend
npm install

📦 Build de production

Build complet

Commande prévue :

npm run build:full

Selon les scripts définis dans le fichier package.json, cette commande peut :

compiler le frontend ;

compiler le backend ;

vérifier le projet TypeScript ;

préparer les fichiers nécessaires à la production.

Il faut vérifier que le script build:full existe réellement dans le fichier package.json avant de l'utiliser.

🚀 Développement local

Commande prévue :

npm run dev:full

Selon les scripts définis dans le projet, cette commande peut :

lancer le frontend ;

lancer le backend ;

initialiser l'environnement de développement.

Si ce script n'existe pas, le frontend et le backend doivent être lancés dans deux terminaux séparés.

Frontend

Depuis la racine du projet :

npm run dev

Backend

Depuis le dossier backend :

npm run dev

🧪 Vérifications avant déploiement

Avant un commit important ou un déploiement, les commandes suivantes peuvent être utilisées :

npm run build:full
npm test
git status

Selon l'organisation du projet, les tests peuvent également être exécutés séparément dans le frontend et le backend.

Vérifications manuelles recommandées :

vérifier la page d'accueil ;

tester la navigation ;

vérifier la page Événements ;

vérifier le replay ;

tester la connexion ;

tester l'espace organisateur ;

tester l'espace administrateur ;

vérifier la page Contact ;

vérifier l'affichage Desktop ;

vérifier l'affichage Mobile.

🚀 Préparation du déploiement

Commande prévue :

npm run deploy:full

Cette commande doit uniquement être présentée comme une automatisation réelle si le script deploy:full existe dans le fichier package.json.

Selon sa configuration, ce script peut :

exécuter le build de production ;

préparer les fichiers nécessaires au déploiement ;

automatiser certaines vérifications.

L'envoi vers GitHub reste réalisé avec les commandes Git suivantes :

git add .
git commit -m "description de la modification"
git push

Après le push, Netlify détecte les modifications du dépôt GitHub et lance automatiquement le déploiement du frontend.

🐳 Docker

Lancement de l'environnement conteneurisé :

docker compose up --build

Cette commande permet de :

construire les images Docker ;

démarrer les conteneurs ;

isoler les services dans un environnement dédié ;

reproduire plus facilement l'environnement du projet.

Pour arrêter les conteneurs :

docker compose down

Le backend peut être exécuté localement ou avec Docker selon la configuration retenue.

Docker facilite l'exécution du projet, mais ne constitue pas à lui seul un hébergement public du backend.

🌐 Netlify

Le frontend est déployé automatiquement avec Netlify à partir du dépôt GitHub.

Workflow :

Git Push
   ↓
GitHub reçoit les modifications
   ↓
Netlify détecte le changement
   ↓
Netlify lance le build du frontend
   ↓
Netlify publie le site

Éléments à vérifier dans Netlify :

dépôt GitHub correctement connecté ;

branche de production : main ;

commande de build correspondant au frontend ;

dossier de publication généré par Vite, généralement dist ;

dernier déploiement indiqué comme réussi ;

absence d'erreur dans les journaux de build.

Les valeurs exactes doivent correspondre au fichier netlify.toml et aux paramètres enregistrés dans l'interface Netlify.

📍 État actuel du déploiement

Dans la version actuelle :

le frontend Vite est publié sur Netlify ;

le backend Express est exécuté localement ou avec Docker ;

la base SQLite est utilisée par le backend ;

Netlify ne déploie pas directement le serveur Express ;

la mise en ligne complète du backend constitue une évolution future.

Le projet ne doit donc pas être présenté comme une application full-stack entièrement hébergée en production.

🔁 Workflow global

Développement local
        ↓
Tests et build
        ↓
git status
        ↓
git add .
        ↓
git commit
        ↓
git push
        ↓
GitHub
        ↓
Netlify
        ↓
Frontend publié en ligne

Pour le backend :

Backend Express
      ↓
Exécution locale
      ou
Docker
      ↓
Connexion à SQLite

⚙️ Architecture

Utilisateur
      ↓
Frontend Vite
      ↓
API Express
      ↓
SQLite Database

Cette architecture représente le fonctionnement logique du projet.

Dans la version actuelle, le frontend publié sur Netlify ne signifie pas nécessairement que l'API Express est elle aussi accessible publiquement.

🔐 Variables d'environnement

Les variables sensibles doivent être placées dans un fichier :

.env

Le fichier .env ne doit pas être publié sur GitHub.

Un fichier d'exemple peut être fourni :

.env.example

Ce fichier doit uniquement contenir :

les noms des variables attendues ;

des valeurs fictives ;

des exemples sans information sensible réelle.

Aucune capture ne doit afficher :

mot de passe ;

jeton privé ;

clé secrète ;

véritable variable d'environnement ;

information personnelle inutile.

📌 Notes importantes

Le backend peut être exécuté localement ou avec Docker.

Le frontend est déployé automatiquement avec Netlify.

SQLite est utilisé comme base de données légère pour la démonstration.

Les scripts npm doivent correspondre exactement au contenu des fichiers package.json.

Les commandes build:full, dev:full et deploy:full ne doivent être documentées comme fonctionnelles que si elles existent réellement.

Docker facilite la reproduction de l'environnement, mais ne déploie pas automatiquement le backend sur Internet.

Le frontend et le backend restent deux parties distinctes du projet.

📷 Preuves à préparer

Les captures finales peuvent montrer :

le dépôt GitHub ;

la branche main ;

l'historique des commits ;

un git status propre ;

un git push réussi ;

la configuration Netlify ;

un build Netlify réussi ;

le site frontend accessible en ligne ;

le lancement Docker ;

les conteneurs actifs ;

les résultats des tests ;

les commandes de build réussies.

Aucune capture ne doit exposer d'information sensible.

⭐ Conclusion

Ce document présente le cycle de développement et de déploiement du projet Esportify+.

Il permet de comprendre :

l'installation locale ;

le lancement du frontend ;

le lancement du backend ;

le build de production ;

les vérifications avant déploiement ;

l'utilisation de Git et GitHub ;

le déploiement du frontend avec Netlify ;

l'utilisation de Docker ;

la séparation entre le frontend, le backend et la base SQLite.

L'objectif est de présenter une architecture moderne, claire, documentée et reproductible, tout en décrivant honnêtement les limites de la version actuelle.