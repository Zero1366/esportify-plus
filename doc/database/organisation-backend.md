# Programmation orientée objet - Esportify+

## Objectif

Ce document présente l'utilisation de la programmation orientée objet (POO) dans le backend d'Esportify+ ainsi que l'organisation de l'architecture mise en place afin de faciliter la maintenance, l'évolution et la compréhension du projet.

---

## Présentation de la POO

La programmation orientée objet est une approche de développement permettant de représenter les données sous forme d'objets regroupant à la fois des informations et des comportements.

Cette approche permet :

* d'améliorer l'organisation du code ;
* de limiter l'accès direct aux données sensibles ;
* de favoriser la réutilisation du code ;
* de faciliter la maintenance ;
* de rendre l'application plus évolutive.

---

## Utilisation dans Esportify+

Le projet utilise la programmation orientée objet à travers l'entité métier :

* UserEntity.

Cette entité représente un utilisateur de la plateforme et permet de centraliser certaines règles métier liées aux utilisateurs.

Fichier concerné :

```txt
backend/src/entities/user.entity.ts
```

---

## Classe UserEntity

La classe UserEntity encapsule les informations d'un utilisateur.

Elle contient :

* l'identifiant ;
* le nom d'utilisateur ;
* le mot de passe ;
* le rôle.

Les propriétés sont déclarées privées afin d'empêcher leur modification directe depuis l'extérieur de la classe.

Exemple :

```txt
UserEntity
├── id
├── username
├── password
└── role
```

---

## Encapsulation

L'encapsulation consiste à protéger les données internes d'un objet.

Dans Esportify+, les propriétés utilisateur sont déclarées avec le mot-clé :

```ts
private readonly
```

Cela permet :

* d'éviter les modifications accidentelles ;
* de contrôler l'accès aux données ;
* d'améliorer la sécurité du code.

Exemple :

```ts
private readonly id: number;
private readonly username: string;
private readonly password: string;
private readonly role: UserRole;
```

---

## Méthodes métier

La classe UserEntity expose plusieurs méthodes permettant d'interagir avec l'utilisateur.

Exemples :

* getId() ;
* getUsername() ;
* getRole() ;
* isPasswordValid() ;
* toSafeUser().

Ces méthodes permettent de manipuler les données sans exposer directement les propriétés internes.

---

## Vérification du mot de passe

La méthode :

```ts
isPasswordValid()
```

permet de centraliser la logique de vérification du mot de passe.

Exemple :

```txt
Utilisateur
        │
        ▼
UserEntity
        │
        ▼
isPasswordValid()
        │
        ▼
Résultat vrai ou faux
```

Cette approche évite de disperser la logique métier dans plusieurs fichiers.

---

## Protection des données avec SafeUser

Le projet utilise également le type :

```ts
SafeUser
```

afin de supprimer les informations sensibles avant leur envoi au frontend.

La méthode :

```ts
toSafeUser()
```

retourne uniquement :

* id ;
* username ;
* role.

Le mot de passe n'est jamais transmis au client.

Cette approche améliore la sécurité des échanges entre le backend et le frontend.

---

## Architecture en couches

Le backend repose sur une architecture en couches permettant de séparer clairement les responsabilités.

```txt
Front-end
    │
    ▼
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
```

Cette organisation permet d'éviter le mélange entre :

* l'interface utilisateur ;
* la logique métier ;
* l'accès aux données ;
* les objets métier.

---

## Exemple de flux

1. Le front-end envoie une demande de connexion.
2. La route reçoit la requête.
3. Les données sont validées avec Zod.
4. Le service applique les règles métier.
5. Le repository interroge SQLite.
6. Les données sont converties en UserEntity.
7. UserEntity vérifie les informations.
8. Un SafeUser est généré.
9. La réponse est renvoyée au frontend.

---

## Avantages

Cette architecture permet :

* une meilleure organisation du code ;
* une maintenance simplifiée ;
* une meilleure sécurité ;
* une réutilisation facilitée ;
* une séparation claire des responsabilités ;
* une utilisation des principes de la programmation orientée objet ;
* une évolution plus simple du backend.

---

## Conclusion

Le backend d'Esportify+ repose sur une combinaison entre une architecture en couches et l'utilisation de la programmation orientée objet.

L'entité UserEntity permet d'encapsuler les données utilisateur, de centraliser certaines règles métier et de sécuriser les informations retournées au frontend grâce au type SafeUser.

Cette organisation rapproche le projet d'une architecture professionnelle tout en conservant une structure claire, maintenable et évolutive.
