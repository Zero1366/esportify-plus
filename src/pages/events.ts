import "../scss/index.scss";
import "../navigation";

import {
  eventsData,
  type EventItem,
  type EventStatus,
  type EventType
} from "../data";

const valorantImageUrl = new URL("../../Image/arena-live.png", import.meta.url).href;

const eventSearch = document.querySelector<HTMLInputElement>("#eventSearch");
const eventType = document.querySelector<HTMLSelectElement>("#eventType");
const eventStatus = document.querySelector<HTMLSelectElement>("#eventStatus");
const eventsGrid = document.querySelector<HTMLElement>("#eventsGrid");
const eventsCount = document.querySelector<HTMLElement>("#eventsCount");

function getTypeIcon(type: EventType): string {
  return type === "tournament" ? "🏆" : "📅";
}

function getTypeLabel(type: EventType): string {
  return type === "tournament" ? "Tournoi" : "Événement";
}

function getStatusLabel(status: EventStatus): string {
  if (status === "validated") return "Disponible";
  if (status === "pending") return "En attente";

  return "Annulé";
}

function getStatusClass(status: EventStatus): string {
  if (status === "validated") return "event-card--validated";
  if (status === "pending") return "event-card--pending";

  return "event-card--cancelled";
}

function getEventImage(event: EventItem): string {
  if (event.title !== "Valorant Night Clash") return "";

  return `
    <img
      class="event-card__image"
      src="${valorantImageUrl}"
      alt="Illustration du tournoi Valorant Night Clash"
    />
  `;
}

function getEventAction(event: EventItem): string {
  if (event.title === "Valorant Night Clash") {
    return `
      <a class="btn btn--primary event-replay-link" href="/replay.html">
        Voir le replay
      </a>
    `;
  }

  if (event.status === "validated") {
    return `
      <a class="btn btn--ghost event-replay-link" href="/inscription.html">
        Participer
      </a>
    `;
  }

  return "";
}

function renderEventCard(event: EventItem): string {
  return `
    <article class="card event-card ${getStatusClass(event.status)}">
      ${getEventImage(event)}

      <div class="event-card__header">
        <p class="event-card__type">
          ${getTypeIcon(event.type)} ${getTypeLabel(event.type)}
        </p>

        <span class="event-status event-status--${event.status}">
          ${getStatusLabel(event.status)}
        </span>
      </div>

      <h3>${event.title}</h3>

      <p>${event.description}</p>

      <div class="event-meta">
        <p><strong>Jeu :</strong> ${event.game}</p>
        <p><strong>Date :</strong> ${event.date}</p>
        <p><strong>Joueurs :</strong> ${event.players}/${event.maxPlayers}</p>
      </div>

      ${
        event.statusReason
          ? `<p class="event-reason"><strong>Détail :</strong> ${event.statusReason}</p>`
          : ""
      }

      ${getEventAction(event)}
    </article>
  `;
}

function renderEvents(): void {
  if (!eventSearch || !eventType || !eventStatus || !eventsGrid || !eventsCount) {
    return;
  }

  const searchValue = eventSearch.value.toLowerCase().trim();
  const selectedType = eventType.value;
  const selectedStatus = eventStatus.value;

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchValue) ||
      event.game.toLowerCase().includes(searchValue);

    const matchesType =
      selectedType === "all" || event.type === selectedType;

    const matchesStatus =
      selectedStatus === "all" || event.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const count = filteredEvents.length;

  eventsCount.textContent =
    `${count} résultat${count > 1 ? "s" : ""} affiché${count > 1 ? "s" : ""}`;

  eventsGrid.innerHTML =
    count === 0
      ? `<p class="empty-state">Aucun événement ne correspond à ce filtre.</p>`
      : filteredEvents.map(renderEventCard).join("");
}

function initMobileStatusTabs(): void {
  const buttons =
    document.querySelectorAll<HTMLButtonElement>("[data-status-filter]");

  if (!eventStatus || buttons.length === 0) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedStatus = button.dataset.statusFilter;

      if (!selectedStatus) return;

      eventStatus.value = selectedStatus;

      buttons.forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      renderEvents();
    });
  });
}

eventSearch?.addEventListener("input", renderEvents);
eventType?.addEventListener("change", renderEvents);

eventStatus?.addEventListener("change", () => {
  const buttons =
    document.querySelectorAll<HTMLButtonElement>("[data-status-filter]");

  buttons.forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.statusFilter === eventStatus.value
    );
  });

  renderEvents();
});

renderEvents();
initMobileStatusTabs();

document.body.classList.add("is-ready");