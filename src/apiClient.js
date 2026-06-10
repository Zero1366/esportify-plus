import { demoUsers } from "./data";
const API_URL = window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "";
function canUseBackend() {
    return API_URL.trim() !== "";
}
async function fetchWithTimeout(url, options, timeout = 3000) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
        controller.abort();
    }, timeout);
    try {
        return await fetch(url, {
            ...options,
            signal: controller.signal
        });
    }
    finally {
        window.clearTimeout(timeoutId);
    }
}
function loginFallback(username, password) {
    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();
    const demoUser = demoUsers.find((user) => user.username === cleanUsername &&
        user.password === cleanPassword);
    if (!demoUser) {
        return {
            success: false,
            source: "fallback",
            username,
            role: "player",
            message: "Identifiants invalides."
        };
    }
    return {
        success: true,
        source: "fallback",
        username: demoUser.username,
        role: demoUser.role,
        message: "Connexion en mode démonstration."
    };
}
export async function loginWithFallback(username, password) {
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();
    if (canUseBackend()) {
        try {
            const response = await fetchWithTimeout(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: cleanUsername,
                    password: cleanPassword
                })
            });
            if (response.ok) {
                const data = (await response.json());
                if (data.success && data.user) {
                    return {
                        success: true,
                        source: "backend",
                        username: data.user.username,
                        role: data.user.role,
                        message: data.message ?? "Connexion réussie via le backend."
                    };
                }
            }
        }
        catch {
            return loginFallback(cleanUsername, cleanPassword);
        }
    }
    return loginFallback(cleanUsername, cleanPassword);
}
export async function loginAdminWithFallback(username, password) {
    const result = await loginWithFallback(username, password);
    if (!result.success || result.role !== "admin") {
        return {
            success: false,
            source: result.source,
            username,
            role: "admin",
            message: "Accès administrateur refusé."
        };
    }
    return result;
}
