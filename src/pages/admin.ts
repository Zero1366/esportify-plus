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

interface LiveStep {
  round: string;
  scoreA: number;
  scoreB: number;
  message: string;
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

function renderVersusBoard(): string {
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
    </section>
  `;
}

function renderLivePanel(): void {
  if (!adminLivePanel) return;

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