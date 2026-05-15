import "../scss/index.scss";
import "../navigation";

import { loginAdminWithFallback } from "../apiClient";
import { saveSession, type UserRole } from "../session";

interface DemoUser {
  id: number;
  username: string;
  role: UserRole;
}

const loginForm = document.querySelector<HTMLFormElement>("#loginForm");
const usernameInput = document.querySelector<HTMLInputElement>("#usernameInput");
const passwordInput = document.querySelector<HTMLInputElement>("#passwordInput");

const demoUsers: DemoUser[] = [
  {
    id: 1,
    username: "user",
    role: "user"
  },
  {
    id: 2,
    username: "organizer",
    role: "organizer"
  },
  {
    id: 3,
    username: "organisateur",
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

function loginDemoUser(username: string, password: string): DemoUser | null {
  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim().toLowerCase();

  const user = demoUsers.find((item) => item.username === cleanUsername);

  if (!user) {
    return null;
  }

  const validPassword =
    cleanPassword === cleanUsername ||
    cleanPassword === "demo" ||
    cleanPassword === "test";

  if (!validPassword) {
    return null;
  }

  return user;
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput?.value.trim() ?? "";
  const password = passwordInput?.value.trim() ?? "";

  if (!username || !password) {
    showMessage("Veuillez saisir un pseudo et un mot de passe.");
    return;
  }

  const isAdminLogin = username.toLowerCase() === "admin";

  if (isAdminLogin) {
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

    showMessage(result.message);
    window.location.href = getRedirectUrl(result.role);
    return;
  }

  const demoUser = loginDemoUser(username, password);

  if (!demoUser) {
    showMessage(
      "Compte introuvable. Essayez user/user, organizer/organizer ou admin/admin."
    );
    return;
  }

  saveSession(demoUser);

  window.location.href = getRedirectUrl(demoUser.role);
});

document.body.classList.add("is-ready");