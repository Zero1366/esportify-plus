# Workflow Git - Esportify+

## Objectif

Ce document présente l'utilisation de Git et GitHub dans le projet Esportify+.

Git permet de suivre l'évolution du projet, de sauvegarder les modifications et de conserver un historique clair du développement.

---

## Outils utilisés

Le projet utilise :

* Git ;
* GitHub ;
* Visual Studio Code ;
* Netlify pour le déploiement du frontend ;
* Docker pour la conteneurisation ;
* Docker Compose pour l'orchestration locale.

---

## Organisation du dépôt

Le projet est versionné dans un dépôt GitHub.

Le dépôt contient :

* le code source front-end ;
* le code source back-end ;
* la documentation technique ;
* les fichiers SQL ;
* les fichiers Docker ;
* les diagrammes UML ;
* les assets du projet.

---

## Branche principale

La branche principale utilisée est :

```txt
main
```

Cette branche contient la version stable du projet.

Les modifications importantes sont ajoutées progressivement puis sauvegardées avec des commits.

---

## Commandes principales

### Vérifier l'état du projet

```bash
git status
```

### Ajouter les fichiers modifiés

```bash
git add .
```

### Créer un commit

```bash
git commit -m "message du commit"
```

### Envoyer les modifications sur GitHub

```bash
git push
```

---

## Exemple de workflow utilisé

Pendant le développement, le workflow appliqué est le suivant :

```txt
Modification du code
        |
        ▼
Tests locaux
        |
        ▼
git status
        |
        ▼
git add .
        |
        ▼
git commit
        |
        ▼
git push
        |
        ▼
Sauvegarde GitHub
```

---

## Types de commits utilisés

Les messages de commits permettent de comprendre rapidement la nature des modifications.

Exemples :

```txt
feat: ajout d'une fonctionnalité
fix: correction d'un bug
docs: mise à jour de la documentation
chore: modification technique ou organisationnelle
refactor: amélioration de la structure du code
```

---

## Exemples de commits réalisés sur le projet

```txt
docs: ajout de la documentation technique
feat: ajout du backend Express
feat: ajout de SQLite
feat: ajout de la validation Zod
feat: ajout de UserEntity
feat: ajout de SafeUser
fix: correction des routes API
fix: amélioration de la sécurité SQLite
chore: réorganisation de l'architecture backend
docs: ajout des diagrammes UML
docs: ajout de la documentation NoSQL
docs: ajout de la documentation POO
```

---

## Suivi des corrections

Git a été utilisé pour suivre les améliorations apportées au projet, notamment :

* ajout du backend Express ;
* ajout de SQLite et Better-SQLite3 ;
* ajout de la validation Zod ;
* ajout de UserEntity et SafeUser ;
* ajout du middleware de gestion des erreurs ;
* ajout des contraintes SQL ;
* ajout de la documentation technique ;
* ajout du schéma SQL ;
* ajout de l'étude NoSQL ;
* ajout de Docker ;
* mise à jour de l'architecture du projet.

---

## Déploiement avec GitHub et Netlify

Le dépôt GitHub est relié à Netlify pour le déploiement du frontend.

Processus :

```txt
Commit local
      |
      ▼
Push GitHub
      |
      ▼
Déploiement Netlify
      |
      ▼
Site en ligne mis à jour
```

Cette organisation permet de conserver un historique de développement tout en facilitant le déploiement.

---

## Remarque

Dans le cadre de ce projet individuel, le développement a principalement été réalisé sur la branche principale.

L'utilisation de branches dédiées, de pull requests et de workflows collaboratifs constitue une amélioration envisagée pour une version future ou pour un projet réalisé en équipe.

---

## Évolution future du workflow

Dans une future version du projet, le workflow Git pourra être amélioré avec :

* l'utilisation de branches dédiées ;
* des pull requests ;
* une branche de développement ;
* une branche de production ;
* une meilleure séparation entre les corrections, les fonctionnalités et la documentation ;
* l'intégration d'outils d'automatisation et de tests continus.

---

## Avantages du versionnement

L'utilisation de Git permet :

* de sécuriser le code source ;
* de conserver un historique complet des modifications ;
* de faciliter les retours arrière ;
* de documenter les évolutions du projet ;
* de préparer le travail collaboratif ;
* de professionnaliser l'organisation du développement.

---

## Conclusion

Git et GitHub ont été utilisés pour organiser, sauvegarder et suivre l'évolution du projet Esportify+.

Ce workflow permet de travailler de manière structurée, de conserver une trace claire des améliorations réalisées et d'accompagner les évolutions techniques du projet tout au long de son cycle de développement.
