import "../navigation";

import {
  eventsData,
  type EventItem,
  type EventStatus,
  type EventType
} from "../data";

type EventTypeFilter =
  | EventType
  | "all";

type EventStatusFilter =
  | EventStatus
  | "all";

const valorantImageUrl = new URL(
  "../../Image/arena-live.png",
  import.meta.url
).href;

const eventSearch =
  document.querySelector<HTMLInputElement>(
    "#eventSearch"
  );

const eventType =
  document.querySelector<HTMLSelectElement>(
    "#eventType"
  );

const eventStatus =
  document.querySelector<HTMLSelectElement>(
    "#eventStatus"
  );

const eventsGrid =
  document.querySelector<HTMLElement>(
    "#eventsGrid"
  );

const eventsCount =
  document.querySelector<HTMLElement>(
    "#eventsCount"
  );

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isEventType(
  value: string
): value is EventType {
  return (
    value === "tournament" ||
    value === "event"
  );
}

function isEventStatus(
  value: string
): value is EventStatus {
  return (
    value === "validated" ||
    value === "pending" ||
    value === "cancelled"
  );
}

function getSelectedType():
  EventTypeFilter {
  const value = eventType?.value;

  if (!value || value === "all") {
    return "all";
  }

  return isEventType(value)
    ? value
    : "all";
}

function getSelectedStatus():
  EventStatusFilter {
  const value = eventStatus?.value;

  if (!value || value === "all") {
    return "all";
  }

  return isEventStatus(value)
    ? value
    : "all";
}

function getTypeIcon(
  type: EventType
): string {
  return type === "tournament"
    ? "🏆"
    : "📅";
}

function getTypeLabel(
  type: EventType
): string {
  return type === "tournament"
    ? "Tournoi"
    : "Événement";
}

function getStatusLabel(
  status: EventStatus
): string {
  if (status === "validated") {
    return "Disponible";
  }

  if (status === "pending") {
    return "En attente";
  }

  return "Annulé";
}

function getStatusClass(
  status: EventStatus
): string {
  if (status === "validated") {
    return "event-card--validated";
  }

  if (status === "pending") {
    return "event-card--pending";
  }

  return "event-card--cancelled";
}

function getEventImage(
  event: EventItem
): string {
  if (event.id !== 1) {
    return "";
  }

  return `
    <img
      class="event-card__image"
      src="${valorantImageUrl}"
      alt="Illustration du tournoi Valorant Night Clash"
    />
  `;
}

function getEventAction(
  event: EventItem
): string {
  if (
    event.id === 1 &&
    event.status === "validated"
  ) {
    return `
      <a
        class="btn btn--primary event-replay-link"
        href="/replay.html"
      >
        Voir le replay
      </a>
    `;
  }

  if (event.status === "validated") {
    return `
      <a
        class="btn btn--ghost event-replay-link"
        href="/inscription.html"
      >
        Participer
      </a>
    `;
  }

  return "";
}

function renderEventCard(
  event: EventItem
): string {
  const title =
    escapeHtml(event.title);

  const game =
    escapeHtml(event.game);

  const date =
    escapeHtml(event.date);

  const description =
    escapeHtml(event.description);

  const statusReason =
    event.statusReason
      ? escapeHtml(event.statusReason)
      : "";

  return `
    <article
      class="card event-card
             ${getStatusClass(event.status)}"
    >
      ${getEventImage(event)}

      <div class="event-card__header">
        <p class="event-card__type">
          ${getTypeIcon(event.type)}
          ${getTypeLabel(event.type)}
        </p>

        <span
          class="event-status
                 event-status--${event.status}"
        >
          ${getStatusLabel(event.status)}
        </span>
      </div>

      <h3>${title}</h3>

      <p>${description}</p>

      <div class="event-meta">
        <p>
          <strong>Jeu :</strong>
          ${game}
        </p>

        <p>
          <strong>Date :</strong>
          ${date}
        </p>

        <p>
          <strong>Joueurs :</strong>
          ${event.players}/${event.maxPlayers}
        </p>
      </div>

      ${
        statusReason
          ? `
            <p class="event-reason">
              <strong>Détail :</strong>
              ${statusReason}
            </p>
          `
          : ""
      }

      ${getEventAction(event)}
    </article>
  `;
}

function getFilteredEvents():
  EventItem[] {
  const searchValue =
    eventSearch?.value
      .trim()
      .toLowerCase() ?? "";

  const selectedType =
    getSelectedType();

  const selectedStatus =
    getSelectedStatus();

  return eventsData.filter((event) => {
    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(searchValue) ||
      event.game
        .toLowerCase()
        .includes(searchValue);

    const matchesType =
      selectedType === "all" ||
      event.type === selectedType;

    const matchesStatus =
      selectedStatus === "all" ||
      event.status === selectedStatus;

    return (
      matchesSearch &&
      matchesType &&
      matchesStatus
    );
  });
}

function renderEvents(): void {
  if (!eventsGrid || !eventsCount) {
    return;
  }

  const filteredEvents =
    getFilteredEvents();

  const count =
    filteredEvents.length;

  const pluralSuffix =
    count === 1 ? "" : "s";

  eventsCount.textContent =
    `${count} résultat${pluralSuffix} ` +
    `affiché${pluralSuffix}`;

  if (count === 0) {
    eventsGrid.innerHTML = `
      <p class="empty-state">
        Aucun événement ne correspond
        à ces critères.
      </p>
    `;

    return;
  }

  eventsGrid.innerHTML =
    filteredEvents
      .map(renderEventCard)
      .join("");
}

function updateMobileTabs(): void {
  const buttons =
    document.querySelectorAll<HTMLButtonElement>(
      "[data-status-filter]"
    );

  const selectedStatus =
    getSelectedStatus();

  buttons.forEach((button) => {
    const isActive =
      button.dataset.statusFilter ===
      selectedStatus;

    button.classList.toggle(
      "is-active",
      isActive
    );

    button.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });
}

function initMobileStatusTabs(): void {
  const buttons =
    document.querySelectorAll<HTMLButtonElement>(
      "[data-status-filter]"
    );

  if (
    !eventStatus ||
    buttons.length === 0
  ) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const selectedStatus =
          button.dataset.statusFilter;

        if (!selectedStatus) {
          return;
        }

        if (
          selectedStatus !== "all" &&
          !isEventStatus(selectedStatus)
        ) {
          return;
        }

        eventStatus.value =
          selectedStatus;

        updateMobileTabs();
        renderEvents();
      }
    );
  });
}

eventSearch?.addEventListener(
  "input",
  renderEvents
);

eventType?.addEventListener(
  "change",
  renderEvents
);

eventStatus?.addEventListener(
  "change",
  () => {
    updateMobileTabs();
    renderEvents();
  }
);

initMobileStatusTabs();
updateMobileTabs();
renderEvents();

requestAnimationFrame(() => {
  document.body.classList.add(
    "is-ready"
  );
});