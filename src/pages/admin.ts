import "../scss/index.scss";
import "../navigation";

import { eventsData, reportsData } from "../data";
import { hasRole, isAuthenticated } from "../session";

type PlayerStatus = "active" | "warned" | "suspended" | "banned";
type ReportStatus = "open" | "closed";
type RequestStatus = "pending" | "validated" | "refused";
type RiskLevel = "safe" | "medium" | "high";
type TeamName = "Nova Squad" | "Red Pulse";

interface AdminRequest {
  id: number;
  title: string;
  game: string;
  date: string;
  status: RequestStatus;
}

interface AdminReport {
  id: number;
  title: string;
  message: string;
  status: ReportStatus;
}

interface AdminPlayer {
  id: number;
  username: string;
  team: TeamName;
  role: string;
  points: number;
  risk: RiskLevel;
  incident: string;
  status: PlayerStatus;
}

interface LiveStep {
  round: string;
  scoreA: number;
  scoreB: number;
  message: string;
  incident: string;
  incidentPlayerId: number | null;
}

const adminRequestsCount = document.querySelector<HTMLElement>("#adminRequestsCount");
const adminReportsCount = document.querySelector<HTMLElement>("#adminReportsCount");
const adminPlayersCount = document.querySelector<HTMLElement>("#adminPlayersCount");
const adminResolvedCount = document.querySelector<HTMLElement>("#adminResolvedCount");
const adminRequestsList = document.querySelector<HTMLElement>("#adminRequestsList");
const adminLivePanel = document.querySelector<HTMLElement>("#adminLivePanel");
const adminLastAction = document.querySelector<HTMLElement>("#adminLastAction");
const toastContainer = document.querySelector<HTMLElement>("#toastContainer");

let currentStep = 0;
let isLivePlaying = false;
let liveInterval: number | null = null;
let activeIncidentPlayerId: number | null = null;
let openedPlayerActionsId: number | null = null;
let isMatchReported = false;

const ignoredIncidentPlayerIds = new Set<number>();
const liveLog: string[] = ["Surveillance activée."];

const liveSteps: LiveStep[] = [
  { round: "Avant-match", scoreA: 0, scoreB: 0, message: "Connexion des équipes.", incident: "Aucun incident.", incidentPlayerId: null },
  { round: "Round 1", scoreA: 1, scoreB: 0, message: "Nova Squad prend l'avantage.", incident: "Aucun incident.", incidentPlayerId: null },
  { round: "Round 8", scoreA: 5, scoreB: 3, message: "Red Pulse revient.", incident: "Surveillance normale.", incidentPlayerId: null },
  { round: "Round 14", scoreA: 8, scoreB: 6, message: "Rythme élevé côté Red Pulse.", incident: "Indice faible détecté.", incidentPlayerId: null },
  { round: "Round 18", scoreA: 10, scoreB: 9, message: "Action suspecte détectée.", incident: "Rift à vérifier.", incidentPlayerId: 8 },
  { round: "Round 21", scoreA: 12, scoreB: 10, message: "Message agressif signalé.", incident: "Kairo à vérifier.", incidentPlayerId: 9 },
  { round: "Round 24", scoreA: 13, scoreB: 11, message: "Match terminé.", incident: "Validation possible.", incidentPlayerId: null }
];

const adminRequests: AdminRequest[] = eventsData
  .filter((event) => event.status === "pending")
  .slice(0, 1)
  .map((event) => ({
    id: event.id,
    title: event.title,
    game: event.game,
    date: event.date,
    status: "pending"
  }));

const adminReports: AdminReport[] = reportsData.slice(0, 2).map((report) => ({
  id: report.id,
  title: report.title,
  message: report.message,
  status: report.status === "closed" ? "closed" : "open"
}));

