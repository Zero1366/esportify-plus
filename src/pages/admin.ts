import "../scss/index.scss";
import "../navigation";

import { hasRole, isAuthenticated } from "../session";

const playIcon = new URL("../../UI/Play.png", import.meta.url).href;
const pauseIcon = new URL("../../UI/Pause.png", import.meta.url).href;
const replayIcon = new URL("../../UI/Replay.png", import.meta.url).href;

const novaTeamLogo = new URL("../../LogoTeams/NovaSquad.png", import.meta.url).href;
const pulseTeamLogo = new URL("../../LogoTeams/RedPulse.png", import.meta.url).href;

type PlayerStatus = "active" | "warned" | "suspended" | "banned";
type RiskLevel = "safe" | "medium" | "high";
type TeamName = "Nova Squad" | "Red Pulse";

interface AdminPlayer {
  id: number;
  username: string;
  team: TeamName;
  role: string;
  points: number;
  risk: RiskLevel;
  status: PlayerStatus;
}

interface LiveStep {
  round: string;
  scoreA: number;
  scoreB: number;
  message: string;
  incidentPlayerId: number | null;
}

const adminLivePanel = document.querySelector<HTMLElement>("#adminLivePanel");
const adminLastAction = document.querySelector<HTMLElement>("#adminLastAction");

const adminRequestsCount = document.querySelector<HTMLElement>("#adminRequestsCount");
const adminReportsCount = document.querySelector<HTMLElement>("#adminReportsCount");
const adminPlayersCount = document.querySelector<HTMLElement>("#adminPlayersCount");
const adminResolvedCount = document.querySelector<HTMLElement>("#adminResolvedCount");
const adminRequestsList = document.querySelector<HTMLElement>("#adminRequestsList");

let currentStep = 0;
let isLivePlaying = false;
let liveTimer: number | null = null;
let openedPlayerActionsId: number | null = null;

const ignoredIncidentPlayerIds = new Set<number>();

const liveSteps: LiveStep[] = [
  { round: "Avant-match", scoreA: 0, scoreB: 0, message: "Connexion des équipes.", incidentPlayerId: null },
  { round: "Round 1", scoreA: 1, scoreB: 0, message: "Nova Squad prend l'avantage.", incidentPlayerId: null },
  { round: "Round 8", scoreA: 5, scoreB: 3, message: "Red Pulse revient.", incidentPlayerId: null },
  { round: "Round 14", scoreA: 8, scoreB: 6, message: "Rythme élevé côté Red Pulse.", incidentPlayerId: null },
  { round: "Round 18", scoreA: 10, scoreB: 9, message: "Action suspecte détectée.", incidentPlayerId: 8 },
  { round: "Round 21", scoreA: 12, scoreB: 10, message: "Message agressif signalé.", incidentPlayerId: 9 },
  { round: "Round 24", scoreA: 13, scoreB: 11, message: "Match terminé.", incidentPlayerId: null }
];

const adminPlayers: AdminPlayer[] = [
  { id: 1, username: "Frost", team: "Nova Squad", role: "Capitaine", points: 0, risk: "safe", status: "active" },
  { id: 2, username: "Lynx", team: "Nova Squad", role: "Joueur", points: 0, risk: "safe", status: "active" },
  { id: 3, username: "Drift", team: "Nova Squad", role: "Joueur", points: 0, risk: "safe", status: "active" },
  { id: 4, username: "NovaK", team: "Nova Squad", role: "Joueur", points: 0, risk: "safe", status: "active" },
  { id: 5, username: "Stryke", team: "Nova Squad", role: "Joueur", points: 0, risk: "safe", status: "active" },
  { id: 6, username: "RazeX", team: "Red Pulse", role: "Joueur", points: 0, risk: "safe", status: "active" },
  { id: 7, username: "Venom", team: "Red Pulse", role: "Joueur", points: 0, risk: "safe", status: "active" },
  { id: 8, username: "Rift", team: "Red Pulse", role: "Capitaine", points: 0, risk: "safe", status: "active" },
  { id: 9, username: "Kairo", team: "Red Pulse", role: "Joueur", points: 0, risk: "safe", status: "active" },
  { id: 10, username: "Blaze", team: "Red Pulse", role: "Joueur", points: 0, risk: "safe", status: "active" }
];

