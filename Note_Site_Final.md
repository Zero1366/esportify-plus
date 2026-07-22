Site final — Esportify+

Présentation

Ce dossier regroupe les captures finales de l’application Esportify+.

Il constitue une preuve visuelle du résultat obtenu et permet de présenter rapidement l’interface, la navigation, les différents espaces utilisateurs ainsi que l’adaptation responsive du projet.

Ces captures complètent la documentation technique, les diagrammes, les extraits de code et les preuves de fonctionnement préparés pour l’ECF.

Emplacement du répertoire

Les captures sont organisées dans le dossier suivant :

doc/
└── site-final/
    ├── Desktop/
    └── Mobile/

Le dossier Desktop contient les captures réalisées dans un format d’écran d’ordinateur.

Le dossier Mobile contient les captures réalisées dans un format de smartphone.

Objectifs du dossier

Ce dossier permet de démontrer :

le rendu visuel final de l’application ;

la cohérence graphique entre les pages ;

la navigation principale ;

l’adaptation responsive ;

la présence des différents rôles ;

la correspondance entre le code développé et le résultat affiché ;

la qualité générale de présentation du projet.

Formats utilisés

Deux formats principaux ont été retenus :

Desktop : 1366 × 768 pixels ;

Mobile : 360 × 800 pixels.

Ces dimensions permettent de vérifier l’affichage de l’application sur deux contextes d’utilisation différents.

Les captures Desktop montrent principalement :

la structure générale des pages ;

l’organisation des contenus ;

la navigation horizontale ;

les cartes, tableaux et formulaires ;

l’utilisation de l’espace disponible.

Les captures Mobile montrent principalement :

l’adaptation des blocs ;

la lisibilité des contenus ;

l’organisation verticale ;

l’accessibilité des boutons ;

le comportement responsive de l’interface.

Pages représentées

Les pages principales de l’application sont présentées dans les versions Desktop et Mobile :

Accueil ;

Événements ;

Replay ;

Connexion ;

Organisateur ;

Administrateur ;

Contact.

Description des pages

Accueil

La page d’accueil présente l’identité visuelle d’Esportify+ et les principaux accès à l’application.

Elle permet de vérifier :

la navigation générale ;

la hiérarchie visuelle ;

la présentation des contenus ;

l’adaptation responsive.

Événements

La page Événements permet de consulter les compétitions et activités disponibles.

Elle présente notamment :

les filtres ;

la recherche ;

les statuts ;

la liste dynamique des événements ;

le compteur de résultats.

Replay

La page Replay présente un match e-sport simulé.

Elle permet de visualiser :

les équipes ;

le score ;

les commandes de lecture ;

les actions du match ;

les changements d’état gérés en TypeScript.

Connexion

La page Connexion permet d’utiliser des comptes de démonstration.

Elle présente les rôles suivants :

player
organizer
admin

Ces rôles correspondent respectivement à :

utilisateur ;

organisateur ;

administrateur.

Organisateur

L’espace Organisateur permet de :

consulter un résumé des activités ;

suivre les événements disponibles ;

proposer une nouvelle activité ;

renseigner un jeu, une date, un format et un nombre de joueurs.

Administrateur

L’espace Administrateur permet de :

consulter les demandes ;

suivre les signalements ;

superviser les joueurs ;

visualiser les actions traitées ;

accéder à un panneau de supervision du live.

Contact

La page Contact contient un formulaire de démonstration.

Elle permet de saisir :

un nom ;

une adresse e-mail ;

un sujet ;

un message.

Convention de nommage recommandée

Les captures peuvent être nommées selon une convention uniforme.

Desktop

DESKTOP-01-Accueil.png
DESKTOP-02-Evenements.png
DESKTOP-03-Replay.png
DESKTOP-04-Connexion.png
DESKTOP-05-Organisateur.png
DESKTOP-06-Administrateur.png
DESKTOP-07-Contact.png

Mobile

MOBILE-01-Accueil.png
MOBILE-02-Evenements.png
MOBILE-03-Replay.png
MOBILE-04-Connexion.png
MOBILE-05-Organisateur.png
MOBILE-06-Administrateur.png
MOBILE-07-Contact.png

Des captures supplémentaires peuvent être ajoutées lorsque cela permet de montrer un état particulier :

DESKTOP-08-Evenements-Filtres.png
DESKTOP-09-Replay-En-Cours.png
DESKTOP-10-Organisateur-Formulaire.png
DESKTOP-11-Administrateur-Supervision.png
MOBILE-08-Navigation.png
MOBILE-09-Connexion-Role.png

Critères de qualité des captures

Chaque capture doit respecter les règles suivantes :

affichage net ;

texte lisible ;

cadrage propre ;

absence d’élément coupé ;

absence de fenêtre inutile ;

résolution suffisante ;

nom de fichier explicite ;

correspondance avec l’état final du projet ;

absence d’information sensible.

Les captures doivent représenter le projet dans un état cohérent et fonctionnel.

Sécurité et confidentialité

Aucune capture ne doit afficher :

de mot de passe personnel ;

de jeton privé ;

de clé secrète ;

de variable d’environnement sensible ;

de chemin contenant une information personnelle inutile ;

d’identifiant privé ;

de donnée réelle appartenant à un utilisateur.

Les identifiants visibles dans l’application sont uniquement des comptes de démonstration :

admin / admin123
organizer / orga123
player / player123

Ils ne correspondent pas à des comptes de production.

Lien avec les compétences démontrées

Les captures de ce dossier complètent les autres preuves du projet.

Pour chaque fonctionnalité importante, le dossier projet doit idéalement présenter trois éléments :

une capture du code ;

une explication du fonctionnement ;

une capture du résultat final.

Exemple pour la page Replay :

Code TypeScript du replay
        ↓
Explication de la logique
        ↓
Capture du replay en fonctionnement

Exemple pour la gestion des rôles :

Code de session et de protection
        ↓
Explication des rôles
        ↓
Captures des espaces Organisateur et Administrateur

Exemple pour les événements :

Code HTML et TypeScript
        ↓
Explication des filtres et du rendu
        ↓
Capture de la page Événements

Vérification avant validation

Avant de considérer le dossier comme définitif, vérifier que :

toutes les pages principales sont présentes ;

chaque page existe en version Desktop ;

chaque page importante existe en version Mobile ;

les noms des fichiers sont cohérents ;

les anciennes captures obsolètes ont été remplacées ;

les doublons inutiles ont été supprimés ;

les captures correspondent au code final ;

les rôles sont correctement représentés ;

aucune information sensible n’est visible ;

l’ordre des captures facilite la lecture du dossier.

Limites de la version présentée

Esportify+ reste une application de démonstration.

Les captures présentent l’interface de référence du projet, mais ne signifient pas que l’ensemble du système full-stack est hébergé en production.

Dans la version actuelle :

le frontend peut être publié sur Netlify ;

le backend Express est exécuté localement ou avec Docker ;

la base SQLite est utilisée par le backend ;

le replay reste simulé ;

l’authentification reste adaptée à un contexte de démonstration.

Ces limites sont assumées afin de conserver un projet clair, stable, documenté et présentable.

Conclusion

Le dossier doc/site-final/ présente le résultat visuel de référence d’Esportify+.

Il permet de vérifier :

l’apparence générale de l’application ;

la cohérence entre les pages ;

l’adaptation Desktop et Mobile ;

la présence des différents rôles ;

le fonctionnement des principales interfaces ;

la correspondance entre la documentation, le code et le rendu final.

Ces captures constituent une partie importante des preuves du projet et permettent au jury de comprendre rapidement le résultat obtenu.