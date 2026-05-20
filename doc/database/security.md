# Sécurité - Esportify+

## Objectif

Ce document présente les principales mesures de sécurité prévues ou appliquées dans le projet Esportify+.

---

## Gestion des rôles

L’application utilise une logique de rôles afin de limiter l’accès à certaines pages et fonctionnalités.

Rôles prévus :

- visiteur
- utilisateur
- organisateur
- administrateur

Exemples :

- un visiteur peut consulter les pages publiques ;
- un utilisateur peut consulter les événements et les replays ;
- un organisateur peut gérer ses événements ;
- un administrateur peut superviser la plateforme.

---

## Protection des accès

Certaines pages sont protégées selon le rôle de l’utilisateur.

Exemples :

- page administrateur réservée au rôle admin ;
- page organisateur réservée au rôle organizer ;
- actions de validation réservées à l’administrateur.

---

## Protection contre les injections SQL

Dans une version connectée à une base de données, les requêtes devront utiliser des requêtes préparées afin d’éviter les injections SQL.

Exemple de bonne pratique :

```sql
SELECT * FROM users WHERE email = ?;