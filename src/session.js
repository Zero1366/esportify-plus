const STORAGE_KEY = "esportify-session";
export function saveSession(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}
export function getSession() {
    const storedSession = localStorage.getItem(STORAGE_KEY) ??
        sessionStorage.getItem(STORAGE_KEY);
    if (!storedSession) {
        return null;
    }
    try {
        return JSON.parse(storedSession);
    }
    catch {
        clearSession();
        return null;
    }
}
export function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
}
export function isAuthenticated() {
    return getSession() !== null;
}
export function hasRole(role) {
    const session = getSession();
    if (!session) {
        return false;
    }
    return session.role === role;
}
export function changeRole(role) {
    const session = getSession();
    if (!session) {
        return;
    }
    saveSession({
        ...session,
        role
    });
}
export async function loginWithAPI(username, password) {
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    const data = (await response.json());
    if (!response.ok || !data.success || !data.user) {
        throw new Error(data.message || "Erreur de connexion");
    }
    const sessionUser = {
        id: data.user.id,
        username: data.user.username,
        role: data.user.role
    };
    saveSession(sessionUser);
    return sessionUser;
}
export function canAccessRole(requiredRole) {
    const session = getSession();
    if (!session) {
        return false;
    }
    if (session.role === "admin") {
        return true;
    }
    return session.role === requiredRole;
}
