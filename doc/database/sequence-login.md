# Diagramme de séquence - Connexion utilisateur

```mermaid
sequenceDiagram
  actor User as Utilisateur
  participant Front as Front-end
  participant Route as Route Auth
  participant Controller as AuthController
  participant Service as AuthService
  participant Repository as UserRepository
  participant Data as user.json

  User->>Front: Saisit identifiant et mot de passe
  Front->>Route: POST /api/auth/login
  Route->>Controller: login(req, res)
  Controller->>Service: loginUser(username, password)
  Service->>Repository: findUserByCredentials()
  Repository->>Data: Recherche utilisateur
  Data-->>Repository: Utilisateur trouvé ou non
  Repository-->>Service: Résultat
  Service-->>Controller: Succès ou erreur
  Controller-->>Front: Réponse JSON
  Front-->>User: Affiche connexion réussie ou erreur

# Explication du fonctionnement
1. L'utilisateur saisit ses identifiants dans l'interface.
2. Le front-end envoie une requête POST vers L'API D'authentification.
3. La route transmet la requête au contrôleur.
4. Le contrôleur appelle le service d'authentification.
5. Le service interroge le dépôt de données.
6. Le dépôt consulte le fichier user.json
7. Si l'utilisateur  existe que les informations sont validés, une réponses positive est renvoyée.
8. Le contrôleur retourrne une réponse JSON au front-end
9.Le front end affiche le résultat à l'utilisateur