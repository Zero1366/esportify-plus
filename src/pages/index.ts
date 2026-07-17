import "../navigation";

import {
  getSession,
  type UserRole
} from "../session";

const roleTestLink =
  document.querySelector<HTMLAnchorElement>(
    "#roleTestLink"
  );

function getRoleUrl(role: UserRole): string {
  if (role === "admin") {
    return "/admin.html";
  }

  if (role === "organizer") {
    return "/organisateur.html";
  }

  return "/events.html";
}

function getRoleLabel(role: UserRole): string {
  if (role === "admin") {
    return "Accès Administrateur";
  }

  if (role === "organizer") {
    return "Accès Organisateur";
  }

  return "Accès Joueur";
}

function updateRoleTestLink(): void {
  if (!roleTestLink) {
    return;
  }

  const session = getSession();

  if (!session) {
    roleTestLink.textContent = "Connexion";
    roleTestLink.href = "/inscription.html";
    return;
  }

  roleTestLink.textContent =
    getRoleLabel(session.role);

  roleTestLink.href =
    getRoleUrl(session.role);
}

updateRoleTestLink();

requestAnimationFrame(() => {
  document.body.classList.add(
    "is-ready"
  );
});