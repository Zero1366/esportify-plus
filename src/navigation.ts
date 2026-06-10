import {
  getSession,
  clearSession,
  canAccessRole,
  type UserRole
} from "./session";

const roleBanner = document.querySelector<HTMLElement>("#roleBanner");
const sessionNav = document.querySelector<HTMLElement>("#sessionNav");

function redirectToLogin(): void {
  window.location.href = "/inscription.html";
}

function getRoleLabel(role: UserRole): string {
  if (role === "admin") return "Admin";
  if (role === "organizer") return "Organisateur";

  return "Utilisateur";
}

function protectCurrentPage(): void {
  const requiredRole =
    document.body.dataset.requiredRole as UserRole | undefined;

  if (!requiredRole) return;

  if (!canAccessRole(requiredRole)) {
    redirectToLogin();
  }
}

function updateRoleBanner(): void {
  if (!roleBanner) return;

  const session = getSession();

  if (!session) {
    roleBanner.innerHTML = "<span>Mode visiteur</span>";
    return;
  }

  roleBanner.innerHTML = `
    <span>
      Connecté : ${session.username} (${getRoleLabel(session.role)})
    </span>

    <button
      class="btn btn--ghost btn--small"
      type="button"
      data-logout
    >
      Déconnexion
    </button>
  `;
}

function renderSessionNav(): void {
  if (!sessionNav) return;

  const session = getSession();

  if (!session) {
    sessionNav.innerHTML = `
      <a href="/inscription.html">Connexion</a>
    `;
    return;
  }

  sessionNav.innerHTML = `
    <div class="nav-dropdown nav-dropdown--session">
      <button
        class="nav-dropdown__button"
        type="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        ${getRoleLabel(session.role)} ▾
      </button>

      <div class="nav-dropdown__menu nav-dropdown__menu--right">
        <a href="/admin.html" data-protected-role="admin">
          Espace admin
        </a>

        <a href="/organisateur.html" data-protected-role="organizer">
          Espace organisateur
        </a>

        <button
          class="nav-dropdown__logout"
          type="button"
          data-change-role
        >
          Changer de rôle
        </button>

        <button
          class="nav-dropdown__logout"
          type="button"
          data-logout
        >
          Déconnexion
        </button>
      </div>
    </div>
  `;
}

function closeAllDropdowns(): void {
  const dropdowns = document.querySelectorAll<HTMLElement>(".nav-dropdown");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector<HTMLButtonElement>(
      ".nav-dropdown__button"
    );

    dropdown.classList.remove("is-open");
    button?.setAttribute("aria-expanded", "false");
  });
}

function initDropdown(): void {
  const dropdowns = document.querySelectorAll<HTMLElement>(".nav-dropdown");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector<HTMLButtonElement>(
      ".nav-dropdown__button"
    );

    if (!button) return;

    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const wasOpen = dropdown.classList.contains("is-open");

      closeAllDropdowns();

      if (!wasOpen) {
        dropdown.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Node)) return;

    const clickedInsideDropdown = Array.from(dropdowns).some((dropdown) =>
      dropdown.contains(target)
    );

    if (!clickedInsideDropdown) {
      closeAllDropdowns();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllDropdowns();
    }
  });
}

function initProtectedLinks(): void {
  const protectedLinks = document.querySelectorAll<HTMLElement>(
    "[data-protected-role]"
  );

  protectedLinks.forEach((link) => {
    const requiredRole = link.dataset.protectedRole as UserRole | undefined;

    if (!requiredRole) return;

    if (!canAccessRole(requiredRole)) {
      link.setAttribute("aria-disabled", "true");
      link.setAttribute("title", "Accès réservé");
    }

    link.addEventListener("click", (event) => {
      if (canAccessRole(requiredRole)) {
        closeAllDropdowns();
        return;
      }

      event.preventDefault();
      redirectToLogin();
    });
  });
}

function initSessionButtons(): void {
  const logoutButtons = document.querySelectorAll<HTMLElement>("[data-logout]");
  const changeRoleButtons =
    document.querySelectorAll<HTMLElement>("[data-change-role]");

  logoutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      clearSession();
      redirectToLogin();
    });
  });

  changeRoleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      clearSession();
      redirectToLogin();
    });
  });
}

renderSessionNav();
updateRoleBanner();
protectCurrentPage();
initDropdown();
initProtectedLinks();
initSessionButtons();