# Architecture NoSQL - Esportify+

## Présentation

En complément du modèle relationnel SQL utilisé dans Esportify+, une architecture NoSQL a été étudiée afin d'anticiper les futures évolutions de la plateforme.

Le projet repose actuellement sur une base de données SQLite intégrée à une API développée avec Express et TypeScript. Cette solution a été retenue afin de garantir une architecture stable, simple à maintenir et parfaitement adaptée aux besoins actuels du projet.

Dans le cadre de la phase de conception, plusieurs solutions de stockage ont néanmoins été étudiées afin d'évaluer leurs avantages et leurs limites. Parmi les technologies analysées figurent notamment MongoDB ainsi que d'autres approches orientées documents utilisées dans les architectures modernes.

Après analyse, le choix a été fait de conserver une architecture SQL pour la version actuelle du projet. Cette décision permet de limiter la complexité technique, de réduire les risques d'instabilité et de se concentrer sur la mise en place d'un backend robuste reposant sur une structure de données maîtrisée.

L'architecture NoSQL présentée dans ce document constitue donc une étude d'évolution et non une technologie actuellement utilisée dans l'application.

Cette démarche démontre une réflexion sur différentes architectures de stockage ainsi qu'une volonté d'anticiper les futures évolutions de la plateforme.

---

## Pourquoi une architecture NoSQL ?

L'étude d'une solution NoSQL permet d'anticiper les futurs besoins de la plateforme.

Contrairement aux bases relationnelles, les bases NoSQL offrent une structure plus souple permettant de faire évoluer rapidement les données sans modifier de nombreuses relations entre tables.

Cette approche est particulièrement adaptée aux plateformes web manipulant des événements, des utilisateurs, des statistiques ou des contenus évolutifs.

---

## Limites et points de vigilance

Bien que les solutions NoSQL comme MongoDB présentent de nombreux avantages, elles possèdent également certaines limites qui ont été prises en compte lors de l'étude de cette architecture.

Dans le cadre du projet Esportify+, plusieurs points ont conduit à privilégier une architecture SQL basée sur SQLite pour la version actuelle :

* le volume de données du projet reste relativement limité ;
* les relations entre utilisateurs, événements, inscriptions et replays sont naturellement adaptées à un modèle relationnel ;
* l'utilisation de MongoDB aurait nécessité la mise en place d'une infrastructure supplémentaire et une complexité technique plus importante ;
* l'apprentissage et la maîtrise complète de l'écosystème MongoDB et Mongoose auraient demandé un temps de développement supplémentaire ;
* l'absence de schéma strict peut offrir davantage de flexibilité mais peut également entraîner des incohérences si les données ne sont pas correctement validées ;
* la priorité du projet était de disposer d'un backend stable, maintenable et cohérent avec les objectifs de l'évaluation.

Ces éléments ont conduit à privilégier une solution SQL plus simple à mettre en œuvre dans le contexte actuel du projet tout en conservant la possibilité d'une évolution future vers une architecture NoSQL si les besoins venaient à évoluer.

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

L'architecture actuelle d'Esportify+ repose sur une API REST développée avec Express, TypeScript et SQLite.

Dans le cadre d'une évolution future du projet, plusieurs solutions NoSQL pourraient être étudiées, notamment MongoDB, afin d'accompagner l'augmentation du volume de données et l'ajout de nouvelles fonctionnalités.

Une telle évolution permettrait notamment :

* le stockage simplifié des événements et compétitions ;
* la gestion de statistiques détaillées de matchs ;
* l'historisation des actions administratives ;
* l'ajout de nouvelles données sans modification importante du schéma ;
* une meilleure adaptation aux échanges JSON utilisés par les API modernes.

L'utilisation de bibliothèques comme Mongoose pourrait également être envisagée afin de simplifier la validation et la manipulation des documents.

Toutefois, afin de préserver la stabilité du projet et de garantir une architecture parfaitement maîtrisée durant la phase de développement, il a été choisi de ne pas implémenter ces solutions dans la version actuelle.

Cette réflexion constitue une étude technique permettant d'identifier les évolutions possibles du projet tout en conservant aujourd'hui une architecture SQL adaptée aux besoins réels de la plateforme.

Par ailleurs, la réflexion autour de l'architecture des données reste en cours. D'autres solutions de stockage et architectures backend continuent d'être étudiées afin d'identifier les technologies les plus adaptées aux évolutions futures de la plateforme.

Cette démarche de veille technologique permet de comparer les avantages, les contraintes et les cas d'utilisation de différentes approches avant toute éventuelle migration technique. L'objectif est de conserver une architecture cohérente, stable et adaptée aux besoins réels du projet tout en restant ouvert aux évolutions technologiques.

---

## Conclusion

Cette étude NoSQL complète la réflexion menée autour de l'architecture des données d'Esportify+.

Bien que le projet repose actuellement sur une architecture SQL, l'utilisation future d'une solution NoSQL comme MongoDB constitue une évolution envisagée afin d'accompagner les besoins futurs de la plateforme.

Cette réflexion démontre également une démarche de veille technologique et une étude comparative des différentes solutions de stockage envisageables pour le projet.

Le choix de ne pas implémenter immédiatement une solution NoSQL ne résulte donc pas d'un manque d'intérêt pour cette technologie, mais d'une décision technique visant à privilégier la stabilité, la maîtrise de l'architecture et la cohérence avec les besoins actuels du projet.

Elle montre enfin que le choix de SQLite pour la version actuelle est volontaire : l'objectif est de conserver une solution stable, maîtrisée et cohérente avec le périmètre actuel du projet.
