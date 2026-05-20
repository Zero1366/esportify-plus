# Règles métier - Esportify+

## Objectif

Ce document présente les règles métier principales prévues pour le projet Esportify+.

---

## Rôles utilisateurs

L’application distingue plusieurs rôles :

- visiteur ;
- utilisateur ;
- organisateur ;
- administrateur.

Chaque rôle possède des droits spécifiques.

---

## Visiteur

Un visiteur peut :

- consulter les pages publiques ;
- voir les événements disponibles ;
- accéder à la page de connexion.

Un visiteur ne peut pas :

- accéder à l’espace administrateur ;
- accéder à l’espace organisateur ;
- modifier des événements.

---

## Utilisateur

Un utilisateur connecté peut :

- consulter les événements ;
- accéder aux replays ;
- s’inscrire à un événement.

Un utilisateur ne peut pas :

- valider un événement ;
- gérer les utilisateurs ;
- accéder aux outils administrateur.

---

## Organisateur

Un organisateur peut :

- proposer un événement ;
- gérer ses compétitions ;
- consulter les inscriptions liées à ses événements.

Un organisateur ne peut pas :

- valider globalement tous les événements ;
- modifier les droits des utilisateurs ;
- accéder à l’administration complète.

---

## Administrateur

Un administrateur peut :

- valider ou refuser un événement ;
- superviser la plateforme ;
- gérer les statuts ;
- contrôler les accès principaux.

---

## Événements

Un événement peut avoir plusieurs statuts :

- pending ;
- validated ;
- refused ;
- cancelled.

Un événement en attente doit être validé avant d’être considéré comme disponible publiquement.

---

## Inscriptions

Un utilisateur ne peut pas s’inscrire plusieurs fois au même événement.

Une inscription peut avoir plusieurs statuts :

- pending ;
- accepted ;
- refused.

---

## Replays

Un replay est lié à un événement existant.

Un replay permet de consulter une simulation de match ou de compétition.

---

## Conclusion

Ces règles métier permettent d’organiser les accès, les statuts et les responsabilités entre les différents rôles de l’application.