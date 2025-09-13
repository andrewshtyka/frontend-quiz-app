// update score value
export function updateScore(score, amount) {
  const scoreEl = document.querySelector("[data-score]");
  const amountEl = document.querySelector("[data-q-amount]");

  scoreEl.textContent = score;
  amountEl.textContent = `out of ${amount}`;
}
