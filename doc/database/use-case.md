Diagramme de cas d'utilisation - Esportify+
Description

Ce document présente les principaux cas d'utilisation du projet Esportify+.

Il permet d'identifier les différents acteurs de la plateforme ainsi que les fonctionnalités auxquelles ils peuvent accéder.

Acteurs

Le projet distingue plusieurs types d'acteurs :

visiteur ;
joueur connecté ;
organisateur ;
administrateur.
Diagramme Mermaid
flowchart LR
  Visiteur[Visiteur]
  Joueur[Joueur connecté]
  Organisateur[Organisateur]
  Administrateur[Administrateur]

  UC1((Consulter la page d'accueil))
  UC2((Consulter les événements))
  UC3((Consulter les replays))
  UC4((Se connecter))
  UC5((Gérer sa session))
  UC6((S'inscrire à un événement))
  UC7((Accéder à l'espace organisateur))
  UC8((Créer un événement))
  UC9((Gérer les inscriptions))
  UC10((Accéder à l'espace administrateur))
  UC11((Valider ou refuser une demande))
  UC12((Superviser la plateforme))

  Visiteur --> UC1
  Visiteur --> UC2
  Visiteur --> UC3
  Visiteur --> UC4

  Joueur --> UC2
  Joueur --> UC3
  Joueur --> UC5
  Joueur --> UC6

  Organisateur --> UC7
  Organisateur --> UC8
  Organisateur --> UC9

  Administrateur --> UC10
  Administrateur --> UC11
  Administrateur --> UC12
Détail des cas d'utilisation
Visiteur

Un visiteur peut :

consulter la page d'accueil ;
consulter les événements disponibles ;
consulter les replays ;
accéder à la page de connexion.
Joueur connecté

Un joueur connecté peut :

consulter les événements ;
consulter les replays ;
gérer sa session ;
s'inscrire à un événement.
Organisateur

Un organisateur peut :

accéder à son espace organisateur ;
créer un événement ;
gérer les inscriptions liées à ses événements.
Administrateur

Un administrateur peut :

accéder à l'espace administrateur ;
valider ou refuser des demandes ;
superviser la plateforme ;
gérer les utilisateurs ;
contrôler le fonctionnement général de la plateforme.
Règles d'accès

Les accès sont limités selon le rôle de l'utilisateur.

un visiteur accède uniquement aux pages publiques ;
un joueur connecté accède aux fonctionnalités liées aux événements et aux inscriptions ;
un organisateur accède à l'espace organisateur et à la gestion des événements ;
un administrateur accède à l'ensemble des fonctionnalités de supervision et d'administration.
Lien avec le backend

Les droits d'accès sont gérés à l'aide des rôles définis dans l'application :

player ;
organizer ;
admin.

Ces rôles sont utilisés dans :

le backend Express ;
les services métier ;
les données utilisateur ;
la gestion de session côté client.

Cette organisation permet d'assurer une cohérence entre l'interface utilisateur et les règles appliquées par l'application.

Objectif du diagramme

Ce diagramme permet de visualiser les interactions principales entre les acteurs et les fonctionnalités du projet.

Il sert à clarifier les responsabilités de chaque rôle, à préparer l'évolution du backend et à compléter la logique de gestion des rôles utilisée dans l'application.

Il constitue également un support de conception facilitant la maintenance et les futures évolutions du projet.