const adminPlayers: AdminPlayer[] = [
  { id: 1, username: "Frost", team: "Nova Squad", role: "Capitaine", points: 0, risk: "safe", incident: "Aucun incident.", status: "active" },
  { id: 2, username: "Lynx", team: "Nova Squad", role: "Joueur", points: 0, risk: "safe", incident: "Aucun incident.", status: "active" },
  { id: 3, username: "Drift", team: "Nova Squad", role: "Joueur", points: 0, risk: "safe", incident: "Aucun incident.", status: "active" },
  { id: 4, username: "NovaK", team: "Nova Squad", role: "Joueur", points: 0, risk: "safe", incident: "Aucun incident.", status: "active" },
  { id: 5, username: "Stryke", team: "Nova Squad", role: "Joueur", points: 0, risk: "safe", incident: "Aucun incident.", status: "active" },
  { id: 6, username: "RazeX", team: "Red Pulse", role: "Joueur", points: 0, risk: "safe", incident: "Aucun incident.", status: "active" },
  { id: 7, username: "Venom", team: "Red Pulse", role: "Joueur", points: 0, risk: "safe", incident: "Aucun incident.", status: "active" },
  { id: 8, username: "Rift", team: "Red Pulse", role: "Capitaine", points: 0, risk: "safe", incident: "Aucun incident.", status: "active" },
  { id: 9, username: "Kairo", team: "Red Pulse", role: "Joueur", points: 0, risk: "safe", incident: "Aucun incident.", status: "active" },
  { id: 10, username: "Blaze", team: "Red Pulse", role: "Joueur", points: 0, risk: "safe", incident: "Aucun incident.", status: "active" }
];

function protectPage(): void {
  if (!isAuthenticated() || !hasRole("admin")) {
    alert("Accès réservé aux administrateurs.");
    window.location.href = "/inscription.html";
  }
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

function setLastAction(message: string): void {
  if (!adminLastAction) return;
  adminLastAction.textContent = `Dernière action : ${message}`;
}

function addLiveLog(message: string): void {
  liveLog.unshift(message);

  if (liveLog.length > 5) {
    liveLog.pop();
  }
}

function getRiskLabel(risk: RiskLevel): string {
  if (risk === "high") return "Alerte";
  if (risk === "medium") return "Surveillé";
  return "OK";
}

function getPlayerStatusLabel(status: PlayerStatus): string {
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
      player.incident = "Aucun incident.";
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

    const rift = adminPlayers.find((player) => player.id === 8);

    if (rift && rift.status === "active" && !ignoredIncidentPlayerIds.has(rift.id)) {
      rift.risk = "high";
      rift.incident = "Action suspecte au round 18.";
    }
  }

  if (currentStep >= 5) {
    adminPlayers[8].points = 3;

    const kairo = adminPlayers.find((player) => player.id === 9);

    if (kairo && kairo.status === "active" && !ignoredIncidentPlayerIds.has(kairo.id)) {
      kairo.risk = "medium";
      kairo.incident = "Message agressif signalé.";
    }
  }

  if (currentStep >= 6) {
    adminPlayers[3].points = 3;
    adminPlayers[4].points = 5;
    adminPlayers[9].points = 1;
  }
}

function renderStats(): void {
  const resolvedActions =
    adminRequests.filter((request) => request.status !== "pending").length +
    adminReports.filter((report) => report.status === "closed").length +
    adminPlayers.filter((player) => player.status !== "active").length;

  if (adminRequestsCount) adminRequestsCount.textContent = String(adminRequests.filter((item) => item.status === "pending").length);
  if (adminReportsCount) adminReportsCount.textContent = String(adminReports.filter((item) => item.status === "open").length);
  if (adminPlayersCount) adminPlayersCount.textContent = String(adminPlayers.length);
  if (adminResolvedCount) adminResolvedCount.textContent = String(resolvedActions);
}

