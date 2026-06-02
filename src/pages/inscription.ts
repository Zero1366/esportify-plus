import "../scss/index.scss";
import "../navigation";

import { loginWithApi, type UserRole } from "../session";

const loginForm = document.querySelector<HTMLFormElement>("#loginForm");
const usernameInput = document.querySelector<HTMLInputElement>("#usernameInput");
const passwordInput = document.querySelector<HTMLInputElement>("#passwordInput");
const submitButton = loginForm?.querySelector<HTMLButtonElement>(
  "button[type='submit']"
);

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

  if (!validateInputs(username, password)) {
    return;
  }

  try {
    setLoading(true);

    const user = await loginWithApi(username, password);

    showMessage(`Connexion réussie. Bienvenue ${user.username}.`);

    window.location.href = getRedirectUrl(user.role);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Une erreur est survenue lors de la connexion.";

    showMessage(message);
  } finally {
    setLoading(false);
  }
});

document.body.classList.add("is-ready");