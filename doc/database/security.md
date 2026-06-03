# Sécurité - Esportify+

## Objectif

Ce document présente les principales mesures de sécurité prévues ou appliquées dans le projet Esportify+.

---

## Gestion des rôles

L’application utilise une logique de rôles afin de limiter l’accès à certaines pages et fonctionnalités.

Rôles prévus :

* visiteur ;
* utilisateur ;
* organisateur ;
* administrateur.

Exemples :

* un visiteur peut consulter les pages publiques ;
* un utilisateur peut consulter les événements et les replays ;
* un organisateur peut gérer ses événements ;
* un administrateur peut superviser la plateforme.

---

## Protection des accès

Certaines pages sont protégées selon le rôle de l’utilisateur.

Exemples :

* page administrateur réservée au rôle admin ;
* page organisateur réservée au rôle organizer ;
* actions de validation réservées à l’administrateur.

Cette séparation permet de limiter l’accès aux fonctionnalités sensibles.

---

## Gestion des sessions

Le projet utilise un système de session côté client permettant de conserver les informations de connexion.

Les informations de session sont enregistrées dans le navigateur afin de gérer les accès selon le rôle de l’utilisateur connecté.

Les données stockées comprennent :

* identifiant utilisateur ;
* nom d’utilisateur ;
* rôle.

---

## Validation des données avec Zod

Le backend utilise la bibliothèque Zod afin de valider les données reçues par l’API.

Exemple :

* vérification du pseudo ;
* vérification du mot de passe ;
* contrôle du format des données.

Cette validation permet de limiter les erreurs et les données invalides envoyées au serveur.

---

## Middleware de gestion des erreurs

Un middleware global de gestion des erreurs a été mis en place dans le backend.

Il permet :

* de centraliser les erreurs ;
* de faciliter le débogage ;
* de fournir des réponses cohérentes ;
* d’améliorer la maintenance du projet.

Exemple :

```json
{
  "success": false,
  "message": "Erreur interne du serveur"
}
```

---

## Communication API

La communication entre le frontend et le backend repose sur l’API Fetch.

Les échanges utilisent le format JSON.

Exemple :

```txt
Frontend
    │
    ▼
Fetch API
    │
    ▼
Backend Express
```

Cette architecture permet de séparer clairement les responsabilités entre les différentes couches de l’application.

---

## Configuration CORS

Le backend utilise le middleware CORS afin d’autoriser les échanges entre le frontend et le backend pendant le développement.

Cette configuration permet :

* l’accès sécurisé à l’API ;
* la communication entre les différents services ;
* le fonctionnement correct des requêtes Fetch.

---

## Protection contre les injections SQL

Dans une version connectée à une base de données, les requêtes devront utiliser des requêtes préparées afin d’éviter les injections SQL.

Exemple de bonne pratique :

```sql
SELECT * FROM users WHERE email = ?;
```

Cette approche permet d’éviter l’exécution de code SQL malveillant.

---

## Évolutions futures

Plusieurs améliorations de sécurité sont prévues :

* authentification JWT ;
* chiffrement des mots de passe avec bcrypt ;
* variables d’environnement ;
* sécurisation avancée des sessions ;
* amélioration des contrôles d’accès ;
* système de logs de sécurité.

---

## Conclusion

La sécurité d’Esportify+ repose actuellement sur une gestion des rôles, une validation des données avec Zod, une gestion des sessions, une communication API structurée et un middleware de gestion des erreurs.

Ces éléments constituent une première base de sécurité qui pourra être renforcée lors des futures évolutions du projet.
