# ⭐ Esportify+

Esportify+ est une application e-sport full-stack de démonstration.

Le projet simule une plateforme complète avec :

* une interface utilisateur responsive ;
* une gestion de rôles ;
* un replay de match simulé ;
* un backend fonctionnel ;
* une base de données SQLite ;
* un déploiement Docker et Netlify ;
* une documentation organisée.

---

# ⭐ Point d’entrée recommandé

Pour comprendre rapidement le projet, commencer par :

```text
doc/site-final/
```

Ce dossier contient le rendu visuel final du projet en version Desktop et Mobile.

Il permet de voir directement le résultat attendu de l’application.

---

# ⭐ Parcours de lecture conseillé

## 1. Résultat final

```text
doc/site-final/
```

Contenu :

* captures Desktop ;
* captures Mobile ;
* pages finales de l’application.

---

## 2. Architecture globale et déploiement

```text
doc/database/deployment/Guide-Deployment/
```

Contenu :

* Docker ;
* GitHub workflow ;
* Netlify ;
* architecture système ;
* stratégie de déploiement.

---

## 3. Frontend

Point d’entrée principal :

```text
index.html
src/pages/index.ts
```

Fichiers importants :

```text
src/pages/
src/navigation.ts
src/session.ts
```

Le frontend gère :

* l’affichage des pages ;
* la navigation ;
* les états utilisateur ;
* les rôles simulés ;
* l’expérience responsive.

---

## 4. Gestion des sessions et des rôles

```text
src/session.ts
```

Ce fichier contient :

* la gestion de l’utilisateur connecté ;
* les rôles disponibles ;
* la logique de connexion simulée ;
* les protections d’accès côté interface.

Rôles utilisés :

* utilisateur ;
* organizer ;
* admin.

---

## 5. Backend

Point d’entrée principal :

```text
backend/src/server.ts
```

Architecture backend :

```text
backend/src/routes/
backend/src/controllers/
backend/src/services/
backend/src/repositories/
```

Le backend est organisé en couches afin de séparer :

* les routes API ;
* les contrôleurs ;
* la logique métier ;
* l’accès aux données.

---

## 6. Base de données

Fichiers principaux :

```text
doc/database/schema.sql
doc/database/seed.sql
```

Ces fichiers contiennent :

* la structure de la base de données ;
* les tables principales ;
* les données de démonstration.

---

# ⭐ Architecture globale

```text
Utilisateur
   ↓
Frontend Vite
   ↓
API Express
   ↓
SQLite Database
```

---

# ⭐ Fonctionnalités principales

Esportify+ propose :

* une page d’accueil responsive ;
* une page événements ;
* un système de rôles simulés ;
* une interface organizer ;
* une interface admin ;
* un replay e-sport simulé ;
* une API backend ;
* une base de données documentée ;
* une documentation de déploiement.

---

# ⭐ Navigation rapide du projet

## Frontend

```text
index.html
src/pages/
src/navigation.ts
src/session.ts
```

## Backend

```text
backend/src/server.ts
backend/src/routes/
backend/src/controllers/
backend/src/services/
backend/src/repositories/
```

## Documentation

```text
doc/site-final/
doc/database/
doc/database/deployment/
```

---

# ⭐ Lecture recommandée pour un jury ou un recruteur

Ordre conseillé :

1. `doc/site-final/`
2. `index.html`
3. `src/session.ts`
4. `backend/src/server.ts`
5. `doc/database/`
6. `doc/database/deployment/Guide-Deployment/`

---

# ⭐ Objectif du projet

L’objectif d’Esportify+ est de démontrer la capacité à construire une application web complète, structurée et documentée.

Le projet met en avant :

* la construction d’une interface moderne ;
* l’organisation d’un frontend Vite / TypeScript ;
* la mise en place d’un backend Express ;
* la séparation des responsabilités dans le code ;
* la gestion de rôles ;
* la documentation technique ;
* la préparation au déploiement.

---

# ⭐ Conclusion

Esportify+ est un projet de démonstration complet permettant de présenter une application e-sport fonctionnelle, structurée et documentée.

Il montre à la fois le résultat visuel, la logique frontend, l’architecture backend, la base de données et les choix de déploiement.
