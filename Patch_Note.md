Patch Notes - Esportify+

Présentation

Ce document recense les principales améliorations apportées au projet Esportify+ après la première version du projet et à la suite des retours d’évaluation.

L’objectif de cette mise à jour est de professionnaliser l’architecture du projet, de renforcer sa maintenabilité, d’améliorer sa stabilité et d’enrichir sa documentation technique.

Front-end

Refonte de l’interface

Améliorations réalisées :

harmonisation de l’identité visuelle ;

amélioration de la page Replay ;

amélioration des espaces Administrateur et Organisateur ;

optimisation du responsive design ;

amélioration de la navigation ;

amélioration des composants d’interface ;

amélioration de la lisibilité générale.

Gestion des rôles

Refonte du système de rôles :

player ;

organizer ;

admin.

Les interfaces affichent désormais les fonctionnalités adaptées au rôle connecté.

Cette nomenclature est désormais identique entre :

le frontend ;

le backend ;

SQLite ;

la documentation technique.

Communication API

Ajout d’une communication structurée avec le backend :

requêtes Fetch ;

traitement des réponses JSON ;

gestion des erreurs ;

authentification utilisateur ;

timeout des requêtes ;

fallback automatique vers les données de démonstration.

Ajout du fichier :

apiClient.ts.

Fonctionnement :

Frontend
    │
    ▼
Fetch API
    │
    ▼
Backend Express
    │
    ▼
SQLite

Si indisponible :
    │
    ▼
Mode démonstration

Back-end

Création d’une API Express

Ajout d’un backend complet basé sur :

Node.js ;

Express ;

TypeScript.

Fonctionnalités ajoutées :

route d’authentification ;

route health ;

route version ;

gestion des erreurs ;

réponses JSON normalisées.

Validation avec Zod

Mise en place de la validation des données :

validation du nom d’utilisateur ;

validation du mot de passe ;

contrôle des données reçues ;

gestion des erreurs de validation.

Architecture en couches

Refonte complète de l’architecture backend :

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

Cette organisation améliore :

la maintenabilité ;

la lisibilité ;

l’évolutivité ;

la réutilisation du code.

Programmation orientée objet

Ajout de l’entité métier :

UserEntity.

Ajout du type sécurisé :

SafeUser.

Fonctionnalités :

encapsulation des données ;

méthodes métier ;

contrôle d’accès aux propriétés ;

suppression des données sensibles ;

centralisation de certaines règles métier.

Gestion centralisée des erreurs

Ajout d’un middleware global permettant :

la centralisation des erreurs ;

des réponses cohérentes ;

une maintenance facilitée.

Base de données

Migration SQLite

Remplacement du stockage JSON par une base SQLite.

Technologies ajoutées :

SQLite ;

Better-SQLite3.

Ajouts :

esportify.db ;

couche database ;

connexion centralisée ;

initialisation automatique ;

persistance des utilisateurs.

Configuration SQLite

Ajout de plusieurs mécanismes de fiabilité :

PRAGMA foreign_keys = ON ;

journal_mode WAL ;

busy_timeout ;

contraintes SQL.

Objectifs :

intégrité référentielle ;

amélioration des performances ;

limitation des corruptions ;

meilleure gestion des accès concurrents.

Schéma SQL

Création d’un schéma SQL complet :

roles ;

users ;

events ;

tournaments ;

replays ;

registrations ;

messages.

Contraintes SQL

Ajout de plusieurs mécanismes de protection :

PRIMARY KEY ;

FOREIGN KEY ;

UNIQUE ;

CHECK ;

index de performance.

Sécurité

Sécurisation de l’authentification

Ajouts :

validation Zod ;

hachage des mots de passe avec bcrypt ;

SafeUser ;

contrôles de rôles ;

requêtes préparées ;

encapsulation des données utilisateur.

Sécurisation SQLite

Configuration :

PRAGMA foreign_keys ;

journal_mode WAL ;

busy_timeout ;

contraintes SQL.

Sécurisation Express

Ajouts :

désactivation de X-Powered-By ;

contrôle des routes ;

middleware global d’erreurs ;

validation systématique des données.

Documentation

Création ou mise à jour des documents :

README.md ;

architecture.md ;

security.md ;

deployment.md ;

workflow-git.md ;

schema.sql ;

mcd.md ;

business-rules.md ;

nosql.md ;

poo.md ;

class-diagram.md ;

use-case.md ;

sequence-login.md ;

QUICK_GUIDE.md ;

