import "../navigation";

type ReplayAction = {
  time: string;
  text: string;
  scoreA: number;
  scoreB: number;
};

const REPLAY_INTERVAL = 1000;
const FINAL_SCORE = "13 - 11";

const actions: ReplayAction[] = [
  {
    time: "00:45",
    text: "Nova Squad ouvre le score.",
    scoreA: 1,
    scoreB: 0
  },
  {
    time: "01:30",
    text: "Red Pulse égalise.",
    scoreA: 1,
    scoreB: 1
  },
  {
    time: "02:20",
    text: "Nova Squad reprend l'avantage.",
    scoreA: 2,
    scoreB: 1
  },
  {
    time: "03:15",
    text: "Red Pulse revient dans le match.",
    scoreA: 2,
    scoreB: 2
  },
  {
    time: "04:00",
    text: "Nova Squad prend le contrôle.",
    scoreA: 8,
    scoreB: 6
  },
  {
    time: "05:30",
    text: "Red Pulse résiste jusqu'au bout.",
    scoreA: 12,
    scoreB: 11
  },
  {
    time: "06:10",
    text: "Nova Squad conclut la finale.",
    scoreA: 13,
    scoreB: 11
  }
];

function getRequiredElement<T extends HTMLElement>(
  selector: string
): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Élément introuvable : ${selector}`);
  }

  return element;
}

document.addEventListener("DOMContentLoaded", () => {
  const scoreAElement =
    getRequiredElement<HTMLElement>("#replayScoreA");

  const scoreBElement =
    getRequiredElement<HTMLElement>("#replayScoreB");

  const statusElement =
    getRequiredElement<HTMLElement>("#replayStatus");

  const feedElement =
    getRequiredElement<HTMLUListElement>("#replayFeed");

  const playButton =
    getRequiredElement<HTMLButtonElement>("#playReplayBtn");

  const pauseButton =
    getRequiredElement<HTMLButtonElement>("#pauseReplayBtn");

  const restartButton =
    getRequiredElement<HTMLButtonElement>("#restartReplayBtn");

  let actionIndex = 0;
  let replayTimer: number | undefined;

  function setActiveButton(
    activeButton?: HTMLButtonElement
  ): void {
    playButton.classList.remove("is-active");
    pauseButton.classList.remove("is-active");
    restartButton.classList.remove("is-active");

    activeButton?.classList.add("is-active");
  }

  function stopTimer(): void {
    if (replayTimer === undefined) {
      return;
    }

    window.clearInterval(replayTimer);
    replayTimer = undefined;
  }

  function updateButtons(): void {
    const isPlaying = replayTimer !== undefined;
    const isFinished = actionIndex >= actions.length;

    playButton.disabled = isPlaying || isFinished;
    pauseButton.disabled = !isPlaying;
  }

  function createFeedItem(text: string): HTMLLIElement {
    const item = document.createElement("li");
    item.textContent = text;

    return item;
  }

  function resetFeed(): void {
    const initialItem = createFeedItem(
      "00:00 · Le replay est prêt. Score : 0 - 0."
    );

    feedElement.replaceChildren(initialItem);
  }

  function updateReplay(action: ReplayAction): void {
    scoreAElement.textContent = String(action.scoreA);
    scoreBElement.textContent = String(action.scoreB);

    statusElement.textContent =
      `${action.time} · ${action.text}`;

    const item = createFeedItem(
      `${action.time} · ${action.text} ` +
      `Score : ${action.scoreA} - ${action.scoreB}.`
    );

    feedElement.prepend(item);
  }

  function finishReplay(): void {
    stopTimer();
    setActiveButton();

    statusElement.textContent =
      `Replay terminé · Score final ${FINAL_SCORE}`;

    updateButtons();
  }

  function pauseReplay(): void {
    stopTimer();
    setActiveButton(pauseButton);
    updateButtons();
  }

  function playReplay(): void {
    if (
      replayTimer !== undefined ||
      actionIndex >= actions.length
    ) {
      return;
    }

    setActiveButton(playButton);

    replayTimer = window.setInterval(() => {
      const currentAction = actions[actionIndex];

      if (!currentAction) {
        finishReplay();
        return;
      }

      updateReplay(currentAction);
      actionIndex += 1;

      if (actionIndex >= actions.length) {
        finishReplay();
        return;
      }

      updateButtons();
    }, REPLAY_INTERVAL);

    updateButtons();
  }

  function restartReplay(): void {
    stopTimer();
    actionIndex = 0;

    scoreAElement.textContent = "0";
    scoreBElement.textContent = "0";

    statusElement.textContent =
      "Replay prêt · Score initial 0 - 0";

    resetFeed();
    setActiveButton(restartButton);
    updateButtons();

    window.setTimeout(() => {
      restartButton.classList.remove("is-active");
    }, 180);
  }

  playButton.addEventListener("click", playReplay);
  pauseButton.addEventListener("click", pauseReplay);
  restartButton.addEventListener("click", restartReplay);

  window.addEventListener("pagehide", stopTimer);

  resetFeed();
  updateButtons();

  requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
  });
});