# Documentation SQL - Esportify+

## Objectif du document

Ce document présente la partie SQL utilisée dans le projet Esportify+.

Il accompagne la capture `EsportifyDb.png`, qui montre l'état actuel de la base SQLite utilisée pour la démonstration du backend.

---

## Rôle de la base de données

La base SQLite permet de stocker les utilisateurs de démonstration utilisés par le backend Express.

Elle sert principalement à tester :

- la connexion des utilisateurs ;
- la récupération des comptes ;
- la gestion des rôles ;
- la communication entre le backend et les données.

---

## Capture de la base

![Capture de la base SQLite Esportify+](./EsportifyDb.png)

La capture montre la table `users`, utilisée pour représenter les différents profils disponibles dans l'application.

---

## Table actuelle : users

La table `users` contient les comptes de démonstration du projet.

| Champ | Rôle |
|---|---|
| `id` | Identifiant unique de l'utilisateur |
| `username` | Nom utilisé pour la connexion |
| `password` | Mot de passe de démonstration |
| `role` | Rôle attribué à l'utilisateur |

---

## Rôles présents

Les rôles actuellement utilisés sont :

- `admin` : accès aux fonctionnalités d'administration ;
- `organizer` : accès aux fonctionnalités d'organisation ;
- `user` : accès aux fonctionnalités joueur / utilisateur.

Ces rôles permettent de simuler plusieurs parcours dans l'application Esportify+.

---

## Utilisation dans le backend

Le backend Express utilise cette base pour vérifier les identifiants et retourner le rôle associé à l'utilisateur.

Ce fonctionnement permet ensuite au frontend d'adapter l'affichage selon le profil connecté.

Exemples :

- un administrateur accède à la page Admin ;
- un organisateur accède à la page Organisateur ;
- un utilisateur accède aux fonctionnalités classiques.

---

## Choix de SQLite

SQLite a été utilisé car il est simple à mettre en place pour un projet de démonstration.

Ce choix permet :

- d'éviter une installation complexe ;
- de tester rapidement le backend ;
- de conserver une base légère ;
- de préparer une évolution future vers une base plus complète.

---

## Limites actuelles

La base actuelle reste volontairement simple.

Elle ne gère pas encore :

- l'inscription réelle ;
- le hashage sécurisé des mots de passe ;
- les événements en base ;
- les inscriptions aux événements ;
- les matchs ;
- les replays ;
- l'archivage des résultats.

Ces éléments sont prévus comme des pistes d'évolution pour une version plus complète du projet.

---

## Évolutions possibles

Dans une version professionnelle, la base pourrait être étendue avec plusieurs tables :

- `users` ;
- `events` ;
- `registrations` ;
- `matches` ;
- `teams` ;
- `replays` ;
- `notifications`.

Cela permettrait de gérer réellement :

- les comptes utilisateurs ;
- les événements esport ;
- les inscriptions ;
- les matchs ;
- les scores ;
- les replays ;
- les notifications admin / organisateur ;
- l'archivage des anciennes compétitions.

---

## Conclusion

Cette base SQLite sert de première démonstration fonctionnelle pour Esportify+.

Elle permet de relier le backend Express à des données persistantes et de préparer une évolution vers une architecture plus complète.

Même si elle reste simple, elle montre la logique de séparation entre les données, le backend et l'interface utilisateur.