function renderModerationQueue(): void {
  if (!adminRequestsList) return;

  adminRequestsList.innerHTML = [
    ...adminRequests.map((request) => `
      <article class="list-item admin-queue-item">
        <p class="eyebrow">Événement</p>
        <h3>${request.title}</h3>
        <p>${request.game} · ${request.date}</p>
        <span class="event-status event-status--${request.status}">
          ${request.status === "pending" ? "En attente" : request.status === "validated" ? "Validé" : "Renvoyé"}
        </span>
      </article>
    `),
    ...adminReports.map((report) => `
      <article class="list-item admin-queue-item">
        <p class="eyebrow">Signalement</p>
        <h3>${report.title}</h3>
        <p>${report.message}</p>
        <span class="event-status event-status--${report.status === "closed" ? "validated" : "pending"}">
          ${report.status === "closed" ? "Résolu" : "À vérifier"}
        </span>
      </article>
    `)
  ].join("");
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
      <button class="btn btn--ghost btn--small admin-match-report-btn" type="button">Reporter match</button>
    </div>
  `;
}

function renderPlayerCell(player: AdminPlayer): string {
  const canOpenActions = player.risk !== "safe" && player.status === "active";
  const selectedClass = openedPlayerActionsId === player.id ? "is-selected" : "";
  const riskClass = player.risk === "high" ? "is-danger" : player.risk === "medium" ? "is-warning" : "";

  return `
    <div class="admin-versus-player ${riskClass} ${selectedClass} ${canOpenActions ? "is-clickable" : ""}">
      <button
        class="admin-player-trigger"
        type="button"
        data-id="${player.id}"
        ${canOpenActions ? "" : "disabled"}
      >
        <strong>${player.username}</strong>
        <span>${player.role} · ${player.points} pts · ${getRiskLabel(player.risk)}</span>
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
          <img src="/LogoTeams/CardNovaSquad.png" alt="" aria-hidden="true" />
          <span>Nova Squad</span>
        </div>

        <strong class="admin-versus-emblem" aria-label="Versus">
          <img
            class="admin-versus-emblem__img"
            src="/UI/vs.png"
            alt=""
            aria-hidden="true"
          />
        </strong>

        <div class="admin-versus-team admin-versus-team--pulse">
          <img src="/LogoTeams/RedPulseCard.png" alt="" aria-hidden="true" />
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

function renderLiveLog(): string {
  return `
    <section class="admin-live-log-panel">
      <header class="admin-scoreboard-header">
        <h3>Journal admin</h3>
        <span>${liveSteps[currentStep].round}</span>
      </header>

      <ul class="admin-flux-log">
        ${liveLog.map((entry) => `
          <li class="${entry.includes("ALERTE") ? "is-alert" : ""}">
            ${entry}
          </li>
        `).join("")}
      </ul>
    </section>
  `;
}

function renderLivePanel(): void {
  if (!adminLivePanel) return;

  syncPlayersWithLiveStep();

  const step = liveSteps[currentStep];

  adminLivePanel.innerHTML = `
    <article class="admin-live-card admin-live-card--scoreboard">
      <header class="admin-live-header admin-live-header--compact">
        <div>
          <p class="eyebrow">Match surveillé</p>
          <h3>Valorant Night Clash</h3>
        </div>

        <span class="event-status event-status--pending">
          ${isLivePlaying ? "En direct" : isMatchReported ? "Reporté" : "En pause"}
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

      <div class="replay-controls">
        <button class="replay-control-btn admin-live-play-btn ${isLivePlaying ? "is-active" : ""}" type="button" aria-label="Lire le live">
          <img src="/UI/play.png" alt="" aria-hidden="true" />
        </button>

        <button class="replay-control-btn admin-live-pause-btn ${!isLivePlaying ? "is-active" : ""}" type="button" aria-label="Mettre le live en pause">
          <img src="/UI/pause.png" alt="" aria-hidden="true" />
        </button>

        <button class="replay-control-btn admin-live-restart-btn" type="button" aria-label="Réinitialiser le live">
          <img src="/UI/replay.png" alt="" aria-hidden="true" />
        </button>
      </div>

      ${renderLiveLog()}
    </article>
  `;
}

function pauseLive(): void {
  isLivePlaying = false;

  if (liveInterval !== null) {
    window.clearInterval(liveInterval);
    liveInterval = null;
  }

  renderLivePanel();
}

function advanceLive(): void {
  if (currentStep >= liveSteps.length - 1) {
    pauseLive();
    setLastAction("Live terminé.");
    showToast("Live terminé.");
    return;
  }

  currentStep++;

  const step = liveSteps[currentStep];

  addLiveLog(`${step.round} · ${step.message}`);

  if (step.incidentPlayerId !== null && !ignoredIncidentPlayerIds.has(step.incidentPlayerId)) {
    activeIncidentPlayerId = step.incidentPlayerId;
    openedPlayerActionsId = null;

    const player = adminPlayers.find((item) => item.id === step.incidentPlayerId);

    if (player) {
      addLiveLog(`ALERTE · ${player.username} · ${step.incident}`);
      pauseLive();
      setLastAction(`Contrôle requis : ${player.username}.`);
      showToast("Incident détecté.");
      return;
    }
  }

  renderLivePanel();
}

function playLive(): void {
  if (isLivePlaying || isMatchReported) return;

  if (activeIncidentPlayerId !== null) {
    showToast("Traitez l'incident avant de reprendre.");
    return;
  }

  isLivePlaying = true;
  renderLivePanel();

  setLastAction("Live démarré.");
  showToast("Live démarré.");

  liveInterval = window.setInterval(advanceLive, 2500);
}

function restartLive(): void {
  pauseLive();

  currentStep = 0;
  activeIncidentPlayerId = null;
  openedPlayerActionsId = null;
  isMatchReported = false;

  ignoredIncidentPlayerIds.clear();
  liveLog.splice(0, liveLog.length, "Surveillance activée.");

  adminPlayers.forEach((player) => {
    player.points = 0;
    player.risk = "safe";
    player.incident = "Aucun incident.";
    player.status = "active";
  });

  renderStats();
  renderLivePanel();
  setLastAction("Live réinitialisé.");
  showToast("Live réinitialisé.");
}

function updatePlayerStatus(id: number, status: PlayerStatus): void {
  const player = adminPlayers.find((item) => item.id === id);
  if (!player) return;

  player.status = status;
  activeIncidentPlayerId = null;
  openedPlayerActionsId = null;

  if (status === "active") {
    player.risk = "safe";
    player.incident = "Incident ignoré.";
    ignoredIncidentPlayerIds.add(player.id);
  }

  if (status === "warned") {
    player.risk = "medium";
    player.incident = "Avertissement appliqué.";
  }

  if (status === "suspended") {
    player.risk = "high";
    player.incident = "Suspension appliquée.";
  }

  if (status === "banned") {
    player.risk = "high";
    player.incident = "Bannissement appliqué.";
  }

  const message = `${player.username} : ${getPlayerStatusLabel(status)}.`;

  addLiveLog(message);
  renderStats();
  renderLivePanel();
  setLastAction(message);
  showToast(message);
}

function reportMatch(): void {
  pauseLive();

  isMatchReported = true;
  activeIncidentPlayerId = null;
  openedPlayerActionsId = null;

  addLiveLog("ALERTE · Match reporté.");
  renderLivePanel();
  setLastAction("Match reporté.");
  showToast("Match reporté.");
}

function initAdminActions(): void {
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) return;

    const playerTrigger = target.closest(".admin-player-trigger");

    if (playerTrigger instanceof HTMLElement) {
      const playerId = Number(playerTrigger.dataset.id);
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
      setLastAction("Live mis en pause.");
      showToast("Live mis en pause.");
      return;
    }

    if (target.closest(".admin-live-restart-btn")) {
      restartLive();
      return;
    }

    const ignoreButton = target.closest(".admin-player-ignore-btn");
    if (ignoreButton instanceof HTMLElement) {
      updatePlayerStatus(Number(ignoreButton.dataset.id), "active");
      return;
    }

    const warnButton = target.closest(".admin-player-warn-btn");
    if (warnButton instanceof HTMLElement) {
      updatePlayerStatus(Number(warnButton.dataset.id), "warned");
      return;
    }

    const suspendButton = target.closest(".admin-player-suspend-btn");
    if (suspendButton instanceof HTMLElement) {
      updatePlayerStatus(Number(suspendButton.dataset.id), "suspended");
      return;
    }

    const banButton = target.closest(".admin-player-ban-btn");
    if (banButton instanceof HTMLElement) {
      updatePlayerStatus(Number(banButton.dataset.id), "banned");
      return;
    }

    if (target.closest(".admin-match-report-btn")) {
      reportMatch();
    }
  });
}

function initMobileViewTabs(): void {
  const buttons = document.querySelectorAll<HTMLElement>("[data-mobile-view-button]");
  const panels = document.querySelectorAll<HTMLElement>("[data-mobile-view-panel]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetView = button.dataset.mobileViewButton;

      buttons.forEach((item) => {
        item.classList.toggle("is-active", item.dataset.mobileViewButton === targetView);
      });

      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.mobileViewPanel === targetView);
      });

      renderLivePanel();
    });
  });
}

protectPage();
renderStats();
renderModerationQueue();
renderLivePanel();
initAdminActions();
initMobileViewTabs();

document.body.classList.add("is-ready");