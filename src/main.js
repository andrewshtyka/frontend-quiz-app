// CSS
import "./styles/variables.css";
import "./styles/fonts.css";
import "./styles/header.css";
import "./styles/screen-start.css";
import "./styles/screen-quiz.css";
import "./styles/screen-result.css";

// ================================================================================
//
// JS
import * as Mode from "./scripts/dark-light-mode";
import * as Populate from "./scripts/populate-data";
import * as ShowHide from "./scripts/show-hide-screen";
import * as Result from "./scripts/result";
import * as Progress from "./scripts/progress-bar";
import * as Animate from "./scripts/anim-screen-start";

// ================================================================================
//
// VARIABLES
const btnsQuizList = document
  .getElementById("btns-quiz")
  .querySelectorAll("button");

const btnRestart = document.getElementById("button-restart");
const screenStart = document.getElementById("screen-start");
const screenResult = document.getElementById("screen-result");

const questionNumber = document
  .getElementById("screen-quiz")
  .querySelector("[data-number]");

const questionText = document
  .getElementById("screen-quiz")
  .querySelector("[data-question]");

const optionA = document
  .querySelector("[for='option-a']")
  .querySelector("[data-answer]");

const optionB = document
  .querySelector("[for='option-b']")
  .querySelector("[data-answer]");

const optionC = document
  .querySelector("[for='option-c']")
  .querySelector("[data-answer]");

const optionD = document
  .querySelector("[for='option-d']")
  .querySelector("[data-answer]");

const userMode = JSON.parse(localStorage.getItem("darkMode")) || "";
const savedData = JSON.parse(localStorage.getItem("data") || "{}");

// ================================================================================
//
// FUNCTIONS

window.addEventListener("load", () => {
  document.fonts.ready.then(() => {
    // dark-light mode switcher
    Mode.toggleMode(userMode);

    // load mode from local storage
    Mode.getMode(userMode);

    // check if local storage with questions has saved topic
    // if (savedData.topic) {
    //   Populate.restoreQuiz(savedData);
    // }

    // animate start screen on load
    Animate.animStartScreen();

    // choose topic
    btnsQuizList.forEach((btn) => {
      btn.addEventListener("click", Populate.handleTopicSelect);
      btn.addEventListener("keydown", Populate.handleTopicSelect);
    });

    // restart
    btnRestart.addEventListener("click", resetAll);
  });
});

// reset all data (for clean restart)
function resetAll() {
  Result.updateScore(0, 0);

  questionNumber.textContent = "";
  Progress.progressBar(0);
  questionText.textContent = "";
  optionA.textContent = "";
  optionB.textContent = "";
  optionC.textContent = "";
  optionD.textContent = "";

  ShowHide.showOrHideScreen(screenResult, screenStart);
  ShowHide.hideHeader();

  Populate.resetQuiz();
  localStorage.removeItem("data");
  Animate.animStartScreen();
}
