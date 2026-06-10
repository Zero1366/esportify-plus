# Programmation orientée objet - Esportify+

## Objectif

Ce document présente l'utilisation de la programmation orientée objet dans le backend d'Esportify+.

L'objectif est d'expliquer comment certaines données métier sont représentées sous forme d'entités afin d'améliorer l'organisation, la sécurité et la maintenabilité du code.

---

## Définition

La programmation orientée objet consiste à représenter les éléments importants d'une application sous forme d'objets.

Un objet peut contenir :

* des données ;
* des propriétés ;
* des méthodes ;
* des règles métier.

Dans Esportify+, cette approche est utilisée pour représenter un utilisateur de la plateforme.

---

## Entité utilisée

Le backend contient une entité métier nommée :

```txt
UserEntity
```

Cette entité est définie dans le fichier :

```txt
backend/src/entities/user.entity.ts
```

Elle représente un utilisateur connecté ou récupéré depuis les données du backend.

---

## Rôle de UserEntity

La classe UserEntity permet de regrouper les informations liées à un utilisateur.

Elle contient notamment :

* l'identifiant utilisateur ;
* le nom d'utilisateur ;
* le mot de passe ;
* le rôle.

Cette organisation permet de centraliser les traitements liés à l'utilisateur dans une seule classe.

---

## Encapsulation

L'encapsulation consiste à protéger les données internes d'un objet afin d'éviter qu'elles soient modifiées directement depuis l'extérieur.

Dans UserEntity, les propriétés sont déclarées avec :

```ts
private readonly
```

Exemple :

```ts
private readonly id: number;
private readonly username: string;
private readonly password: string;
private readonly role: UserRole;
```

Cela permet :

* d'éviter les modifications accidentelles ;
* de contrôler l'accès aux données ;
* de rendre le code plus sécurisé ;
* de rendre l'entité plus stable.

---

## Accès contrôlé aux données

La classe UserEntity expose uniquement les méthodes nécessaires pour accéder à certaines données.

Exemples :

```ts
getId()
getUsername()
getRole()
```

Ces méthodes permettent d'accéder aux informations utiles sans exposer directement les propriétés internes de l'objet.

---

## Méthode métier : vérification du mot de passe

La méthode :

```ts
isPasswordValid()
```

permet de vérifier si le mot de passe fourni correspond au mot de passe de l'utilisateur.

Cette logique est placée dans l'entité afin d'éviter de disperser ce traitement dans plusieurs fichiers du backend.

Exemple de flux :

```txt
Mot de passe reçu
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

---

## Protection des données sensibles

Le backend utilise le type :

```ts
SafeUser
```

afin de représenter un utilisateur sans mot de passe.

La méthode :

```ts
toSafeUser()
```

retourne uniquement :

* id ;
* username ;
* role.

Le mot de passe n'est jamais renvoyé au frontend.

Cette approche permet de limiter l'exposition des données sensibles dans les réponses API.

---

## Utilisation dans le repository

L'entité UserEntity est utilisée dans le repository utilisateur.

Le repository récupère les données utilisateur puis les transforme en UserEntity afin d'appliquer les règles nécessaires.

Exemple de traitement :

```txt
UserRepository
      │
      ▼
Données utilisateur
      │
      ▼
UserEntity
      │
      ▼
Vérification du mot de passe
      │
      ▼
SafeUser
```

Cette organisation permet de séparer l'accès aux données et les règles liées à l'utilisateur.

---

## Lien avec l'architecture backend

La programmation orientée objet complète l'architecture en couches du backend.

```txt
Route
  │
  ▼
Service
  │
  ▼
Repository
  │
  ▼
Entity
  │
  ▼
Données
```

La route reçoit la requête, le service applique la logique métier, le repository récupère les données, et l'entité représente l'objet métier manipulé.

---

## Lien avec le diagramme de classes

Le diagramme de classes du projet présente plusieurs entités métier :

* User ;
* Role ;
* Event ;
* Tournament ;
* Replay ;
* Registration ;
* Message.

Dans l'implémentation actuelle, UserEntity constitue la première entité réellement implémentée sous forme de classe TypeScript.

Les autres entités sont modélisées dans la documentation et pourront être implémentées progressivement lors des futures évolutions du backend.

---

## Limites actuelles

La POO est utilisée de manière légère et ciblée.

Actuellement, seule l'entité UserEntity est réellement implémentée sous forme de classe.

Les autres objets métier sont présents dans :

* le MCD ;
* le diagramme de classes ;
* les règles métier ;
* le schéma SQL.

Cette approche permet de garder un backend simple tout en introduisant progressivement les principes de la programmation orientée objet.

---

## Évolutions futures

Lors des futures évolutions du projet, d'autres entités pourront être implémentées sous forme de classes :

* EventEntity ;
* ReplayEntity ;
* RegistrationEntity ;
* MessageEntity ;
* TournamentEntity.

Ces évolutions permettraient de renforcer la logique métier et de mieux structurer les comportements propres à chaque objet.

---

## Conclusion

Le projet Esportify+ utilise une programmation orientée objet légère à travers l'entité UserEntity.

Cette entité permet d'encapsuler les données utilisateur, de contrôler l'accès aux informations sensibles, de vérifier le mot de passe et de générer un SafeUser sans exposer le mot de passe au frontend.

Cette approche améliore la sécurité, la lisibilité et la maintenabilité du backend tout en préparant les futures évolutions de l'application.
