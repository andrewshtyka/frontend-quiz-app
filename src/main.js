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
import * as Result from "./scripts/result";
import * as Progress from "./scripts/progress-bar";
import * as AnimateOnLoad from "./scripts/anim-screen-start";
import * as AnimateButtons from "./scripts/anim-buttons";
import * as AnimateStartScreen from "./scripts/anim-screen-quiz";
import * as AnimateRadios from "./scripts/anim-radios";

// ================================================================================
//
// VARIABLES
const btnsQuizList = document
  .getElementById("btns-quiz")
  .querySelectorAll("button");

const btnRestart = document.getElementById("button-restart");
const screenStart = document.getElementById("screen-start");
const screenResult = document.getElementById("screen-result");
const buttonSubmit = document.getElementById("button-submit");

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

const radiosAll = document.getElementById("radios").querySelectorAll("label");

const userMode = JSON.parse(localStorage.getItem("darkMode")) || "";
const savedData = JSON.parse(localStorage.getItem("data") || "{}");

const mw1024 = window.matchMedia("(min-width: 1024px)");

// ================================================================================
//
// FUNCTIONS
window.addEventListener("load", () => {
  document.fonts.ready.then(() => {
    resetAll();

    // dark-light mode switcher
    Mode.toggleMode(userMode);

    // load mode from local storage
    Mode.getMode(userMode);

    // check if local storage with questions has saved topic
    // if (savedData.topic) {
    //   Populate.restoreQuiz(savedData);
    // }

    AnimateOnLoad.animStartScreen();

    // ============================================================
    //
    // START SCREEN BTNS
    if (mw1024.matches) {
      btnsQuizList.forEach((btn) => {
        btn.addEventListener("mouseenter", AnimateButtons.animStartButtons);
        btn.addEventListener("mouseleave", AnimateButtons.animStartButtons);
      });
    }

    mw1024.addEventListener("change", (e) => {
      if (e.matches) {
        btnsQuizList.forEach((btn) => {
          btn.addEventListener("mouseenter", AnimateButtons.animStartButtons);
          btn.addEventListener("mouseleave", AnimateButtons.animStartButtons);
        });
      } else {
        btnsQuizList.forEach((btn) => {
          btn.removeEventListener(
            "mouseenter",
            AnimateButtons.animStartButtons
          );
          btn.removeEventListener(
            "mouseleave",
            AnimateButtons.animStartButtons
          );
        });
      }
    });

    btnsQuizList.forEach((btn) => {
      btn.addEventListener("focus", AnimateButtons.animStartButtons);
      btn.addEventListener("blur", AnimateButtons.animStartButtons);

      btn.addEventListener("click", Populate.handleTopicSelect);
      btn.addEventListener("keydown", Populate.handleTopicSelect);
    });

    // ============================================================
    //
    // QUIZ RADIOS
    if (mw1024.matches) {
      radiosAll.forEach((radio) => {
        radio.addEventListener("mouseenter", AnimateRadios.animRadios);
        radio.addEventListener("mouseleave", AnimateRadios.animRadios);
      });
    }

    mw1024.addEventListener("change", (e) => {
      if (e.matches) {
        radiosAll.forEach((radio) => {
          radio.addEventListener("mouseenter", AnimateRadios.animRadios);
          radio.addEventListener("mouseleave", AnimateRadios.animRadios);
        });
      } else {
        radiosAll.forEach((radio) => {
          radio.removeEventListener("mouseenter", AnimateRadios.animRadios);
          radio.removeEventListener("mouseleave", AnimateRadios.animRadios);
        });
      }
    });

    radiosAll.forEach((radio) => {
      radio.addEventListener("focus", AnimateRadios.animRadios);
      radio.addEventListener("blur", AnimateRadios.animRadios);
    });



    // ============================================================
    //
    // RESULT SCREEN BTN
    btnRestart.addEventListener("click", (e) => {
      AnimateStartScreen.animHideHeader();
      AnimateStartScreen.animHideShowScreen(screenResult, screenStart);
    });
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

  Populate.resetQuiz();

  localStorage.removeItem("data");
}
