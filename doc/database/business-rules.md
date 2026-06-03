# Règles métier - Esportify+

## Objectif

Ce document présente les principales règles métier appliquées au projet Esportify+.

Ces règles définissent les comportements attendus de l'application ainsi que les droits associés aux différents rôles utilisateurs.

---

## Rôles utilisateurs

L’application distingue plusieurs rôles :

* visiteur ;
* utilisateur ;
* organisateur ;
* administrateur.

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

## Utilisateur

Un utilisateur connecté peut :

* consulter les événements ;
* consulter les replays ;
* gérer sa session ;
* s’inscrire à un événement.

Un utilisateur ne peut pas :

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

---

## Conclusion

Ces règles métier permettent d’organiser les accès, les statuts et les responsabilités entre les différents rôles de l’application.

Elles constituent une base fonctionnelle permettant de garantir la cohérence du comportement d’Esportify+ et accompagnent les différents modèles de données définis dans le projet.