function protectPage(): void {
  if (isAuthenticated() && hasRole("admin")) return;

  window.location.href = "/inscription.html";
}

function setLastAction(message: string): void {
  if (adminLastAction) {
    adminLastAction.textContent = `Dernière action : ${message}`;
  }
}

function stopLiveTimer(): void {
  if (liveTimer !== null) {
    window.clearInterval(liveTimer);
    liveTimer = null;
  }
}

function getRiskLabel(risk: RiskLevel): string {
  if (risk === "high") return "À vérifier";
  if (risk === "medium") return "Surveillé";
  return "OK";
}

function getStatusLabel(status: PlayerStatus): string {
  if (status === "warned") return "Averti";
  if (status === "suspended") return "Suspendu";
  if (status === "banned") return "Banni";
  return "Actif";
}

function syncPlayersWithLiveStep(): void {
  adminPlayers.forEach((player) => {
    player.points = 0;

    if (player.status === "active" && !ignoredIncidentPlayerIds.has(player.id)) {
      player.risk = "safe";
    }
  });

  if (currentStep >= 1) adminPlayers[0].points = 1;

  if (currentStep >= 2) {
    adminPlayers[1].points = 2;
    adminPlayers[5].points = 1;
    adminPlayers[7].points = 2;
  }

  if (currentStep >= 3) {
    adminPlayers[2].points = 2;
    adminPlayers[6].points = 2;
    adminPlayers[8].points = 1;
  }

  if (currentStep >= 4) {
    adminPlayers[7].points = 4;

    if (adminPlayers[7].status === "active" && !ignoredIncidentPlayerIds.has(8)) {
      adminPlayers[7].risk = "high";
    }
  }

  if (currentStep >= 5) {
    adminPlayers[8].points = 3;

    if (adminPlayers[8].status === "active" && !ignoredIncidentPlayerIds.has(9)) {
      adminPlayers[8].risk = "medium";
    }
  }

  if (currentStep >= 6) {
    adminPlayers[3].points = 3;
    adminPlayers[4].points = 5;
    adminPlayers[9].points = 1;
  }
}

function renderStats(): void {
  const pendingRequests = 1;
  const pendingReports = 2;
  const resolvedActions = adminPlayers.filter((player) => player.status !== "active").length;

  if (adminRequestsCount) adminRequestsCount.textContent = String(pendingRequests);
  if (adminReportsCount) adminReportsCount.textContent = String(pendingReports);
  if (adminPlayersCount) adminPlayersCount.textContent = String(adminPlayers.length);
  if (adminResolvedCount) adminResolvedCount.textContent = String(resolvedActions);
}

function renderRequestsList(): void {
  if (!adminRequestsList) return;

  adminRequestsList.innerHTML = `
    <article class="list-item admin-queue-item">
      <p class="eyebrow">Événement</p>
      <h3>Rocket League Cup</h3>
      <p>Rocket League · 2026-06-18</p>
      <span class="event-status event-status--pending">En attente</span>
    </article>

    <article class="list-item admin-queue-item">
      <p class="eyebrow">Signalement</p>
      <h3>Pseudo incorrect</h3>
      <p>Un joueur utilise un pseudo non conforme.</p>
      <span class="event-status event-status--pending">À vérifier</span>
    </article>

    <article class="list-item admin-queue-item">
      <p class="eyebrow">Signalement</p>
      <h3>Problème d'inscription</h3>
      <p>Une inscription semble bloquée sur un événement.</p>
      <span class="event-status event-status--pending">À vérifier</span>
    </article>
  `;
}

function renderPlayerActions(player: AdminPlayer): string {
  if (openedPlayerActionsId !== player.id || player.status === "banned") {
    return "";
  }

  return `
    <div class="admin-inline-actions">
      <button class="btn btn--ghost btn--small admin-player-ignore-btn" type="button" data-id="${player.id}">Ignorer</button>
      <button class="btn btn--ghost btn--small admin-player-warn-btn" type="button" data-id="${player.id}">Avertir</button>
      <button class="btn btn--ghost btn--small admin-player-suspend-btn" type="button" data-id="${player.id}">Suspendre</button>
      <button class="btn btn--ghost btn--small admin-player-ban-btn" type="button" data-id="${player.id}">Bannir</button>
    </div>
  `;
}

