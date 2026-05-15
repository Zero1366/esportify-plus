import "../scss/index.scss";
import "../navigation";

import { hasRole, isAuthenticated } from "../session";

const playIcon = new URL("../../UI/Play.png", import.meta.url).href;
const pauseIcon = new URL("../../UI/Pause.png", import.meta.url).href;
const replayIcon = new URL("../../UI/Replay.png", import.meta.url).href;
const versusIcon = new URL("../../UI/vs.png", import.meta.url).href;

const novaTeamLogo = new URL(
  "../../LogoTeams/CardNovaSquad.png",
  import.meta.url
).href;

const pulseTeamLogo = new URL(
  "../../LogoTeams/RedPulseCard.png",
  import.meta.url
).href;

type TeamName = "Nova Squad" | "Red Pulse";

interface LiveStep {
  round: string;
  scoreA: number;
  scoreB: number;
  message: string;
}

interface AdminPlayer {
  id: number;
  username: string;
  team: TeamName;
  role: string;
  points: number;
  status: string;
}

const adminLivePanel =
  document.querySelector<HTMLElement>("#adminLivePanel");

let currentStep = 0;
let isLivePlaying = false;

const liveSteps: LiveStep[] = [
  {
    round: "Avant-match",
    scoreA: 0,
    scoreB: 0,
    message: "Connexion des équipes."
  },
  {
    round: "Round 1",
    scoreA: 1,
    scoreB: 0,
    message: "Nova Squad prend l'avantage."
  },
  {
    round: "Round 8",
    scoreA: 5,
    scoreB: 3,
    message: "Red Pulse revient."
  },
  {
    round: "Round 14",
    scoreA: 8,
    scoreB: 6,
    message: "Rythme élevé côté Red Pulse."
  },
  {
    round: "Round 18",
    scoreA: 10,
    scoreB: 9,
    message: "Action suspecte détectée."
  },
  {
    round: "Round 21",
    scoreA: 12,
    scoreB: 10,
    message: "Message agressif signalé."
  },
  {
    round: "Round 24",
    scoreA: 13,
    scoreB: 11,
    message: "Match terminé."
  }
];

const adminPlayers: AdminPlayer[] = [
  {
    id: 1,
    username: "Frost",
    team: "Nova Squad",
    role: "Capitaine",
    points: 0,
    status: "OK"
  },
  {
    id: 2,
    username: "Lynx",
    team: "Nova Squad",
    role: "Joueur",
    points: 0,
    status: "OK"
  },
  {
    id: 3,
    username: "Drift",
    team: "Nova Squad",
    role: "Joueur",
    points: 0,
    status: "OK"
  },
  {
    id: 4,
    username: "NovaK",
    team: "Nova Squad",
    role: "Joueur",
    points: 0,
    status: "OK"
  },
  {
    id: 5,
    username: "Stryke",
    team: "Nova Squad",
    role: "Joueur",
    points: 0,
    status: "OK"
  },
  {
    id: 6,
    username: "RazeX",
    team: "Red Pulse",
    role: "Joueur",
    points: 0,
    status: "OK"
  },
  {
    id: 7,
    username: "Venom",
    team: "Red Pulse",
    role: "Joueur",
    points: 0,
    status: "OK"
  },
  {
    id: 8,
    username: "Rift",
    team: "Red Pulse",
    role: "Capitaine",
    points: 0,
    status: "OK"
  },
  {
    id: 9,
    username: "Kairo",
    team: "Red Pulse",
    role: "Joueur",
    points: 0,
    status: "OK"
  },
  {
    id: 10,
    username: "Blaze",
    team: "Red Pulse",
    role: "Joueur",
    points: 0,
    status: "OK"
  }
];

function syncPlayersWithLiveStep(): void {
  adminPlayers.forEach((player) => {
    player.points = 0;
    player.status = "OK";
  });

  if (currentStep >= 1) {
    adminPlayers[0].points = 1;
  }

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
    adminPlayers[7].status = "À vérifier";
  }

  if (currentStep >= 5) {
    adminPlayers[8].points = 3;
    adminPlayers[8].status = "Surveillé";
  }

  if (currentStep >= 6) {
    adminPlayers[3].points = 3;
    adminPlayers[4].points = 5;
    adminPlayers[9].points = 1;
  }
}

