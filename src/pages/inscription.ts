import "../scss/index.scss";
import "../navigation";

import { loginAdminWithFallback } from "../apiClient";
import { saveSession, type UserRole } from "../session";

interface DemoUser {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}

const loginForm = document.querySelector<HTMLFormElement>("#loginForm");
const usernameInput = document.querySelector<HTMLInputElement>("#usernameInput");
const passwordInput = document.querySelector<HTMLInputElement>("#passwordInput");

const demoUsers: DemoUser[] = [
  {
    id: 1,
    username: "player",
    password: "player123",
    role: "user"
  },
  {
    id: 2,
    username: "organizer",
    password: "orga123",
    role: "organizer"
  }
];

function getRedirectUrl(role: UserRole): string {
  if (role === "organizer") {
    return "/organisateur.html";
  }

  if (role === "admin") {
    return "/admin.html";
  }

  return "/events.html";
}

function showMessage(message: string): void {
  alert(message);
}

function findDemoUser(username: string, password: string): DemoUser | null {
  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim();

  return (
    demoUsers.find(
      (user) =>
        user.username.toLowerCase() === cleanUsername &&
        user.password === cleanPassword
    ) ?? null
  );
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput?.value.trim() ?? "";
  const password = passwordInput?.value.trim() ?? "";

  if (!username || !password) {
    showMessage("Veuillez saisir un pseudo et un mot de passe.");
    return;
  }

  if (username.toLowerCase() === "admin") {
    const result = await loginAdminWithFallback(username, password);

    if (!result.success) {
      showMessage(result.message);
      return;
    }

    saveSession({
      id: 99,
      username: result.username,
      role: result.role
    });

    window.location.href = getRedirectUrl(result.role);
    return;
  }

  const demoUser = findDemoUser(username, password);

  if (!demoUser) {
    showMessage(
      "Compte introuvable. Essayez admin/admin123, organizer/orga123 ou player/player123."
    );
    return;
  }

  saveSession({
    id: demoUser.id,
    username: demoUser.username,
    role: demoUser.role
  });

  window.location.href = getRedirectUrl(demoUser.role);
});

document.body.classList.add("is-ready");