function renderPlayerCell(player: AdminPlayer): string {
  const canOpenActions = player.risk !== "safe" && player.status === "active";
  const selectedClass = openedPlayerActionsId === player.id ? "is-selected" : "";
  const riskClass =
    player.risk === "high"
      ? "is-danger"
      : player.risk === "medium"
        ? "is-warning"
        : "";

  return `
    <div class="admin-versus-player ${riskClass} ${selectedClass} ${canOpenActions ? "is-clickable" : ""}">
      <button
        class="admin-player-trigger"
        type="button"
        data-id="${player.id}"
        ${canOpenActions ? "" : "disabled"}
      >
        <strong>${player.username}</strong>
        <span>${player.role} · ${player.points} pts · ${getRiskLabel(player.risk)} · ${getStatusLabel(player.status)}</span>
      </button>

      ${renderPlayerActions(player)}
    </div>
  `;
}

function renderVersusBoard(): string {
  const novaPlayers = adminPlayers.filter((player) => player.team === "Nova Squad");
  const pulsePlayers = adminPlayers.filter((player) => player.team === "Red Pulse");

  return `
    <section class="admin-versus-board">
      <header class="admin-versus-header">
        <div class="admin-versus-team admin-versus-team--nova">
          <img src="${novaTeamLogo}" alt="" aria-hidden="true" />
          <span>Nova Squad</span>
        </div>

        <strong class="admin-versus-emblem" aria-label="Versus">VS</strong>

        <div class="admin-versus-team admin-versus-team--pulse">
          <img src="${pulseTeamLogo}" alt="" aria-hidden="true" />
          <span>Red Pulse</span>
        </div>
      </header>

      <div class="admin-versus-list">
        ${novaPlayers.map((novaPlayer, index) => {
          const pulsePlayer = pulsePlayers[index];

          if (!pulsePlayer) return "";

          return `
            <div class="admin-versus-row">
              ${renderPlayerCell(novaPlayer)}
              <span class="admin-versus-row-separator"></span>
              ${renderPlayerCell(pulsePlayer)}
            </div>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderLivePanel(): void {
  if (!adminLivePanel) return;

  syncPlayersWithLiveStep();

  const step = liveSteps[currentStep] ?? liveSteps[0];

  adminLivePanel.innerHTML = `
    <article class="admin-live-card admin-live-card--scoreboard">
      <header class="admin-live-header admin-live-header--compact">
        <div>
          <p class="eyebrow">Match surveillé</p>
          <h3>Valorant Night Clash</h3>
        </div>

        <span class="event-status event-status--pending">
          ${isLivePlaying ? "En direct" : "En pause"}
        </span>
      </header>

      ${renderVersusBoard()}

      <section class="admin-score-strip">
        <div>
          <span>Nova Squad</span>
          <strong>${step.scoreA}</strong>
        </div>

        <div class="admin-score-strip__center">
          <span>${step.round}</span>
          <strong>${step.scoreA} - ${step.scoreB}</strong>
          <small>Premier à 13 rounds</small>
        </div>

        <div>
          <span>Red Pulse</span>
          <strong>${step.scoreB}</strong>
        </div>
      </section>

      <p class="organizer-summary">${step.message}</p>

      <div class="replay-controls">
        <button class="replay-control-btn admin-live-play-btn ${isLivePlaying ? "is-active" : ""}" type="button" aria-label="Lire le live">
          <img src="${playIcon}" alt="" aria-hidden="true" />
        </button>

        <button class="replay-control-btn admin-live-pause-btn ${!isLivePlaying ? "is-active" : ""}" type="button" aria-label="Mettre le live en pause">
          <img src="${pauseIcon}" alt="" aria-hidden="true" />
        </button>

        <button class="replay-control-btn admin-live-restart-btn" type="button" aria-label="Réinitialiser le live">
          <img src="${replayIcon}" alt="" aria-hidden="true" />
        </button>
      </div>
    </article>
  `;
}

function advanceLiveStep(): void {
  if (currentStep >= liveSteps.length - 1) {
    stopLiveTimer();
    isLivePlaying = false;
    setLastAction("Match terminé.");
    renderLivePanel();
    return;
  }

  currentStep++;
  renderLivePanel();
}

function playLive(): void {
  if (liveTimer !== null) return;

  isLivePlaying = true;
  setLastAction("Live démarré.");
  renderLivePanel();

  liveTimer = window.setInterval(advanceLiveStep, 1800);
}

function pauseLive(): void {
  stopLiveTimer();
  isLivePlaying = false;
  setLastAction("Live mis en pause.");
  renderLivePanel();
}

function restartLive(): void {
  stopLiveTimer();

  currentStep = 0;
  isLivePlaying = false;
  openedPlayerActionsId = null;
  ignoredIncidentPlayerIds.clear();

  adminPlayers.forEach((player) => {
    player.points = 0;
    player.risk = "safe";
    player.status = "active";
  });

  setLastAction("Live réinitialisé.");
  renderStats();
  renderLivePanel();
}

function updatePlayerStatus(id: number, status: PlayerStatus): void {
  const player = adminPlayers.find((item) => item.id === id);

  if (!player) return;

  player.status = status;
  openedPlayerActionsId = null;

  if (status === "active") {
    player.risk = "safe";
    ignoredIncidentPlayerIds.add(player.id);
  }

  if (status === "warned") {
    player.risk = "medium";
  }

  if (status === "suspended" || status === "banned") {
    player.risk = "high";
  }

  setLastAction(`${player.username} : ${getStatusLabel(status)}.`);
  renderStats();
  renderLivePanel();
}

function initMobileTabs(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-mobile-view-button]");
  const panels = document.querySelectorAll<HTMLElement>("[data-mobile-view-panel]");

  if (buttons.length === 0 || panels.length === 0) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetView = button.dataset.mobileViewButton;

      buttons.forEach((item) => {
        item.classList.toggle("is-active", item.dataset.mobileViewButton === targetView);
      });

      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.mobileViewPanel === targetView);
      });

      if (targetView === "live") {
        renderLivePanel();
      }
    });
  });
}

