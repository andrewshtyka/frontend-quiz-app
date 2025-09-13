// JS
import * as Header from "./header";
import * as Progress from "./progress-bar";
import * as ShowHide from "./show-hide-screen";
import * as Result from "./result";

// VARIABLES
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

const buttonSubmit = document.getElementById("button-submit");

const screenStart = document.getElementById("screen-start");
const screenQuiz = document.getElementById("screen-quiz");
const screenResult = document.getElementById("screen-result");

// FUNCTIONS

// get info about which topic was selected
export function handleTopicSelect(e) {
  const isInput =
    e.code === "Enter" || e.code === "Space" || e.type === "click";

  if (isInput) {
    transformData(e.target.id, e.target.textContent.trim());
    ShowHide.showOrHideScreen(screenStart, screenQuiz);
    ShowHide.showHeader();
  }
}

// get data from JSON
async function getData() {
  const request = new Request("/data.json");

  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// use data to change header and populate it in question / answers
async function transformData(topicID, topicName) {
  const dataArray = await getData();
  if (!dataArray) return;

  dataArray.quizzes.forEach((el) => {
    if (el.title === topicName) {
      Header.changeTopicIcon(el.icon, el);
      populateData(el, el.questions.length);
    }
  });
}

// populate data in question / answers
function populateData(data, amountQuestions) {
  let currentQ = 0;
  updateData(currentQ, data);

  buttonSubmit.addEventListener("click", () => {
    currentQ++;
    Result.updateScore(0, amountQuestions);

    if (currentQ < amountQuestions) {
      updateData(currentQ, data);
    } else {
      ShowHide.showOrHideScreen(screenQuiz, screenResult);
      currentQ = 0;
    }
  });

  // console.log(questionsArray[currentQ].options);
  // console.log(questionsArray[currentQ].answer);
  // console.log(questionsArray[currentQ]);
}

// update questions after submit
function updateData(currentQ, data) {
  const amountQuestions = data.questions.length;
  const questionsArray = data.questions;

  questionNumber.textContent = `Question ${currentQ + 1} of ${amountQuestions}`;
  Progress.progressBar(currentQ);
  questionText.textContent = questionsArray[currentQ].question;
  optionA.textContent = questionsArray[currentQ].options[0];
  optionB.textContent = questionsArray[currentQ].options[1];
  optionC.textContent = questionsArray[currentQ].options[2];
  optionD.textContent = questionsArray[currentQ].options[3];
}
