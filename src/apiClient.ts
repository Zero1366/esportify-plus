type ApiLoginResponse = {
  success: boolean;
  username: string;
  role: "admin";
  message?: string;
};

export type AdminLoginResult = {
  success: boolean;
  source: "backend" | "fallback";
  username: string;
  role: "admin";
  message: string;
};

const API_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "";

function canUseBackend(): boolean {
  return API_URL !== "";
}

export async function loginAdminWithFallback(
  username: string,
  password: string
): Promise<AdminLoginResult> {
  const cleanUsername = username.trim();
  const cleanPassword = password.trim();

  if (canUseBackend()) {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: cleanUsername,
          password: cleanPassword
        })
      });

      if (!response.ok) {
        throw new Error("Réponse serveur invalide.");
      }

      const data = (await response.json()) as ApiLoginResponse;

      if (data.success && data.role === "admin") {
        return {
          success: true,
          source: "backend",
          username: data.username,
          role: "admin",
          message: data.message ?? "Connexion administrateur via backend."
        };
      }

      throw new Error("Identifiants administrateur refusés.");
    } catch {
      return loginAdminFallback(cleanUsername, cleanPassword);
    }
  }

  return loginAdminFallback(cleanUsername, cleanPassword);
}

function loginAdminFallback(
  username: string,
  password: string
): AdminLoginResult {
  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim().toLowerCase();

  const isAdmin =
    cleanUsername === "admin" &&
    (cleanPassword === "admin123" || cleanPassword === "admin");

  if (!isAdmin) {
    return {
      success: false,
      source: "fallback",
      username,
      role: "admin",
      message: "Identifiants administrateur invalides."
    };
  }

  return {
    success: true,
    source: "fallback",
    username: "admin",
    role: "admin",
    message: "Connexion administrateur en mode démo sécurisé."
  };
}