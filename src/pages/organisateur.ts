
import "../navigation";

import { eventsData, type EventItem } from "../data";
import { canAccessRole, isAuthenticated } from "../session";

type ActivityStatus = "pending" | "validated" | "refused";

interface ActivityRequest {
  id: number;
  type: string;
  title: string;
  format: string;
  game: string;
  date: string;
  maxPlayers: string;
  status: ActivityStatus;
}

const toastContainer = document.querySelector<HTMLElement>("#toastContainer");
const activityRequestForm =
  document.querySelector<HTMLFormElement>("#activityRequestForm");

const activityTypeInput =
  document.querySelector<HTMLSelectElement>("#activityTypeInput");
const activityTitleInput =
  document.querySelector<HTMLInputElement>("#activityTitleInput");
const activityFormatInput =
  document.querySelector<HTMLSelectElement>("#activityFormatInput");
const activityGameInput =
  document.querySelector<HTMLSelectElement>("#activityGameInput");
const activityDateInput =
  document.querySelector<HTMLInputElement>("#activityDateInput");
const activityMaxPlayersInput =
  document.querySelector<HTMLSelectElement>("#activityMaxPlayersInput");

const eventsStat = document.querySelector<HTMLElement>("#eventsStat");
const proposalStat = document.querySelector<HTMLElement>("#validatedStat");
const availableEventCard =
  document.querySelector<HTMLElement>("#availableEventCard");

const activityRequests: ActivityRequest[] = [];

function redirectToLogin(): void {
  window.location.href = "/inscription.html";
}

function protectPage(): void {
  if (isAuthenticated() && canAccessRole("organizer")) return;

  redirectToLogin();
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message: string): void {
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  toastContainer.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 3000);
}

function getAvailableEvents(): EventItem[] {
  return eventsData.filter((event) => event.status === "validated");
}

function renderStats(): void {
  const availableEventsCount = getAvailableEvents().length;
  const pendingRequestsCount = activityRequests.filter(
    (request) => request.status === "pending"
  ).length;

  if (eventsStat) {
    eventsStat.textContent = String(availableEventsCount);
  }

  if (proposalStat) {
    proposalStat.textContent = String(pendingRequestsCount);
  }
}

function renderAvailableEventCard(): void {
  if (!availableEventCard) return;

  const [mainEvent] = getAvailableEvents();

  if (!mainEvent) {
    availableEventCard.innerHTML = `
      <span class="organizer-stat__icon" aria-hidden="true">○</span>
      <strong>0</strong>
      <span>Aucun événement disponible</span>
    `;
    return;
  }

  availableEventCard.innerHTML = `
    <div class="available-event-card__content">
      <span class="event-status event-status--validated">
        Disponible
      </span>

      <strong class="available-event-card__title">
        ${escapeHtml(mainEvent.title)}
      </strong>

      <span class="available-event-card__meta">
        ${escapeHtml(mainEvent.game)} · ${escapeHtml(mainEvent.date)}
      </span>
    </div>

    <a class="btn btn--primary btn--small" href="/replay.html">
      Voir le replay
    </a>
  `;
}

function resetActivityForm(): void {
  activityRequestForm?.reset();

  if (activityFormatInput) {
    activityFormatInput.value = "";
  }

  if (activityGameInput) {
    activityGameInput.value = "";
  }

  if (activityMaxPlayersInput) {
    activityMaxPlayersInput.value = "16";
  }
}

function createActivityRequest(): ActivityRequest | null {
  if (
    !activityTypeInput ||
    !activityTitleInput ||
    !activityFormatInput ||
    !activityGameInput ||
    !activityDateInput ||
    !activityMaxPlayersInput
  ) {
    return null;
  }

  const type = activityTypeInput.value;
  const title = activityTitleInput.value.trim();
  const format = activityFormatInput.value;
  const game = activityGameInput.value;
  const date = activityDateInput.value;
  const maxPlayers = activityMaxPlayersInput.value;

  if (!type || !title || !format || !game || !date || !maxPlayers) {
    showToast("Veuillez remplir tous les champs.");
    return null;
  }

  return {
    id: Date.now(),
    type,
    title,
    format,
    game,
    date,
    maxPlayers,
    status: "pending"
  };
}

function initActivityRequestForm(): void {
  if (!activityRequestForm) return;

  activityRequestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const request = createActivityRequest();

    if (!request) return;

    activityRequests.unshift(request);

    resetActivityForm();
    renderStats();

    showToast("Proposition ajoutée en attente.");
  });
}

protectPage();
renderStats();
renderAvailableEventCard();
initActivityRequestForm();

requestAnimationFrame(() => {
  document.body.classList.add("is-ready");
});