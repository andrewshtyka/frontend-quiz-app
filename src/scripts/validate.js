// check if user answer is correct
export function validateAnswer(
  userAnswer,
  correctAnswer,
  currentRadio,
  labels
) {
  labels.forEach((el) => {
    if (el.querySelector("[data-answer]").textContent === correctAnswer) {
      el.querySelector("[data-correct]").classList.remove("is-hidden");
    }
  });

  if (userAnswer === correctAnswer) {
    // icon
    currentRadio.querySelector("[data-incorrect]").classList.add("is-hidden");
    currentRadio.querySelector("[data-correct]").classList.remove("is-hidden");

    // styles
    currentRadio.className = "";
    currentRadio.classList.add("is-correct");

    return 1;
  } else {
    // icon
    currentRadio.querySelector("[data-correct]").classList.add("is-hidden");
    currentRadio
      .querySelector("[data-incorrect]")
      .classList.remove("is-hidden");

    // styles
    currentRadio.className = "";
    currentRadio.classList.add("is-incorrect");

    return 0;
  }
}

// remove validation styles
export function removeValidationStyles(labels) {
  labels.forEach((label) => {
    label.className = "";

    label.querySelector("[data-correct]").className = "";
    label.querySelector("[data-correct]").classList.add("is-hidden");

    label.querySelector("[data-incorrect]").className = "";
    label.querySelector("[data-incorrect]").classList.add("is-hidden");
  });
}