function renderPlayerCell(player: AdminPlayer): string {
  const statusClass =
    player.status === "À vérifier"
      ? "is-danger"
      : player.status === "Surveillé"
        ? "is-warning"
        : "";

  return `
    <div class="admin-versus-player ${statusClass}">
      <button
        class="admin-player-trigger"
        type="button"
        disabled
      >
        <strong>${player.username}</strong>
        <span>${player.role} · ${player.points} pts · ${player.status}</span>
      </button>
    </div>
  `;
}

function renderVersusBoard(): string {
  const novaPlayers = adminPlayers.filter(
    (player) => player.team === "Nova Squad"
  );

  const pulsePlayers = adminPlayers.filter(
    (player) => player.team === "Red Pulse"
  );

  return `
    <section class="admin-versus-board">
      <header class="admin-versus-header">
        <div class="admin-versus-team admin-versus-team--nova">
          <img src="${novaTeamLogo}" alt="" aria-hidden="true" />
          <span>Nova Squad</span>
        </div>

        <strong class="admin-versus-emblem" aria-label="Versus">
          <img
            class="admin-versus-emblem__img"
            src="${versusIcon}"
            alt=""
            aria-hidden="true"
          />
        </strong>

        <div class="admin-versus-team admin-versus-team--pulse">
          <img src="${pulseTeamLogo}" alt="" aria-hidden="true" />
          <span>Red Pulse</span>
        </div>
      </header>

      <div class="admin-versus-list">
        ${novaPlayers
          .map((novaPlayer, index) => {
            const pulsePlayer = pulsePlayers[index];

            if (!pulsePlayer) return "";

            return `
              <div class="admin-versus-row">
                ${renderPlayerCell(novaPlayer)}
                <span class="admin-versus-row-separator"></span>
                ${renderPlayerCell(pulsePlayer)}
              </div>
            `;
          })
          .join("")}
      </div>
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

      <p class="organizer-summary">
        ${step.message}
      </p>

      <div class="replay-controls">
        <button
          class="replay-control-btn admin-live-play-btn ${
            isLivePlaying ? "is-active" : ""
          }"
          type="button"
          aria-label="Lire le live"
        >
          <img src="${playIcon}" alt="" aria-hidden="true" />
        </button>

        <button
          class="replay-control-btn admin-live-pause-btn ${
            !isLivePlaying ? "is-active" : ""
          }"
          type="button"
          aria-label="Mettre le live en pause"
        >
          <img src="${pauseIcon}" alt="" aria-hidden="true" />
        </button>

        <button
          class="replay-control-btn admin-live-restart-btn"
          type="button"
          aria-label="Réinitialiser le live"
        >
          <img src="${replayIcon}" alt="" aria-hidden="true" />
        </button>
      </div>
    </article>
  `;

  bindReplayControls();
}

function bindReplayControls(): void {
  const playButton = document.querySelector<HTMLElement>(
    ".admin-live-play-btn"
  );

  const pauseButton = document.querySelector<HTMLElement>(
    ".admin-live-pause-btn"
  );

  const restartButton = document.querySelector<HTMLElement>(
    ".admin-live-restart-btn"
  );

  playButton?.addEventListener("click", () => {
    isLivePlaying = true;

    if (currentStep < liveSteps.length - 1) {
      currentStep++;
    }

    renderLivePanel();
  });

  pauseButton?.addEventListener("click", () => {
    isLivePlaying = false;
    renderLivePanel();
  });

  restartButton?.addEventListener("click", () => {
    isLivePlaying = false;
    currentStep = 0;

    renderLivePanel();
  });
}

function protectPage(): void {
  if (!isAuthenticated() || !hasRole("admin")) {
    alert("Accès réservé aux administrateurs.");
    window.location.href = "/inscription.html";
  }
}

protectPage();

renderLivePanel();

document.body.classList.add("is-ready");