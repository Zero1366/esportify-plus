Workflow Git - Esportify+

Objectif

Ce document présente l'utilisation de Git et GitHub dans le projet Esportify+.

Git permet de suivre l'évolution du projet, de sauvegarder les modifications et de conserver un historique clair du développement.

Outils utilisés

Le projet utilise :

Git ;

GitHub ;

Visual Studio Code ;

Netlify pour le déploiement du frontend ;

Docker pour la conteneurisation ;

Docker Compose pour l'orchestration locale.

Organisation du dépôt

Le projet est versionné dans un dépôt GitHub.

Le dépôt contient :

le code source front-end ;

le code source back-end ;

la documentation technique ;

les fichiers SQL ;

les fichiers Docker ;

les diagrammes UML ;

les assets du projet.

Branche principale

La branche principale utilisée est :

main

Cette branche contient la version principale et de référence du projet.

Les modifications sont testées localement avant d'être ajoutées dans Git puis envoyées sur GitHub.

Dans le cadre de ce projet individuel, le développement a principalement été réalisé directement sur cette branche.

Commandes principales

Vérifier l'état du projet

git status

Cette commande permet de voir :

les fichiers modifiés ;

les fichiers non suivis ;

les fichiers préparés pour un commit ;

l'état de synchronisation avec le dépôt distant.

Ajouter tous les fichiers modifiés

git add .

Ajouter un fichier précis

git add chemin/du/fichier

Créer un commit

git commit -m "message du commit"

Envoyer les modifications sur GitHub

git push

Récupérer les dernières modifications

git pull

Consulter l'historique simplifié

git log --oneline

Consulter les dépôts distants configurés

git remote -v

Exemple de workflow utilisé

Pendant le développement, le workflow appliqué est le suivant :

Modification du code
        |
        ▼
Tests locaux
        |
        ▼
git status
        |
        ▼
git add .
        |
        ▼
git commit
        |
        ▼
git push
        |
        ▼
Sauvegarde GitHub
        |
        ▼
Déploiement Netlify du frontend

Ce fonctionnement permet de vérifier les modifications avant leur sauvegarde définitive.

Vérifications avant un commit

Avant de créer un commit important, les vérifications suivantes peuvent être réalisées :

npm run build
npm test

Selon la partie du projet concernée, les tests peuvent être exécutés dans le dossier frontend ou backend.

Les pages principales sont également vérifiées manuellement :

accueil ;

événements ;

replay ;

connexion ;

espace organisateur ;

espace administrateur ;

contact.

Types de commits utilisés

Les messages de commit permettent de comprendre rapidement la nature des modifications.

Exemples :

feat: ajout d'une fonctionnalité
fix: correction d'un bug
docs: mise à jour de la documentation
chore: modification technique ou organisationnelle
refactor: amélioration de la structure du code
test: ajout ou modification de tests
style: amélioration de la présentation sans changement fonctionnel

Exemples de messages de commit liés au projet

Les exemples suivants correspondent aux principales catégories de travaux réalisés sur Esportify+ :

docs: ajout de la documentation technique
feat: ajout du backend Express
feat: ajout de SQLite
feat: ajout de la validation Zod
feat: ajout de UserEntity
feat: ajout de SafeUser
fix: correction des routes API
fix: amélioration de la sécurité SQLite
chore: réorganisation de l'architecture backend
docs: ajout des diagrammes UML
docs: ajout de la documentation NoSQL
docs: ajout de la documentation POO
test: ajout des tests du backend

La liste définitive des commits réels peut être consultée avec :

git log --oneline

Suivi des corrections

Git a été utilisé pour suivre les améliorations apportées au projet, notamment :

ajout du backend Express ;

ajout de SQLite avec better-sqlite3 ;

ajout de la validation Zod ;

ajout de UserEntity et SafeUser ;

ajout du middleware de gestion des erreurs ;

ajout des contraintes SQL ;

ajout de la documentation technique ;

ajout du schéma SQL ;

ajout de l'étude NoSQL ;

ajout de Docker ;

mise à jour de l'architecture du projet ;

amélioration des pages HTML ;

ajout des rôles utilisateur, organisateur et administrateur ;

amélioration des tests et de l'initialisation de la base de données.

Fichiers exclus du dépôt

