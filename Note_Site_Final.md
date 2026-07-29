Note finale — Esportify+

Présentation générale

Esportify+ est une application web full-stack de démonstration réalisée dans le cadre de la préparation à l’ECF.

Le projet a été conçu pour présenter une plateforme e-sport permettant de consulter des événements, suivre un replay simulé et accéder à plusieurs espaces selon le rôle de l’utilisateur.

Cette version met en avant une organisation claire entre :

le frontend ;

le backend ;

la base de données ;

les rôles utilisateurs ;

la documentation technique ;

les preuves de conception, de développement et de déploiement.

Objectifs du projet

Esportify+ a pour objectifs de démontrer la capacité à :

concevoir une interface web cohérente ;

développer des pages responsives ;

utiliser TypeScript pour gérer des comportements dynamiques ;

développer une API avec Express ;

utiliser SQLite et du SQL natif ;

gérer plusieurs rôles utilisateurs ;

structurer un projet full-stack ;

utiliser Git et GitHub ;

exécuter le projet avec Docker ;

préparer et documenter un déploiement ;

présenter des preuves techniques compréhensibles par un jury.

Fonctionnalités principales

La version présentée comprend les pages et fonctionnalités suivantes :

Accueil

La page d’accueil présente l’identité visuelle d’Esportify+ et permet d’accéder aux principales sections de l’application.

Événements

La page Événements permet notamment de :

consulter les événements disponibles ;

utiliser des filtres ;

effectuer une recherche ;

visualiser différents statuts ;

afficher dynamiquement le nombre de résultats.

Replay

La page Replay présente une simulation de match e-sport.

Elle permet de visualiser :

les équipes ;

le score ;

les actions du match ;

les contrôles de lecture ;

les changements d’état gérés en TypeScript.

Le replay reste volontairement simulé dans cette version de démonstration.

Connexion et gestion des rôles

L’application utilise des comptes de démonstration associés à trois rôles :

player
organizer
admin

Ces rôles permettent d’illustrer différents niveaux d’accès dans l’interface.

Espace Organisateur

L’espace Organisateur permet notamment de :

consulter un résumé des activités ;

suivre les événements ;

proposer une nouvelle activité ;

renseigner les informations nécessaires à son organisation.

Espace Administrateur

L’espace Administrateur permet notamment de :

consulter les demandes ;

suivre les signalements ;

superviser les joueurs ;

visualiser les actions traitées ;

accéder à un espace de supervision.

Contact

La page Contact présente un formulaire comprenant :

un nom ;

une adresse e-mail ;

un sujet ;

un message.

Technologies utilisées

Le projet s’appuie principalement sur les technologies suivantes :

HTML ;

CSS ;

TypeScript ;

Vite ;

Node.js ;

Express ;

SQLite ;

SQL natif ;

Docker ;

Docker Compose ;

Git ;

GitHub ;

Netlify.

Architecture générale

L’architecture logique du projet est la suivante :

Utilisateur
    ↓
Frontend Vite / TypeScript
    ↓
API Express
    ↓
Base de données SQLite

Le frontend et le backend restent deux parties distinctes du projet.

Cette séparation permet de mieux organiser :

l’interface utilisateur ;

les traitements côté serveur ;

l’accès aux données ;

les responsabilités de chaque composant.

Conception

La réflexion menée avant et pendant le développement est présentée à travers plusieurs livrables :

un MCD ;

un diagramme de cas d’utilisation ;

un diagramme de séquence ;

une représentation de l’architecture ;

une documentation des choix techniques ;

des fichiers décrivant le fonctionnement du projet.

Ces éléments permettent de démontrer la logique utilisée pour structurer les données, les rôles et les principales interactions.

Base de données

La base de données SQLite est utilisée par le backend.

Les preuves SQL peuvent notamment présenter :

les instructions CREATE TABLE ;

les clés primaires ;

les contraintes ;

les relations entre les données ;

les instructions INSERT INTO ;

les données de démonstration ;

l’initialisation de la base.

SQLite a été retenu pour disposer d’une base légère, locale et adaptée au contexte de démonstration du projet.

Interface et responsive design

Les captures finales sont organisées dans le répertoire suivant :

doc/
└── site-final/
    ├── Desktop/
    └── Mobile/

Deux formats principaux sont utilisés :

Desktop : 1366 × 768 pixels ;

Mobile : 360 × 800 pixels.

Les captures permettent de vérifier :

la cohérence graphique ;

la lisibilité ;

la navigation ;

l’organisation des contenus ;

l’adaptation des blocs ;

l’utilisation des formulaires ;

l’affichage des différents espaces utilisateurs.

Organisation des preuves

Les preuves préparées pour le dossier comprennent notamment :

les captures du rendu final ;

