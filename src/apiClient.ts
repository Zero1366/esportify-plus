import { demoUsers, type UserRole } from "./data";

type ApiLoginResponse = {
  success: boolean;
  message?: string;
  user?: {
    id: number;
    username: string;
    role: UserRole;
  };
};

export type LoginResult =
  | {
      success: true;
      source: "backend" | "fallback";
      id: number;
      username: string;
      role: UserRole;
      message: string;
    }
  | {
      success: false;
      source: "backend" | "fallback";
      username: string;
      role: UserRole;
      message: string;
    };

const isLocalHost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const configuredApiUrl =
  import.meta.env.VITE_API_BASE_URL?.trim();

const API_URL = (
  configuredApiUrl ||
  (isLocalHost ? "http://localhost:3000" : "")
).replace(/\/+$/, "");

function canUseBackend(): boolean {
  return API_URL !== "";
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = 3000
): Promise<Response> {
  const controller = new AbortController();

  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function loginFallback(
  username: string,
  password: string
): LoginResult {
  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim();

  const demoUser = demoUsers.find(
    (user) =>
      user.username.toLowerCase() === cleanUsername &&
      user.password === cleanPassword
  );

  if (!demoUser) {
    return {
      success: false,
      source: "fallback",
      username: cleanUsername,
      role: "player",
      message:
        "Identifiants invalides en mode démonstration."
    };
  }

  return {
    success: true,
    source: "fallback",
    id: demoUser.id,
    username: demoUser.username,
    role: demoUser.role,
    message: "Connexion en mode démonstration."
  };
}

export async function loginWithFallback(
  username: string,
  password: string
): Promise<LoginResult> {
  const cleanUsername = username.trim();
  const cleanPassword = password.trim();

  if (!canUseBackend()) {
    return loginFallback(cleanUsername, cleanPassword);
  }

  try {
    const response = await fetchWithTimeout(
      `${API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: cleanUsername,
          password: cleanPassword
        })
      }
    );

    const data = (await response
      .json()
      .catch(() => null)) as ApiLoginResponse | null;

    if (!response.ok) {
      return {
        success: false,
        source: "backend",
        username: cleanUsername,
        role: "player",
        message:
          data?.message ??
          `Connexion refusée par le serveur (${response.status}).`
      };
    }

    if (!data?.success || !data.user) {
      return {
        success: false,
        source: "backend",
        username: cleanUsername,
        role: "player",
        message: "Réponse invalide reçue du serveur."
      };
    }

    return {
      success: true,
      source: "backend",
      id: data.user.id,
      username: data.user.username,
      role: data.user.role,
      message:
        data.message ??
        "Connexion réussie via le backend."
    };
  } catch {
    return loginFallback(cleanUsername, cleanPassword);
  }
}

export async function loginAdminWithFallback(
  username: string,
  password: string
): Promise<LoginResult> {
  const result = await loginWithFallback(
    username,
    password
  );

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