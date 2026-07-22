Architecture NoSQL - Esportify+

Présentation

En complément du modèle relationnel SQL utilisé dans Esportify+, une architecture NoSQL a été étudiée afin d'anticiper les futures évolutions de la plateforme.

Le projet repose actuellement sur une base de données SQLite intégrée à une API développée avec Express et TypeScript. Cette solution a été retenue afin de garantir une architecture stable, simple à maintenir et adaptée aux besoins actuels du projet.

Dans le cadre de la phase de conception, plusieurs solutions de stockage ont néanmoins été étudiées afin d'évaluer leurs avantages et leurs limites. Parmi les technologies analysées figurent notamment MongoDB ainsi que d'autres approches orientées documents utilisées dans les architectures modernes.

Après analyse, le choix a été fait de conserver une architecture SQL pour la version actuelle du projet. Cette décision permet de limiter la complexité technique, de réduire les risques d'instabilité et de se concentrer sur la mise en place d'un backend robuste reposant sur une structure de données maîtrisée.

L'architecture NoSQL présentée dans ce document constitue donc une étude d'évolution et non une technologie actuellement utilisée dans l'application.

Cette démarche démontre une réflexion sur différentes architectures de stockage ainsi qu'une volonté d'anticiper les futures évolutions de la plateforme.

Pourquoi étudier une architecture NoSQL ?

L'étude d'une solution NoSQL permet d'anticiper les futurs besoins de la plateforme.

Contrairement aux bases relationnelles, les bases orientées documents proposent une structure plus souple. Elles permettent notamment d'ajouter de nouvelles propriétés aux documents sans devoir modifier plusieurs tables ou relations.

Cette approche peut être adaptée aux plateformes web manipulant des événements, des utilisateurs, des statistiques ou des contenus dont la structure est amenée à évoluer.

Toutefois, cette souplesse ne constitue pas systématiquement un avantage. Le choix d'une base NoSQL doit rester lié aux besoins réels du projet, au volume de données, aux relations métier et aux contraintes de maintenance.

Architecture NoSQL envisagée

Dans une future version d'Esportify+, une base MongoDB pourrait être structurée autour de plusieurs collections correspondant aux principales données métier de la plateforme :

users : comptes des joueurs, organisateurs et administrateurs ;

events : compétitions, dates, jeux concernés, statuts et nombre maximal de participants ;

registrations : inscriptions des utilisateurs aux événements ;

replays : liens, titres, descriptions et métadonnées des rediffusions ;

statistics : résultats, classements et données de participation.

Les exemples suivants présentent une modélisation simplifiée des documents qui pourraient être utilisés.

Les identifiants employés sont volontairement simplifiés afin de faciliter la lecture. Dans une implémentation réelle avec MongoDB, ils pourraient être remplacés par des identifiants de type ObjectId.

Collection users

Exemple de document utilisateur :

{
  "_id": "665001",
  "username": "admin",
  "email": "admin@esportify.com",
  "role": "admin",
  "createdAt": "2026-05-01T10:00:00Z"
}

Cette collection permettrait de stocker les informations principales des utilisateurs de la plateforme.

Les rôles pourraient notamment être limités aux valeurs suivantes :

player ;

organizer ;

admin.

Collection events

Exemple de document événement :

{
  "_id": "665101",
  "title": "Valorant Night Clash",
  "game": "Valorant",
  "status": "live",
  "organizerId": "665002",
  "eventDate": "2026-05-15T20:00:00Z",
  "maxPlayers": 16
}

Cette collection regrouperait les compétitions et événements esport proposés sur la plateforme.

La référence organizerId permettrait d'associer chaque événement à son organisateur.

Collection registrations

Exemple de document inscription :

{
  "_id": "665201",
  "userId": "665003",
  "eventId": "665101",
  "status": "confirmed",
  "registeredAt": "2026-05-10T14:30:00Z"
}

Cette collection permettrait de suivre les inscriptions des participants aux événements.

Les références userId et eventId conserveraient une séparation claire entre les utilisateurs, les événements et les inscriptions.

Collection replays

Exemple de document replay :

{
  "_id": "665301",
  "title": "Nova Squad vs Red Pulse",
  "videoUrl": "https://replay.esportify/demo",
  "eventId": "665101",
  "createdAt": "2026-05-16T09:00:00Z"
}

Cette collection stockerait les replays disponibles sur la plateforme ainsi que leur association à un événement.

Collection statistics

Exemple de document statistique :

{
  "_id": "665401",
  "eventId": "665101",
  "participants": 16,
  "matchesPlayed": 15,
  "winner": "Nova Squad",
  "updatedAt": "2026-05-16T10:00:00Z"
}

