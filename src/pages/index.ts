import "../scss/index.scss";
import "../navigation";

import { getSession, type UserRole } from "../session";

const sessionLink = document.querySelector<HTMLAnchorElement>("#sessionLink");
const roleTestLink = document.querySelector<HTMLAnchorElement>("#roleTestLink");

function getRoleLabel(role: UserRole): string {
  if (role === "admin") {
    return "Administrateur";
  }

  if (role === "organizer") {
    return "Organisateur";
  }

  return "Utilisateur";
}

function getRoleUrl(role: UserRole): string {
  if (role === "admin") {
    return "/admin.html";
  }

  if (role === "organizer") {
    return "/organisateur.html";
  }

  return "/events.html";
}

function updateSessionDisplay(): void {
  const session = getSession();

  if (!session) {
    if (sessionLink) {
      sessionLink.textContent = "Connexion";
      sessionLink.href = "/inscription.html";
    }

    if (roleTestLink) {
      roleTestLink.textContent = "Se connecter";
      roleTestLink.href = "/inscription.html";
    }

    return;
  }

  const roleLabel = getRoleLabel(session.role);
  const roleUrl = getRoleUrl(session.role);

  if (sessionLink) {
    sessionLink.textContent = roleLabel;
    sessionLink.href = roleUrl;
  }

  if (roleTestLink) {
    roleTestLink.textContent = `Connecté : ${session.username}`;
    roleTestLink.href = roleUrl;
  }
}

updateSessionDisplay();

document.body.classList.add("is-ready");