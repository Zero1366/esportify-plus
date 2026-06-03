# Programmation orientée objet - Esportify+

## Objectif

Ce document présente l'organisation du backend d'Esportify+ ainsi que la séparation des responsabilités mise en place afin de faciliter la maintenance, l'évolution et la compréhension du projet.

---

## Route

Les routes reçoivent les requêtes HTTP provenant du front-end.

Elles ont pour rôle de :

* recevoir les demandes des utilisateurs ;
* transmettre les informations aux services concernés ;
* retourner les réponses au client.

Exemples :

* connexion utilisateur ;
* consultation des événements ;
* gestion des inscriptions ;
* accès aux données de la plateforme.

---

## Service

Les services contiennent la logique métier de l'application.

Ils permettent notamment de :

* vérifier les informations reçues ;
* appliquer les règles métier ;
* contrôler les droits utilisateurs ;
* gérer les traitements spécifiques de l'application.

Exemples :

* vérifier le rôle utilisateur ;
* contrôler si un événement peut être validé ;
* empêcher une inscription en double ;
* appliquer les règles liées aux statuts.

---

## Repository

Les repositories gèrent l'accès aux données.

Ils permettent de :

* récupérer des informations ;
* rechercher des utilisateurs ;
* consulter les événements ;
* manipuler les données de l'application.

Exemples :

* lire les utilisateurs ;
* créer un événement ;
* modifier un statut ;
* récupérer les replays.

---

## Entity

Les entités représentent les objets métier manipulés par l'application.

Exemples :

* User ;
* Role ;
* Event ;
* Tournament ;
* Replay ;
* Registration ;
* Message.

Chaque entité regroupe les informations nécessaires à son fonctionnement.

---

## Séparation des responsabilités

L'architecture du projet repose sur une séparation claire des responsabilités :

```text
Front-end
    |
    ▼
Routes
    |
    ▼
Services
    |
    ▼
Repositories
    |
    ▼
Données
```

Cette organisation permet d'éviter le mélange entre l'affichage, les traitements métier et l'accès aux données.

---

## Exemple de flux

1. Le front-end envoie une demande.
2. La route reçoit la requête.
3. Le service applique les règles métier.
4. Le repository interagit avec les données.
5. La route retourne une réponse au front-end.

---

## Avantages

Cette architecture permet :

* une meilleure organisation du code ;
* une maintenance simplifiée ;
* une évolution plus facile du projet ;
* une meilleure réutilisation du code ;
* une séparation claire des responsabilités.

---

## Conclusion

Cette organisation rend le projet plus lisible, maintenable et proche d'une architecture professionnelle.

Elle facilite également les futures évolutions du backend tout en conservant une structure cohérente et évolutive.