Patch_Note.md.

UML

Ajout de plusieurs diagrammes :

diagramme de classes ;

diagramme de séquence ;

diagramme de cas d’utilisation ;

modèle conceptuel de données.

Docker

Ajout de la conteneurisation :

Dockerfile ;

docker-compose.yml.

Objectifs :

reproductibilité ;

standardisation ;

simplification du déploiement.

Git et GitHub

Amélioration du suivi de version :

organisation du dépôt ;

historisation des évolutions ;

documentation des modifications ;

préparation à un workflow plus avancé ;

ajout de liens directs vers le dépôt GitHub dans le dossier projet ;

vérification des dépôts avant le dépôt final du dossier.

Mise à jour complémentaire

Refonte visuelle de l’interface

Améliorations réalisées :

harmonisation des cartes de rôles ;

correction des couleurs et des états visuels ;

amélioration des animations de survol ;

uniformisation des espaces Administrateur et Organisateur ;

amélioration de la lisibilité générale ;

optimisation de la cohérence graphique entre les différentes pages.

Optimisation du Front-end

Améliorations réalisées :

nettoyage de plusieurs fichiers TypeScript ;

simplification de certaines logiques de navigation ;

amélioration de la gestion des sessions ;

amélioration de la gestion des rôles ;

optimisation du chargement des pages ;

harmonisation du comportement des différentes interfaces ;

vérification complète du code avant livraison.

Optimisation du Back-end

Améliorations réalisées :

vérification complète de la compilation TypeScript ;

validation du fonctionnement des routes Express ;

contrôle de la connexion SQLite ;

amélioration de la cohérence entre le frontend et le backend ;

nettoyage général du code avant déploiement ;

validation complète du build final.

Automatisation du workflow

Ajout d’un système permettant d’automatiser plusieurs tâches répétitives du projet.

Nouvelles commandes :

npm run dev:full
npm run build:full
npm run deploy:full

Fonctionnalités :

lancement simultané du frontend et du backend ;

vérification complète du projet ;

compilation automatisée ;

simplification du déploiement ;

réduction des manipulations manuelles ;

amélioration du workflow de développement.

Nettoyage Git

Améliorations réalisées :

suppression des fichiers générés inutiles ;

amélioration du suivi de version ;

nettoyage du dépôt avant livraison ;

préparation du projet pour les futures mises à jour.

Finalisation du dossier projet

Fusion documentaire de Frostia Games et Esportify+

Les projets Frostia Games et Esportify+ ont été réunis dans un dossier projet unique afin de présenter plus clairement la progression réalisée pendant la formation.

Cette fusion concerne uniquement la documentation, les preuves et la présentation au jury. Les deux applications restent des projets distincts, avec leurs propres technologies, dépôts GitHub, fichiers sources et méthodes de déploiement.

La fusion documentaire a permis de :

présenter les deux projets dans une structure commune ;

harmoniser les titres, les légendes et les explications ;

relier chaque preuve à son fichier source ;

regrouper les captures, diagrammes, scripts SQL et documents techniques ;

comparer les compétences mobilisées dans les deux projets ;

montrer l’évolution entre un projet Django et une application TypeScript, Express et SQLite ;

éviter les répétitions inutiles ;

faciliter la lecture et la vérification par le jury.

Le dossier final est organisé en deux parties principales :

Partie 1
└── Frostia Games
    ├── Conception
    ├── Architecture Django
    ├── Front-end
    ├── JavaScript
    ├── SQL
    ├── Sécurité
    ├── Tests
    └── Déploiement

Partie 2
└── Esportify+
    ├── Conception
    ├── Architecture client-serveur
    ├── Front-end
    ├── JavaScript et TypeScript
    ├── Backend Express
    ├── SQLite
    ├── Sécurité
    ├── Tests
    └── Déploiement

Organisation des annexes

Les preuves complémentaires ont été regroupées dans neuf annexes :

A1 — Frostia Games : maquettes et responsive
A2 — Frostia Games : Django et administration
A3 — Frostia Games : MCD et scripts SQL
A4 — Frostia Games : GitHub, Docker et Render

A5 — Esportify+ : conception et modélisation
A6 — Esportify+ : front-end et responsive
A7 — Esportify+ : MCD et scripts SQL
A8 — Esportify+ : back-end, sécurité et tests
A9 — Esportify+ : preuves techniques complémentaires

Une sauvegarde séparée des annexes et des preuves a également été conservée afin de sécuriser le travail réalisé.

Mise à jour des preuves de conception

