import "../scss/index.scss";
import "../navigation";

import { saveSession, type UserRole } from "../session";

const API_URL = "http://localhost:3000/api/auth/login";

interface LoginResponse {
  message: string;
  user: {
    id: number;
    username: string;
    role: UserRole;
  };
}

const loginForm = document.querySelector<HTMLFormElement>("#loginForm");
const usernameInput = document.querySelector<HTMLInputElement>("#usernameInput");
const passwordInput = document.querySelector<HTMLInputElement>("#passwordInput");

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

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput?.value.trim() ?? "";
  const password = passwordInput?.value.trim() ?? "";

  if (!username || !password) {
    showMessage("Veuillez saisir un pseudo et un mot de passe.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = (await response.json()) as LoginResponse;

    if (!response.ok) {
      showMessage(data.message || "Connexion impossible.");
      return;
    }

    saveSession(data.user);

    window.location.href = getRedirectUrl(data.user.role);
  } catch {
    showMessage("Impossible de contacter le serveur.");
  }
});

document.body.classList.add("is-ready");