import { findAllSafeUsers, findUserByCredentials } from "../repositories/user.repository.js";
export function loginUser(username, password) {
    const cleanUsername = username?.trim();
    const cleanPassword = password?.trim();
    if (!cleanUsername || !cleanPassword) {
        return {
            success: false,
            message: "Nom d'utilisateur et mot de passe requis."
        };
    }
    const safeUser = findUserByCredentials(cleanUsername, cleanPassword);
    if (!safeUser) {
        return {
            success: false,
            message: "Identifiants incorrects."
        };
    }
    return {
        success: true,
        message: `Connexion réussie. Bienvenue ${safeUser.username}.`,
        user: safeUser
    };
}
export function getUsers() {
    return findAllSafeUsers();
}
