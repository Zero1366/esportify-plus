# ⭐ Esportify+

Application e-sport full-stack de démonstration simulant une plateforme complète avec gestion de rôles, backend fonctionnel et déploiement.

---

# ⭐ START HERE (POINT D’ENTRÉE)

👉 Pour comprendre rapidement le projet :

⭐ `doc/site-final/`
→ rendu visuel complet du projet (Desktop / Mobile)

📌 C’est la représentation réelle de l’application.

---

# ⭐ DÉMARRER L’EXPLORATION

## ⭐ 1. Résultat final (PRIORITÉ)

📁 Ouvrir :
`doc/site-final/`

Contient :
- version Desktop (1366x768)
- version Mobile (360x800)
- toutes les pages finales

📌 Permet de comprendre immédiatement le produit fini.

---

## ⭐ 2. Architecture globale du projet

📁 Ouvrir :
`doc/database/deployment/Guide-Deployment/`

Contient :
- Docker
- GitHub workflow
- Netlify
- architecture système

📌 Permet de comprendre l’infrastructure globale.

---

## ⭐ 3. Frontend (logique utilisateur)

📁 Ouvrir :
`src/pages/index.ts`

Puis :
- `index.html`

📌 Point d’entrée de l’application frontend.

---

## ⭐ 4. Gestion des sessions et rôles

📁 Ouvrir :
`src/session.ts`

Contient :
- gestion utilisateur
- rôles (admin / organizer / user)
- logique de connexion simulée

---

## ⭐ 5. Backend (API serveur)

📁 Ouvrir :
`backend/src/server.ts`

Puis suivre :

➡️ `routes/`
➡️ `controllers/`
➡️ `services/`
➡️ `repositories/`

📌 Architecture backend en couches.

---

## ⭐ 6. Base de données

📁 Ouvrir :
`doc/database/schema.sql`

Puis :
`doc/database/seed.sql`

📌 Structure + données de démonstration.

---

# ⭐ NAVIGATION DU PROJET

## ✔ FRONTEND

1. `index.html`
2. `src/pages/`
3. `src/navigation.ts`
4. `src/session.ts`

---

## ✔ BACKEND

1. `server.ts`
2. `routes/`
3. `controllers/`
4. `services/`
5. `repositories/`

---

## ✔ DOCUMENTATION

- `doc/site-final/` → rendu visuel du projet
- `doc/database/deployment/` → infrastructure et déploiement
- `doc/database/` → base de données et SQL

---

# ⭐ PARCOURS RECOMMANDÉ (JURY / RECRUTEUR)

👉 Lecture conseillée dans cet ordre :

1. ⭐ `doc/site-final/`
2. ⭐ `index.html`
3. ⭐ `src/session.ts`
4. ⭐ `backend/src/server.ts`
5. ⭐ `doc/database/`

---

# ⭐ IDÉE DU PROJET

Esportify+ est une application démonstrative reproduisant une plateforme e-sport complète :

- interface utilisateur responsive
- système de rôles
- replay simulé de match
- backend structuré
- base de données SQLite
- déploiement Docker + Netlify
- documentation modulaire

---

# ⭐ ARCHITECTURE GLOBALE

```text
Utilisateur
   ↓
Frontend (Vite)
   ↓
API Express
   ↓
SQLite Database