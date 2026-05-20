import { SafeUser } from "../entities/user.entity";
import {
  findAllSafeUsers,
  findUserByCredentials
} from "../repositories/user.repository";

interface LoginResult {
  success: boolean;
  message: string;
  user?: SafeUser;
}

export function loginUser(username: string, password: string): LoginResult {
  if (!username || !password) {
    return {
      success: false,
      message: "Nom d'utilisateur et mot de passe requis."
    };
  }

  const foundUser = findUserByCredentials(username, password);

  if (!foundUser) {
    return {
      success: false,
      message: "Identifiants incorrects."
    };
  }

  const { password: _password, ...safeUser } = foundUser;

  return {
    success: true,
    message: "Connexion réussie",
    user: safeUser
  };
}

export function getUsers(): SafeUser[] {
  return findAllSafeUsers();
}