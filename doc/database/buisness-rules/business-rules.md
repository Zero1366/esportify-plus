# Règles métier - Esportify+

## Objectif

Ce document présente les principales règles métier appliquées au projet Esportify+.

Ces règles définissent les comportements attendus de l'application ainsi que les droits associés aux différents rôles utilisateurs.

---

## Rôles utilisateurs

L’application distingue plusieurs rôles :

* visiteur ;
* joueur (`player`) ;
* organisateur (`organizer`) ;
* administrateur (`admin`).

Chaque rôle possède des droits et des responsabilités spécifiques.

---

## Visiteur

Un visiteur peut :

* consulter les pages publiques ;
* consulter les événements disponibles ;
* consulter les replays ;
* accéder à la page de connexion.

Un visiteur ne peut pas :

* accéder à l’espace administrateur ;
* accéder à l’espace organisateur ;
* s’inscrire à un événement ;
* modifier des événements.

---

## Joueur

Un joueur connecté peut :

* consulter les événements ;
* consulter les replays ;
* gérer sa session ;
* s’inscrire à un événement.

Un joueur ne peut pas :

* valider un événement ;
* gérer les utilisateurs ;
* accéder aux outils d’administration ;
* modifier les événements d’un organisateur.

---

## Organisateur

Un organisateur peut :

* proposer un événement ;
* gérer ses compétitions ;
* consulter les inscriptions liées à ses événements ;
* suivre les informations relatives à ses tournois.

Un organisateur ne peut pas :

* valider globalement tous les événements ;
* modifier les droits des utilisateurs ;
* accéder à l’administration complète ;
* gérer les événements des autres organisateurs.

---

## Administrateur

Un administrateur peut :

* valider ou refuser un événement ;
* superviser la plateforme ;
* gérer les statuts ;
* contrôler les accès principaux ;
* gérer les contenus de la plateforme ;
* administrer les utilisateurs.

L’administrateur possède les droits les plus élevés dans l’application.

---

## Authentification

Un utilisateur doit fournir un identifiant et un mot de passe valides afin d’accéder aux fonctionnalités protégées.

Les identifiants sont vérifiés par le backend Express puis comparés aux données enregistrées dans la base SQLite.

Une session est créée après validation de la connexion.

Les espaces administrateur et organisateur sont protégés par des contrôles de rôles.

---

## Événements

Un événement possède obligatoirement :

* un titre ;
* un jeu associé ;
* un organisateur ;
* une date.

Un événement peut avoir plusieurs statuts :

* pending ;
* validated ;
* refused ;
* cancelled ;
* live ;
* upcoming.

Un événement en attente doit être validé avant d’être considéré comme disponible publiquement.

---

## Validation des événements

Tout événement créé par un organisateur doit être vérifié avant publication.

L’administrateur peut :

* valider l’événement ;
* refuser l’événement ;
* modifier son statut.

Un événement non validé reste inaccessible au public.

---

## Inscriptions

Un utilisateur ne peut pas s’inscrire plusieurs fois au même événement.

Une inscription est obligatoirement liée :

* à un utilisateur ;
* à un événement.

Une inscription peut avoir plusieurs statuts :

* pending ;
* accepted ;
* refused ;
* confirmed.

---

## Replays

Un replay est obligatoirement lié à un événement existant.

Un replay permet de consulter une simulation de match ou de compétition.

Un événement peut posséder un ou plusieurs replays.

---

## Messages

Un message doit obligatoirement posséder :

* un expéditeur ;
* un contenu ;
* une date de création.

Un message peut être adressé à un utilisateur spécifique.

Les échanges permettent de faciliter la communication entre les membres de la plateforme.

Un utilisateur peut envoyer plusieurs messages et recevoir plusieurs messages.

---

## Gestion des rôles

Chaque utilisateur possède un rôle unique.

Les droits d’accès sont déterminés à partir du rôle attribué lors de la connexion.

Les fonctionnalités disponibles dans l’interface évoluent selon le rôle de l’utilisateur connecté.

---

## Règles de validation

Les données reçues par l’API sont contrôlées avant traitement.

La validation permet notamment :

* de vérifier les informations de connexion ;
* de limiter les données invalides ;
* de garantir la cohérence des traitements ;
* d’améliorer la fiabilité du backend.

La validation des données est réalisée à l’aide de la bibliothèque Zod avant l’exécution des traitements métier.

---

## Base de données

Les données de l’application sont stockées dans une base SQLite.

Le schéma SQL contient notamment les tables :

* roles ;
* users ;
* events ;
* tournaments ;
* replays ;
* registrations ;
* messages.

Ces informations permettent au backend de gérer les utilisateurs, les événements, les inscriptions, les replays ainsi que les règles d’accès associées aux différents rôles.

Les contraintes SQL (CHECK, UNIQUE et FOREIGN KEY) participent également à la cohérence des données.

---

## Conclusion

Ces règles métier permettent d’organiser les accès, les statuts et les responsabilités entre les différents rôles de l’application.

Elles constituent une base fonctionnelle permettant de garantir la cohérence du comportement d’Esportify+ et accompagnent les différents modèles de données définis dans le projet.

Elles sont appliquées conjointement au frontend, au backend Express et à la base SQLite afin d’assurer un fonctionnement cohérent de l’ensemble de la plateforme.
