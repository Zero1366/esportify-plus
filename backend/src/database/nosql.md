# Architecture NoSQL - Esportify+

## Présentation

En complément du modèle relationnel SQL utilisé dans Esportify+, une architecture NoSQL a été étudiée afin d'anticiper les futures évolutions de la plateforme.

Une base NoSQL comme MongoDB permet de stocker les données sous forme de documents JSON plutôt que sous forme de tables relationnelles.

Cette approche est particulièrement adaptée aux applications web modernes nécessitant une forte flexibilité des données.

---

## Pourquoi une architecture NoSQL ?

L'étude d'une solution NoSQL permet d'anticiper les futurs besoins de la plateforme.

Contrairement aux bases relationnelles, les bases NoSQL offrent une structure plus souple permettant de faire évoluer rapidement les données sans modifier de nombreuses relations entre tables.

Cette approche est particulièrement adaptée aux plateformes web manipulant des événements, des utilisateurs, des statistiques ou des contenus évolutifs.

---

## Collection users

Exemple de document utilisateur :

```json
{
  "_id": "665001",
  "username": "admin",
  "email": "admin@esportify.com",
  "role": "admin",
  "createdAt": "2026-05-01T10:00:00Z"
}
```

Cette collection permet de stocker les informations des utilisateurs de la plateforme.

---

## Collection events

Exemple de document événement :

```json
{
  "_id": "665101",
  "title": "Valorant Night Clash",
  "game": "Valorant",
  "status": "live",
  "organizer": "Organizer",
  "eventDate": "2026-05-15T20:00:00Z"
}
```

Cette collection regroupe les compétitions et événements esport.

---

## Collection registrations

Exemple de document inscription :

```json
{
  "_id": "665201",
  "userId": "665003",
  "eventId": "665101",
  "status": "confirmed"
}
```

Cette collection permet de suivre les inscriptions des participants aux événements.

---

## Collection replays

Exemple de document replay :

```json
{
  "_id": "665301",
  "title": "Nova Squad vs Red Pulse",
  "videoUrl": "https://replay.esportify/demo",
  "eventId": "665101"
}
```

Cette collection stocke les replays disponibles sur la plateforme.

---

## Avantages du NoSQL

L'utilisation d'une base NoSQL présente plusieurs avantages :

* structure flexible des documents ;
* évolution rapide du schéma de données ;
* bonnes performances sur de grands volumes ;
* stockage naturel des données JSON utilisées par les API modernes ;
* adaptation facilitée aux évolutions fonctionnelles du projet.

---

## Évolution envisagée

Dans le cadre des futures évolutions d'Esportify+, l'utilisation d'une base de données NoSQL telle que MongoDB est envisagée.

Cette solution pourrait permettre de faciliter la gestion de certaines données évolutives tout en offrant une plus grande flexibilité dans la structure des documents.

L'utilisation de la bibliothèque Mongoose pourrait également être étudiée afin de simplifier la modélisation des données et les échanges avec la base.

Cette piste d'évolution complète la réflexion menée autour de l'architecture des données sans remettre en cause l'utilisation actuelle du modèle relationnel SQL.

---

## Conclusion

Cette étude NoSQL complète la réflexion menée autour de l'architecture des données d'Esportify+.

Bien que le projet repose actuellement sur une architecture SQL, l'utilisation future d'une solution NoSQL comme MongoDB constitue une évolution envisagée afin d'accompagner les besoins futurs de la plateforme.

Cette réflexion démontre la prise en compte de différentes architectures de stockage dans la conception globale du projet.
