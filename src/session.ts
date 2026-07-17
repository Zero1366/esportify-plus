export type UserRole = "player" | "organizer" | "admin";

export interface SessionUser {
  id: number;
  username: string;
  role: UserRole;
}

const STORAGE_KEY = "esportify-session";

const validRoles: UserRole[] = [
  "player",
  "organizer",
  "admin"
];

function isUserRole(value: unknown): value is UserRole {
  return (
    typeof value === "string" &&
    validRoles.includes(value as UserRole)
  );
}

function isSessionUser(value: unknown): value is SessionUser {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const session = value as Record<string, unknown>;

  return (
    typeof session.id === "number" &&
    Number.isInteger(session.id) &&
    typeof session.username === "string" &&
    session.username.trim().length > 0 &&
    isUserRole(session.role)
  );
}

export function saveSession(user: SessionUser): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(user)
  );
}

export function getSession(): SessionUser | null {
  const storedSession =
    localStorage.getItem(STORAGE_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    const parsedSession: unknown =
      JSON.parse(storedSession);

    if (!isSessionUser(parsedSession)) {
      clearSession();
      return null;
    }

    return parsedSession;
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
  return getSession()?.role === role;
}

export function canAccessRole(
  requiredRole: UserRole
): boolean {
  const session = getSession();

  if (!session) {
    return false;
  }

  if (session.role === "admin") {
    return true;
  }

  return session.role === requiredRole;
}