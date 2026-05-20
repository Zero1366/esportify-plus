# Programmation orientée objet - Esportify+

## Objectif

Ce document explique la séparation des responsabilités prévue dans l’architecture back-end du projet Esportify+.

---

## Controller

Le controller reçoit les requêtes HTTP et retourne les réponses au client.

Exemples :
- récupérer les événements ;
- créer un événement ;
- connecter un utilisateur ;
- valider une inscription.

---

## Service

Le service contient la logique métier de l’application.

Exemples :
- vérifier le rôle utilisateur ;
- contrôler si un événement peut être validé ;
- empêcher une inscription en double ;
- appliquer les règles liées aux statuts.

---

## Repository

Le repository gère l’accès aux données.

Exemples :
- lire les utilisateurs ;
- créer un événement ;
- modifier un statut ;
- récupérer les replays.

---

## Entity

L’entity représente les objets métier.

Exemples :
- User
- Role
- Event
- Tournament
- Replay
- Registration

---

## Exemple de flux

1. Le front-end envoie une demande.
2. Le controller reçoit la requête.
3. Le service applique les règles métier.
4. Le repository interagit avec la base de données.
5. Le controller retourne une réponse au front-end.

---

## Conclusion

Cette séparation rend le projet plus lisible, maintenable et proche d’une architecture professionnelle.