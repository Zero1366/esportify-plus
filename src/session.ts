export type UserRole = "player" | "organizer" | "admin";

export interface SessionUser {
  id: number;
  username: string;
  role: UserRole;
}

interface ApiLoginResponse {
  success: boolean;
  message: string;
  user?: SessionUser;
}

const STORAGE_KEY = "esportify-session";

export function saveSession(user: SessionUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function getSession(): SessionUser | null {
  const storedSession =
    localStorage.getItem(STORAGE_KEY) ??
    sessionStorage.getItem(STORAGE_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    return JSON.parse(storedSession) as SessionUser;
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function hasRole(role: UserRole): boolean {
  const session = getSession();

  if (!session) {
    return false;
  }

  return session.role === role;
}

export function changeRole(role: UserRole): void {
  const session = getSession();

  if (!session) {
    return;
  }

  saveSession({
    ...session,
    role
  });
}

export async function loginWithAPI(
  username: string,
  password: string
): Promise<SessionUser> {
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

  const data = (await response.json()) as ApiLoginResponse;

  if (!response.ok || !data.success || !data.user) {
    throw new Error(data.message || "Erreur de connexion");
  }

  const sessionUser: SessionUser = {
    id: data.user.id,
    username: data.user.username,
    role: data.user.role
  };

  saveSession(sessionUser);

  return sessionUser;
}

export function canAccessRole(requiredRole: UserRole): boolean {
  const session = getSession();

  if (!session) {
    return false;
  }

  if (session.role === "admin") {
    return true;
  }

  return session.role === requiredRole;
}