export type UserRole = "user" | "organizer" | "admin";

export interface SessionUser {
  id: number;
  username: string;
  role: UserRole;
}

const STORAGE_KEY = "esportify-session";

export function saveSession(user: SessionUser): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function getSession(): SessionUser | null {
  const storedSession = sessionStorage.getItem(STORAGE_KEY);

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
  sessionStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEY);
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