function bindAdminActions(): void {
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) return;

    const playerTrigger = target.closest(".admin-player-trigger");

    if (playerTrigger instanceof HTMLElement) {
      const playerId = Number(playerTrigger.dataset.id);

      if (Number.isNaN(playerId)) return;

      openedPlayerActionsId = openedPlayerActionsId === playerId ? null : playerId;
      renderLivePanel();
      return;
    }

    if (target.closest(".admin-live-play-btn")) {
      playLive();
      return;
    }

    if (target.closest(".admin-live-pause-btn")) {
      pauseLive();
      return;
    }

    if (target.closest(".admin-live-restart-btn")) {
      restartLive();
      return;
    }

    const ignoreButton = target.closest(".admin-player-ignore-btn");

    if (ignoreButton instanceof HTMLElement) {
      const playerId = Number(ignoreButton.dataset.id);

      if (Number.isNaN(playerId)) return;

      updatePlayerStatus(playerId, "active");
      return;
    }

    const warnButton = target.closest(".admin-player-warn-btn");

    if (warnButton instanceof HTMLElement) {
      const playerId = Number(warnButton.dataset.id);

      if (Number.isNaN(playerId)) return;

      updatePlayerStatus(playerId, "warned");
      return;
    }


    const suspendButton = target.closest(".admin-player-suspend-btn");

    if (suspendButton instanceof HTMLElement) {
      const playerId = Number(suspendButton.dataset.id);

      if (Number.isNaN(playerId)) return;

      updatePlayerStatus(playerId, "suspended");
      return;
    }

    const banButton = target.closest(".admin-player-ban-btn");

    if (banButton instanceof HTMLElement) {
      const playerId = Number(banButton.dataset.id); 

      if (Number.isNaN(playerId)) return;

      updatePlayerStatus(playerId, "banned");
      return;
    }
    
  });
}

protectPage();
renderStats();
renderRequestsList();
renderLivePanel();
initMobileTabs();
bindAdminActions();

window.addEventListener("beforeunload", stopLiveTimer);

requestAnimationFrame(() => {
  document.body.classList.add("is-ready");
});