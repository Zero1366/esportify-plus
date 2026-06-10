import "../scss/index.scss";
import "../navigation";
const REPLAY_INTERVAL = 1000;
const FINAL_SCORE = "13 - 11";
const actions = [
    { time: "00:45", text: "Nova Squad ouvre le score.", scoreA: 1, scoreB: 0 },
    { time: "01:30", text: "Red Pulse égalise.", scoreA: 1, scoreB: 1 },
    { time: "02:20", text: "Nova Squad reprend l'avantage.", scoreA: 2, scoreB: 1 },
    { time: "03:15", text: "Red Pulse revient dans le match.", scoreA: 2, scoreB: 2 },
    { time: "04:00", text: "Nova Squad prend le contrôle.", scoreA: 8, scoreB: 6 },
    { time: "05:30", text: "Red Pulse résiste jusqu'au bout.", scoreA: 12, scoreB: 11 },
    { time: "06:10", text: "Nova Squad conclut la finale.", scoreA: 13, scoreB: 11 }
];
function getRequiredElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Élément introuvable : ${selector}`);
    }
    return element;
}
document.addEventListener("DOMContentLoaded", () => {
    const scoreAElement = getRequiredElement("#replayScoreA");
    const scoreBElement = getRequiredElement("#replayScoreB");
    const statusElement = getRequiredElement("#replayStatus");
    const feedElement = getRequiredElement("#replayFeed");
    const playButton = getRequiredElement("#playReplayBtn");
    const pauseButton = getRequiredElement("#pauseReplayBtn");
    const restartButton = getRequiredElement("#restartReplayBtn");
    let actionIndex = 0;
    let replayTimer;
    function setActiveButton(activeButton) {
        playButton.classList.remove("is-active");
        pauseButton.classList.remove("is-active");
        restartButton.classList.remove("is-active");
        activeButton?.classList.add("is-active");
    }
    function stopTimer() {
        if (replayTimer === undefined)
            return;
        window.clearInterval(replayTimer);
        replayTimer = undefined;
    }
    function updateButtons() {
        const isPlaying = replayTimer !== undefined;
        const isFinished = actionIndex >= actions.length;
        playButton.disabled = isPlaying || isFinished;
        pauseButton.disabled = !isPlaying;
    }
    function updateReplay(action) {
        scoreAElement.textContent = String(action.scoreA);
        scoreBElement.textContent = String(action.scoreB);
        statusElement.textContent = `${action.time} · ${action.text}`;
        const item = document.createElement("li");
        item.textContent = `${action.time} · ${action.text} Score : ${action.scoreA} - ${action.scoreB}.`;
        feedElement.prepend(item);
    }
    function finishReplay() {
        stopTimer();
        setActiveButton();
        statusElement.textContent = `Replay terminé · Score final ${FINAL_SCORE}`;
        updateButtons();
    }
    function pauseReplay() {
        stopTimer();
        setActiveButton(pauseButton);
        updateButtons();
    }
    function playReplay() {
        if (replayTimer !== undefined || actionIndex >= actions.length)
            return;
        setActiveButton(playButton);
        replayTimer = window.setInterval(() => {
            const currentAction = actions[actionIndex];
            if (!currentAction) {
                finishReplay();
                return;
            }
            updateReplay(currentAction);
            actionIndex += 1;
            updateButtons();
        }, REPLAY_INTERVAL);
        updateButtons();
    }
    function restartReplay() {
        stopTimer();
        actionIndex = 0;
        scoreAElement.textContent = "0";
        scoreBElement.textContent = "0";
        statusElement.textContent = "Replay prêt · Score initial 0 - 0";
        feedElement.innerHTML = "<li>00:00 · Le replay est prêt. Score : 0 - 0.</li>";
        setActiveButton(restartButton);
        updateButtons();
        window.setTimeout(() => {
            restartButton.classList.remove("is-active");
        }, 180);
    }
    playButton.addEventListener("click", playReplay);
    pauseButton.addEventListener("click", pauseReplay);
    restartButton.addEventListener("click", restartReplay);
    updateButtons();
    document.body.classList.add("is-ready");
});
