Informations générales sur les annexes

Objectif du document

Ce document présente l’organisation générale des annexes associées aux projets Frostia Games et Esportify+.

Les annexes complètent le dossier projet principal. Elles permettent de conserver et de consulter les preuves détaillées sans surcharger les pages du dossier remis au jury.

Elles regroupent notamment :

les diagrammes ;

les maquettes et les captures d’interface ;

les extraits de code ;

les preuves liées aux bases de données ;

les documents d’architecture ;

les tests ;

les preuves Git et GitHub ;

les éléments de déploiement ;

les documents techniques complémentaires.

Organisation générale

Les preuves sont séparées en deux parties principales :

Annexe/
├── FrostiaGames/
├── Esportify+/
└── Sauvegarde Annexe/

Cette séparation permet d’éviter de mélanger les fichiers des deux projets.

Chaque projet conserve sa propre organisation, ses propres technologies, ses propres captures et ses propres preuves.

La réunion des deux projets dans un même ensemble d’annexes concerne uniquement la présentation du travail réalisé pendant la formation. Elle ne correspond pas à une fusion du code ou des dépôts GitHub.

Partie Frostia Games

Le dossier FrostiaGames contient les preuves liées au projet développé avec Python et Django.

Il regroupe notamment :

les diagrammes ;

les maquettes ;

les preuves responsive ;

l’administration Django ;

les éléments d’architecture ;

les données et les scripts SQL ;

les tests ;

les preuves Git ;

les preuves de déploiement avec Render.

Organisation générale :

FrostiaGames/
├── A0_Diagrammes/
├── A1_Maquettes_Responsive/
├── A2_Django_Administration/
├── A3_Architecture_Donnees/
└── A4_Tests_Git_Deploiement/

Cette partie permet de retrouver rapidement les éléments associés à Frostia Games sans les mélanger avec ceux d’Esportify+.

Partie Esportify+

Le dossier Esportify+ contient les preuves liées au projet développé avec Vite, TypeScript, SCSS, Express et SQLite.

Il regroupe notamment :

les diagrammes ;

les documents de conception ;

les interfaces desktop, tablette et mobile ;

les preuves liées au MCD et à SQL ;

l’architecture du backend ;

la sécurité ;

les tests ;

les captures Carbon ;

Git et GitHub ;

Docker ;

Netlify ;

les documents techniques complémentaires.

Organisation générale :

Esportify+/
├── A0_Diagram_Esportify/
├── A5_Conception_Modelisation/
├── A6_Frontend_Responsive/
├── A7_MCD_SQL_Donnees/
├── A8_Backend_Securite_Tests/
└── PREUVES COMPLEMENTAIRES/

Le dossier PREUVES COMPLEMENTAIRES contient les ensembles de preuves plus détaillés qui ne doivent pas surcharger les catégories principales.

Il peut notamment contenir :

PREUVES COMPLEMENTAIRES/
├── Architecture_complete/
├── Business_Rules_Complete/
├── Class_Diagram/
├── Deploiement/
├── Git_Workflow/
└── Carbon/

Ces dossiers conservent des documents complets ou des séries de captures qui permettent d’approfondir les éléments présentés dans le dossier principal.

Organisation des preuves

Les preuves ont été classées selon leur fonction principale.

Une même capture peut parfois contenir plusieurs sujets, par exemple :

frontend et backend ;

SQLite et NoSQL ;

Docker et déploiement ;

architecture et sécurité.

Dans ce cas, elle est placée dans la catégorie la plus représentative de son contenu.

L’objectif n’est pas de multiplier les copies, mais de permettre une consultation simple et logique.

Fichiers conservant leur nom d’origine

Certains fichiers ne suivent pas encore une nomenclature parfaitement uniforme.

Ils peuvent conserver :

un ancien numéro ;

un nom d’export automatique ;

un titre utilisé pendant le développement ;

un nom provenant de Carbon, Figma, Mermaid ou d’une capture d’écran ;

une appellation créée avant la réorganisation finale des annexes.

Ce choix est volontaire dans plusieurs cas.

Le renommage complet de tous les fichiers pourrait :

casser certains liens relatifs dans les documents Markdown ;

rendre plus difficile la comparaison avec les anciennes versions ;

supprimer une partie de la traçabilité du travail ;

créer des doublons ;

compliquer inutilement la vérification des preuves.

Les fichiers non renommés restent donc utilisables et consultables.

Leur contenu et leur emplacement permettent d’identifier clairement leur rôle, même lorsque leur nom n’est pas encore totalement harmonisé.

Cette situation n’empêche pas la compréhension générale des annexes.

Fichiers sources et copies de preuves

Les fichiers sources nécessaires au fonctionnement des projets restent dans leurs répertoires techniques.

Les annexes contiennent principalement :

des copies de consultation ;

des captures ;

des exports ;

des diagrammes ;

des documents explicatifs ;

des preuves destinées au jury.

Cette séparation permet de conserver :

Projet source
└── fichiers nécessaires au fonctionnement et au développement

Annexes
└── preuves organisées pour la consultation et l’évaluation

Les annexes ne remplacent donc pas les dépôts GitHub. Elles servent à rendre les éléments importants plus faciles à retrouver.

Sauvegarde des annexes

Le dossier Sauvegarde Annexe conserve une copie de sécurité des preuves.

Il permet de préserver :

les anciennes versions ;

les captures originales ;

les fichiers avant renommage ;

les documents déplacés ;

les preuves qui pourraient être utiles après les retours de Studi.

Ce dossier n’est pas destiné à être parcouru en priorité par le jury. Il sert principalement à sécuriser le travail réalisé.

Méthode de consultation

Pour consulter les annexes, il est recommandé de procéder dans cet ordre :

choisir le projet concerné ;

ouvrir la catégorie correspondant à la compétence recherchée ;

consulter les captures, diagrammes ou documents présents ;

utiliser les preuves complémentaires pour approfondir un point précis ;

consulter le dépôt GitHub lorsqu’une vérification du code source ou de l’historique est nécessaire.

Limites actuelles de l’organisation

L’organisation a été améliorée afin de rendre les annexes plus lisibles.

Cependant, certains éléments peuvent encore présenter :

des noms de fichiers anciens ;

des numérotations différentes ;

des captures contenant plusieurs sujets ;

des doublons conservés temporairement pour sécurité ;

des documents créés à différentes étapes du projet.

Ces limites sont clairement identifiées et n’empêchent pas la vérification du travail.

Une nouvelle harmonisation pourra être réalisée après les retours de Studi, si cela est nécessaire.

Conclusion

Les annexes sont organisées autour de deux projets distincts : Frostia Games et Esportify+.

Cette organisation permet :

de séparer clairement les preuves ;

de faciliter la consultation ;

de conserver les documents techniques complets ;

de protéger la traçabilité du travail ;

de limiter les risques liés aux déplacements et aux renommages ;

de compléter le dossier principal sans le surcharger.

Certains fichiers conservent volontairement leur nom d’origine. Cette transparence permet de présenter une organisation réaliste, compréhensible et fidèle à l’évolution des projets.