import type { SafeUser } from "../entities/user.entity.js";
import { findUserByCredentials } from "../repositories/user.repository.js";

interface LoginResult {
  success: boolean;
  message: string;
  user?: SafeUser;
}

export function loginUser(
  username: string,
  password: string
): LoginResult {
  const cleanUsername = username.trim();
  const cleanPassword = password.trim();

  if (!cleanUsername || !cleanPassword) {
    return {
      success: false,
      message:
        "Nom d'utilisateur et mot de passe requis."
    };
  }

  const safeUser = findUserByCredentials(
    cleanUsername,
    cleanPassword
  );

  if (!safeUser) {
    return {
      success: false,
      message: "Identifiants incorrects."
    };
  }

  return {
    success: true,
    message:
      `Connexion réussie. Bienvenue ${safeUser.username}.`,
    user: safeUser
  };
}