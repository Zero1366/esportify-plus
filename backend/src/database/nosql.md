# Architecture NoSQL - Esportify+

## Présentation

En complément du modèle relationnel SQL utilisé dans Esportify+, une architecture NoSQL a été étudiée afin d'anticiper l'évolution future de la plateforme.

Une base NoSQL comme MongoDB permet de stocker les données sous forme de documents JSON plutôt que sous forme de tables relationnelles.

Cette approche est particulièrement adaptée aux applications web modernes nécessitant une forte flexibilité des données.

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
* stockage naturel des données JSON utilisées par les API modernes.

---

## Évolution future

Dans une future version d'Esportify+, l'intégration de MongoDB et de Mongoose pourrait permettre de remplacer certaines structures de stockage actuelles afin d'améliorer la scalabilité et la flexibilité de l'application.

Cette étude démontre la prise en compte d'une architecture NoSQL dans la conception globale du projet.