Cette collection pourrait être utilisée dans une version future pour stocker des résultats, des classements et des statistiques détaillées.

Relations entre les collections

Même dans une architecture NoSQL, certaines données doivent rester liées.

Dans cette proposition :

un utilisateur peut créer plusieurs événements ;

un événement peut recevoir plusieurs inscriptions ;

une inscription relie un utilisateur à un événement ;

un replay est associé à un événement ;

des statistiques peuvent être associées à un événement terminé.

MongoDB permettrait d'utiliser des références entre documents, mais certaines informations fréquemment consultées pourraient également être intégrées directement dans un document afin de limiter le nombre de requêtes.

Le choix entre l'intégration et la référence dépendrait notamment de la fréquence des mises à jour, du volume de données et du besoin de réutiliser les informations dans plusieurs parties de l'application.

Avantages envisagés du NoSQL

L'utilisation d'une base orientée documents pourrait présenter plusieurs avantages dans une future version :

structure flexible des documents ;

ajout plus simple de nouvelles propriétés ;

stockage naturel des données JSON utilisées par l'API ;

adaptation facilitée à des statistiques ou contenus évolutifs ;

possibilité de regrouper certaines données fréquemment consultées ;

montée en charge envisageable si le volume de données augmentait fortement.

Ces avantages resteraient toutefois dépendants des besoins réels de la plateforme et de la qualité de la modélisation retenue.

Limites et points de vigilance

Bien que les solutions NoSQL comme MongoDB présentent plusieurs avantages, elles possèdent également des limites qui ont été prises en compte lors de cette étude.

Dans le cadre du projet Esportify+, plusieurs points ont conduit à privilégier une architecture SQL basée sur SQLite pour la version actuelle :

le volume de données du projet reste limité ;

les relations entre utilisateurs, événements, inscriptions et replays sont naturellement adaptées à un modèle relationnel ;

l'utilisation de MongoDB aurait nécessité une infrastructure supplémentaire ;

l'intégration de MongoDB et de Mongoose aurait augmenté le temps de développement ;

une structure trop souple peut entraîner des incohérences si les données ne sont pas correctement validées ;

la gestion des références entre documents peut devenir complexe si la modélisation n'est pas correctement définie ;

la priorité du projet était de disposer d'un backend stable, maintenable et cohérent avec les objectifs de l'évaluation.

Ces éléments ont conduit à privilégier une solution SQL plus simple à mettre en œuvre dans le contexte actuel, tout en conservant la possibilité d'une évolution future vers une architecture NoSQL si les besoins venaient à changer.

Évolution envisagée

L'architecture actuelle d'Esportify+ repose sur une API REST développée avec Express, TypeScript et SQLite.

Dans une future version, MongoDB pourrait être envisagé afin d'accompagner une augmentation importante du volume de données ou l'ajout de fonctionnalités nécessitant une structure plus évolutive.

Une telle évolution pourrait notamment concerner :

la gestion de statistiques détaillées de matchs ;

l'historisation des actions administratives ;

le stockage de contenus communautaires ;

l'ajout de métadonnées variables selon les jeux ;

la conservation de journaux techniques ou d'activités ;

l'évolution rapide des documents liés aux compétitions.

L'utilisation de Mongoose pourrait également être étudiée afin de définir des schémas, de valider les données et de faciliter la manipulation des documents depuis l'API TypeScript.

Une éventuelle migration devrait néanmoins être préparée avec soin. Elle nécessiterait notamment :

une analyse des données existantes ;

une stratégie de migration ;

des règles de validation ;

des tests de cohérence ;

une adaptation des services et des contrôleurs de l'API ;

une mise à jour de la documentation technique.

Le passage à une base NoSQL ne serait donc envisagé que si les besoins futurs justifiaient réellement cette complexité supplémentaire.

Conclusion

Cette étude NoSQL complète la réflexion menée autour de l'architecture des données d'Esportify+.

Bien que le projet repose actuellement sur une architecture SQL, l'utilisation future d'une solution orientée documents comme MongoDB constitue une possibilité d'évolution.

Le choix de ne pas implémenter immédiatement une solution NoSQL ne résulte pas d'un manque d'intérêt pour cette technologie. Il s'agit d'une décision technique visant à privilégier la stabilité, la maîtrise de l'architecture et la cohérence avec le périmètre actuel du projet.

SQLite reste donc le choix volontaire pour la version actuelle d'Esportify+. MongoDB ne serait étudié plus en profondeur que si l'évolution du volume de données, des statistiques ou des fonctionnalités rendait cette migration réellement pertinente.