Les éléments suivants ont été ajoutés ou réorganisés :

diagramme de cas d’utilisation de Frostia Games ;

diagramme de séquence de Frostia Games ;

diagramme de cas d’utilisation d’Esportify+ ;

diagramme de séquence de connexion d’Esportify+ ;

MCD des deux projets ;

scripts SQL natifs ;

extraits de code mis en forme avec Carbon ;

captures desktop, tablette et mobile ;

preuves GitHub, Docker, Render et Netlify.

Les diagrammes ont été générés à partir de fichiers Markdown contenant leur définition Mermaid. Les fichiers sources restent conservés dans les projets afin de pouvoir vérifier, modifier et régénérer les schémas.

Méthode commune de présentation des preuves

Chaque compétence importante est désormais présentée selon une méthode commune :

une capture du code ou une présentation lisible réalisée avec Carbon ;

une explication du fonctionnement, des choix et des traitements ;

une capture du rendu final lorsque la fonctionnalité possède une interface visible.

Cette méthode permet de relier plus facilement le code, le fonctionnement et le résultat obtenu.

Contrôle qualité final

Un contrôle qualité complet du dossier a été réalisé avant sa validation.

Vérifications effectuées :

cohérence du sommaire ;

numérotation des pages ;

harmonisation des titres ;

correction des légendes ;

vérification des annexes A1 à A9 ;

réduction de plusieurs textes trop longs ;

suppression des débordements dans les cadres ;

ajout des liens GitHub ;

contrôle des captures et des renvois vers les sources ;

vérification de la lisibilité en Calibri 16 ;

préparation de l’export PDF final.

Les pages consacrées aux choix techniques, à SQLite et au responsive ont été raccourcies afin de conserver une présentation lisible sans perdre les informations essentielles.

Liens GitHub ajoutés au dossier

La couverture du dossier contient désormais :

un lien vers l’ensemble des dépôts publics ;

un lien direct vers Esportify+ ;

un lien direct vers Frostia Games.

Liens utilisés :

https://github.com/Zero1366?tab=repositories
https://github.com/Zero1366/esportify-plus
https://github.com/Zero1366/frostia-games

Ces liens permettent au jury de consulter directement le code source, l’historique Git et la documentation des projets.

État de la version finale

Cette étape correspond principalement à une finalisation documentaire.

Aucune modification fonctionnelle majeure n’a été ajoutée à Esportify+ pendant cette dernière phase. Le travail a porté sur :

la vérification des preuves existantes ;

la mise à jour de la documentation ;

la fusion du dossier projet ;

l’organisation des annexes ;

la correction des descriptions techniques ;

la préparation du nouveau dépôt Git ;

la vérification des liens GitHub ;

la préparation du dossier avant les futurs retours.

La date de dépôt du dossier restera volontairement vide jusqu’à la validation des dernières mises à jour GitHub et de la documentation.

Évolutions prévues

Fonctionnalités envisagées :

authentification JWT ;

amélioration de la gestion des variables d’environnement ;

MongoDB ;

Mongoose ;

journalisation avancée ;

limitation des tentatives de connexion ;

système de notifications ;

statistiques avancées ;

gestion complète des tournois ;

hébergement complet du backend ;

déploiement permanent de la base de données.

Conclusion

Cette mise à jour marque une évolution importante du projet Esportify+.

Le projet dispose désormais :

d’une architecture backend en couches ;

d’une base SQLite sécurisée ;

d’une authentification connectée au backend ;

d’une validation des données avec Zod ;

d’un hachage des mots de passe avec bcrypt ;

d’une communication Fetch frontend/backend ;

d’une couche Repository ;

d’une entité UserEntity ;

d’un type SafeUser ;

d’une documentation technique complète ;

d’un workflow automatisé ;

d’une interface harmonisée ;

d’un processus de déploiement simplifié ;

d’une architecture proche des standards professionnels ;

d’un dossier projet fusionné avec Frostia Games ;

d’annexes structurées et sauvegardées ;

de liens GitHub permettant de vérifier directement les dépôts.

La fusion avec Frostia Games ne correspond pas à une fusion du code des deux applications. Elle permet de présenter dans un même dossier deux projets complémentaires, leurs différences techniques, les compétences mobilisées et la progression réalisée pendant la formation.

Cette version constitue l’aboutissement des principales améliorations réalisées après l’évaluation initiale. Elle servira de base aux futures évolutions du projet, aux prochains retours et à la préparation définitive du dépôt.