les extraits de code réalisés avec Carbon ;

les diagrammes de conception ;

les extraits SQL ;

la documentation du frontend ;

la documentation du backend ;

les preuves Git et GitHub ;

les preuves Docker ;

les résultats des tests ;

les résultats des builds ;

le guide de déploiement ;

les preuves Netlify.

Pour chaque fonctionnalité importante, la présentation repose autant que possible sur trois éléments :

Capture du code
      ↓
Explication du fonctionnement
      ↓
Capture du résultat final

Cette méthode permet de relier directement le développement réalisé au résultat visible dans l’application.

Git et suivi du projet

Git et GitHub sont utilisés pour :

suivre les modifications ;

enregistrer les étapes importantes ;

conserver l’historique des commits ;

vérifier l’état du dépôt ;

transmettre les modifications ;

connecter le frontend à Netlify.

Les preuves peuvent notamment montrer :

la branche principale ;

l’historique des commits ;

un git status propre ;

un git push réussi ;

l’arborescence du dépôt GitHub.

Docker

Docker et Docker Compose permettent de reproduire plus facilement l’environnement du projet.

Ils peuvent être utilisés pour :

construire les images ;

démarrer les conteneurs ;

isoler les services ;

lancer le backend dans un environnement dédié ;

faciliter la reproduction de l’installation.

Docker facilite l’exécution du projet, mais ne constitue pas à lui seul un hébergement public du backend.

Tests et vérifications

Avant la présentation finale, les vérifications suivantes doivent être réalisées :

installation correcte des dépendances ;

build du frontend ;

build du backend ;

exécution des tests disponibles ;

lancement local du frontend ;

lancement local du backend ;

vérification de la connexion à SQLite ;

vérification de la navigation ;

vérification des événements ;

vérification du replay ;

vérification des rôles ;

vérification des formulaires ;

vérification Desktop ;

vérification Mobile ;

vérification Docker ;

vérification Git ;

vérification du déploiement Netlify.

État du déploiement

Dans la version actuelle :

le frontend Vite peut être publié sur Netlify ;

le backend Express est exécuté localement ou avec Docker ;

la base SQLite est utilisée par le backend ;

Netlify ne déploie pas directement le serveur Express ;

le backend n’est pas présenté comme entièrement hébergé en production.

Le projet ne doit donc pas être décrit comme une application full-stack intégralement accessible en ligne.

Le déploiement public complet du backend constitue une évolution possible.

Sécurité et confidentialité

Les captures et fichiers transmis ne doivent pas exposer :

de mot de passe personnel ;

de jeton privé ;

de clé secrète ;

de variable d’environnement sensible ;

d’identifiant privé ;

d’information personnelle inutile.

Les comptes visibles dans le projet sont uniquement des comptes de démonstration.

Les fichiers .env ne doivent pas être publiés sur GitHub.

Un fichier .env.example peut être utilisé pour présenter les noms des variables attendues avec des valeurs fictives.

Limites assumées

Esportify+ reste une application de démonstration.

Certaines fonctionnalités ont été volontairement limitées afin de conserver un projet :

clair ;

stable ;

compréhensible ;

documenté ;

maintenable ;

présentable dans le temps disponible.

Les principales limites sont les suivantes :

le replay est simulé ;

l’authentification est adaptée à la démonstration ;

le backend n’est pas hébergé publiquement dans la version actuelle ;

SQLite est utilisée comme base légère ;

certaines évolutions peuvent être ajoutées après l’ECF.

Ces limites sont documentées afin de présenter honnêtement l’état réel du projet.

Évolutions possibles

Les évolutions futures pourraient comprendre :

l’hébergement public du backend ;

l’utilisation d’une base de données distante ;

une authentification renforcée ;

une gestion complète des comptes ;

une gestion plus avancée des événements ;

un replay connecté à des données réelles ;

des tests automatisés supplémentaires ;

une amélioration de l’accessibilité ;

une administration plus complète.

Conclusion

Esportify+ présente une architecture cohérente séparant le frontend, le backend et la base de données.

Le projet permet de démontrer des compétences en :

conception d’une application web ;

développement d’interfaces ;

responsive design ;

programmation TypeScript ;

développement d’une API Express ;

utilisation de SQLite ;

écriture de SQL natif ;

gestion des rôles ;

utilisation de Git et GitHub ;

utilisation de Docker ;

préparation d’un déploiement ;

documentation technique ;

présentation de preuves.

La documentation, les diagrammes, les extraits de code et les captures finales permettent au jury de comprendre le fonctionnement du projet et de vérifier concrètement les compétences mises en œuvre.

La version présentée constitue une base fonctionnelle, cohérente et documentée, adaptée au contexte de démonstration de l’ECF.