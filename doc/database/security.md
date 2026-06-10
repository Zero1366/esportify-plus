# Sécurité - Esportify+

## Objectif

Ce document présente les principales mesures de sécurité mises en place ainsi que les évolutions envisagées dans le projet Esportify+.

---

## Gestion des rôles

L’application utilise une logique de rôles afin de limiter l’accès aux fonctionnalités selon le profil connecté.

Rôles utilisés :

* player ;
* organizer ;
* admin.

Exemples :

* un joueur peut consulter les événements et les replays ;
* un organisateur peut gérer ses événements ;
* un administrateur peut superviser la plateforme.

Cette séparation permet de limiter l’accès aux fonctionnalités sensibles.

---

## Protection des accès

Certaines pages et fonctionnalités sont protégées selon le rôle de l’utilisateur.

Exemples :

* page administrateur réservée au rôle admin ;
* page organisateur réservée au rôle organizer ;
* gestion des événements réservée aux organisateurs ;
* actions d’administration réservées au rôle admin.

Cette approche permet d'appliquer un contrôle d'accès cohérent dans l'ensemble de l'application.

---

## Gestion des sessions

Le projet utilise un système de session côté client permettant de conserver les informations de connexion.

Les informations de session sont enregistrées dans le navigateur afin de gérer les accès selon le rôle de l’utilisateur connecté.

Les données stockées comprennent :

* identifiant utilisateur ;
* nom d’utilisateur ;
* rôle.

Aucun mot de passe n'est conservé dans les données de session.

---

## Validation des données avec Zod

Le backend utilise la bibliothèque Zod afin de valider les données reçues par l’API avant leur traitement.

Exemples :

* vérification du pseudo ;
* vérification du mot de passe ;
* contrôle du format des données ;
* validation des données de connexion.

Cette validation permet de limiter les erreurs et les données invalides envoyées au serveur.

---

## Protection des données sensibles

Le backend utilise le type SafeUser afin d’éviter l’exposition des informations sensibles.

Les réponses envoyées au frontend ne contiennent jamais le mot de passe de l’utilisateur.

Exemples de données renvoyées :

* identifiant utilisateur ;
* nom utilisateur ;
* rôle.

Cette approche permet de limiter les risques de fuite d’informations sensibles.

---

## Encapsulation avec UserEntity

Le projet utilise une entité UserEntity développée selon les principes de la programmation orientée objet.

Cette entité permet :

* d’encapsuler les données utilisateur ;
* de contrôler l’accès aux propriétés ;
* de centraliser certaines règles métier ;
* de générer une version sécurisée de l’utilisateur grâce à SafeUser.

Cette approche améliore la lisibilité, la maintenance et la sécurité du code.

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

Le backend utilise SQLite via la bibliothèque Better-SQLite3.

Les accès aux données reposent sur des requêtes préparées (Prepared Statements) permettant de séparer les données des instructions SQL.

Exemple :

```sql
SELECT * FROM users WHERE username = ?;
```

Cette approche permet de limiter les risques d’injection SQL.

---

## Sécurisation de SQLite

La configuration SQLite utilise plusieurs mécanismes complémentaires :

* activation des clés étrangères avec `PRAGMA foreign_keys = ON` ;
* mode WAL (Write-Ahead Logging) ;
* délai d’attente en cas de verrouillage de la base ;
* contraintes SQL (CHECK, UNIQUE, FOREIGN KEY).

Ces mécanismes améliorent la fiabilité, la cohérence et l’intégrité des données.

---

## Sécurisation du serveur Express

Plusieurs mesures de protection ont été mises en place dans le serveur Express :

* désactivation de l’en-tête `X-Powered-By` ;
* gestion centralisée des erreurs ;
* validation systématique des données ;
* contrôle des routes disponibles.

Ces mécanismes réduisent l’exposition d’informations techniques et améliorent la robustesse de l’API.

---

## Évolutions futures

Plusieurs améliorations de sécurité sont envisagées :

* authentification JWT ;
* chiffrement des mots de passe avec bcrypt ;
* variables d’environnement ;
* sécurisation avancée des sessions ;
* amélioration des contrôles d’accès ;
* système de logs de sécurité ;
* limitation du nombre de tentatives de connexion ;
* journalisation des actions administratives.

---

## Conclusion

La sécurité d’Esportify+ repose actuellement sur une gestion des rôles, une validation des données avec Zod, une architecture en couches, l’utilisation de SafeUser, l’encapsulation des données avec UserEntity, l’utilisation de requêtes préparées ainsi qu’une configuration sécurisée de SQLite et d’Express.

Ces mécanismes constituent une première base de sécurité cohérente avec les besoins actuels du projet et pourront être renforcés lors des futures évolutions de la plateforme.
