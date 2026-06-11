
import "../navigation";

import { loginWithFallback } from "../apiClient";
import { saveSession, type UserRole } from "../session";

const loginForm = document.querySelector<HTMLFormElement>("#loginForm");
const usernameInput = document.querySelector<HTMLInputElement>("#usernameInput");
const passwordInput = document.querySelector<HTMLInputElement>("#passwordInput");
const submitButton = loginForm?.querySelector<HTMLButtonElement>(
  "button[type='submit']"
);

const loginMessage = document.createElement("p");
loginMessage.className = "form-message";
loginForm?.appendChild(loginMessage);

function getRedirectUrl(role: UserRole): string {
  if (role === "organizer") return "/organisateur.html";
  if (role === "admin") return "/admin.html";

  return "/events.html";
}

function showMessage(message: string): void {
  loginMessage.textContent = message;
}

function setLoading(isLoading: boolean): void {
  if (!submitButton) return;

  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? "Connexion..." : "Se connecter";
}

function validateInputs(username: string, password: string): boolean {
  if (!username || !password) {
    showMessage("Veuillez saisir un pseudo et un mot de passe.");
    return false;
  }

  if (username.length < 3) {
    showMessage("Le pseudo doit contenir au moins 3 caractères.");
    return false;
  }

  if (password.length < 6) {
    showMessage("Le mot de passe doit contenir au moins 6 caractères.");
    return false;
  }

  return true;
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput?.value.trim() ?? "";
  const password = passwordInput?.value.trim() ?? "";

  if (!validateInputs(username, password)) return;

  setLoading(true);
  showMessage("Connexion en cours...");

  try {
    const result = await loginWithFallback(username, password);

    if (!result.success) {
      showMessage(result.message);
      setLoading(false);
      return;
    }

    saveSession({
      id: Date.now(),
      username: result.username,
      role: result.role
    });

    const redirectUrl = getRedirectUrl(result.role);
    const sourceLabel =
      result.source === "backend" ? "serveur" : "mode démonstration";

    showMessage(`Connexion réussie via ${sourceLabel}.`);

    window.setTimeout(() => {
      window.location.href = redirectUrl;
    }, 500);
  } catch {
    showMessage("Erreur inattendue pendant la connexion.");
    setLoading(false);
  }
});

requestAnimationFrame(() => {
  document.body.classList.add("is-ready");
});