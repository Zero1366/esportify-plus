import "../scss/index.scss";
import "../navigation";

import { getSession, type UserRole } from "../session";

const roleTestLink = document.querySelector<HTMLAnchorElement>("#roleTestLink");

function getRoleUrl(role: UserRole): string {
  if (role === "admin") {
    return "/admin.html";
  }

  if (role === "organizer") {
    return "/organisateur.html";
  }

  return "/events.html";
}

function updateRoleTestLink(): void {
  if (!roleTestLink) return;

  const session = getSession();

  if (!session) {
    roleTestLink.textContent = "Connexion";
    roleTestLink.href = "/inscription.html";
    return;
  }

  roleTestLink.textContent = `Connecté : ${session.username}`;
  roleTestLink.href = getRoleUrl(session.role);
}

updateRoleTestLink();

document.body.classList.add("is-ready");