Le fichier .gitignore permet d'éviter l'envoi sur GitHub de fichiers générés, volumineux ou sensibles.

Exemples courants :

node_modules/
dist/
coverage/
.env
*.log

Selon la configuration finale du projet, d'autres fichiers peuvent également être exclus.

Les éléments suivants ne doivent jamais être publiés :

mots de passe ;

jetons privés ;

clés secrètes ;

véritables variables d'environnement ;

informations personnelles inutiles.

Le fichier .env.example peut être versionné lorsqu'il contient uniquement des exemples sans valeur sensible.

Déploiement avec GitHub et Netlify

Le dépôt GitHub est relié à Netlify pour le déploiement du frontend.

Processus :

Commit local
      |
      ▼
Push GitHub
      |
      ▼
Récupération du dépôt par Netlify
      |
      ▼
Construction du frontend
      |
      ▼
Déploiement Netlify
      |
      ▼
Site en ligne mis à jour

Cette organisation permet de conserver un historique de développement tout en facilitant le déploiement.

Le backend reste documenté et testé séparément selon l'architecture retenue pour le projet.

Preuves Git et GitHub

Les preuves suivantes peuvent être ajoutées au dossier final :

arborescence du dépôt GitHub ;

historique des commits ;

branche main ;

résultat de git status ;

résultat d'un git push réussi ;

fichier README.md visible sur GitHub ;

documentation du workflow Git ;

configuration du dépôt distant ;

déploiement Netlify réussi ;

site final accessible en ligne.

Exemple d'intégration d'une capture :

![Arborescence finale du dépôt GitHub](./Images/GIT-01-Arborescence-GitHub.png)

Exemple pour l'historique :

![Historique Git - partie 1](./Images/GIT-02-Historique-Partie-1.png)

Exemple pour le déploiement :

![Déploiement Netlify réussi](./Images/DEPLOIEMENT-02-Build-Reussi.png)

Les noms des images devront être adaptés à l'organisation finale du dossier de preuves.

Organisation des captures

Pour une version finale sans sous-dossiers, les captures peuvent être placées directement à côté du document avec une numérotation claire :

GIT-01-Arborescence-GitHub.png
GIT-02-Historique-Partie-1.png
GIT-03-Historique-Partie-2.png
GIT-04-Git-Status-Propre.png
GIT-05-Git-Push-Reussi.png
DEPLOIEMENT-01-Configuration-Netlify.png
DEPLOIEMENT-02-Build-Reussi.png
DEPLOIEMENT-03-Site-En-Ligne.png

Cette organisation facilite la lecture et évite les chemins trop complexes.

Limites du workflow actuel

Dans le cadre de ce projet individuel :

le développement a principalement été réalisé sur la branche main ;

les pull requests n'ont pas été utilisées systématiquement ;

aucune organisation complexe de branches n'était nécessaire ;

le workflow a été volontairement simplifié afin de conserver une méthode claire et adaptée au périmètre du projet.

Ces choix sont cohérents avec un projet individuel de formation.

Évolution future du workflow

Dans une future version du projet, le workflow Git pourra être amélioré avec :

l'utilisation de branches dédiées ;

des pull requests ;

une branche de développement ;

une branche de production ;

une meilleure séparation entre les corrections, les fonctionnalités et la documentation ;

l'intégration de tests continus ;

l'ajout d'une intégration continue ;

la vérification automatique du build avant fusion ;

l'utilisation de tags pour identifier les versions stables.

Avantages du versionnement

L'utilisation de Git permet :

de sécuriser le code source ;

de conserver un historique complet des modifications ;

de faciliter les retours arrière ;

de documenter les évolutions du projet ;

de préparer le travail collaboratif ;

de professionnaliser l'organisation du développement ;

de faciliter le déploiement ;

de vérifier l'origine des corrections et des améliorations.

Conclusion

Git et GitHub ont été utilisés pour organiser, sauvegarder et suivre l'évolution du projet Esportify+.

Ce workflow permet de travailler de manière structurée, de conserver une trace claire des améliorations réalisées et d'accompagner les évolutions techniques du projet tout au long de son cycle de développement.

Le document pourra être complété une dernière fois avec les captures définitives, l'historique réel des commits et les preuves finales du déploiement Netlify.