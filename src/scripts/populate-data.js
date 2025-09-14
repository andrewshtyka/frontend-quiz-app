import * as Header from "./header";
import * as Progress from "./progress-bar";
import * as ShowHide from "./show-hide-screen";
import * as Result from "./result";
import * as Radio from "./radio";
import * as Validate from "./validate";

// ================================================================================
//
// VARIABLES
const errorMessage = document.getElementById("error-answer");
const questionNumber = document.querySelector("#screen-quiz [data-number]");
const questionText = document.querySelector("#screen-quiz [data-question]");
const optionA = document.querySelector("[for='option-a'] [data-answer]");
const optionB = document.querySelector("[for='option-b'] [data-answer]");
const optionC = document.querySelector("[for='option-c'] [data-answer]");
const optionD = document.querySelector("[for='option-d'] [data-answer]");
const buttonSubmit = document.getElementById("button-submit");
const screenStart = document.getElementById("screen-start");
const screenQuiz = document.getElementById("screen-quiz");
const screenResult = document.getElementById("screen-result");

const radios = document.querySelectorAll(
  'input[type="radio"][name="option-answer"]'
);
const labels = document.querySelectorAll("#radios label[for]");

// ================================================================================
//
// STATE
let userAnswer = null;
let isChecked = false;
let userScore = 0;
let isCorrect = 0;
let currentQ = 0;
let currentData = null;
let amountQuestions = 0;
let currentRadio = null;

// ================================================================================
//
// RADIOS
labels.forEach((label) => {
  label.addEventListener("click", (e) => {
    e.preventDefault();
    currentRadio = e.currentTarget;
    isChecked = Radio.radioCheck(label, radios);
    userAnswer = label.querySelector("[data-answer]").textContent;
    errorMessage.classList.add("is-hidden");
  });

  label.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.code === "Space") {
      e.preventDefault();
      currentRadio = e.currentTarget;
      isChecked = Radio.radioCheck(label, radios);
      userAnswer = label.querySelector("[data-answer]").textContent;
      errorMessage.classList.add("is-hidden");
    }
  });
});

// ================================================================================
//
// SUBMIT
let isSubmitted = false;
buttonSubmit.addEventListener("click", () => {
  if (!isSubmitted) {
    submitCheck(isChecked);
  } else {
    nextQuestion();
  }
});

// submit button logic
function submitCheck(status) {
  if (!status) {
    errorMessage.classList.remove("is-hidden");
    return;
  }

  isSubmitted = true;
  if (amountQuestions - currentQ === 1) {
    buttonSubmit.textContent = "Show Result";
  } else {
    buttonSubmit.textContent = "Next Question";
  }

  isCorrect = Validate.validateAnswer(
    userAnswer,
    currentData.questions[currentQ].answer,
    currentRadio,
    labels
  );
  userScore += isCorrect;
  Result.updateScore(userScore, amountQuestions);

  radioBlock();
}

// next question button logic
function nextQuestion() {
  currentQ++;

  Validate.removeValidationStyles(labels);
  buttonSubmit.blur();
  radioUnblock();

  if (currentQ < amountQuestions) {
    updateData(currentQ);
    Radio.resetRadios(radios);
    userAnswer = null;
    isChecked = false;
    isSubmitted = false;
    buttonSubmit.textContent = "Submit Answer";
  } else {
    ShowHide.showOrHideScreen(screenQuiz, screenResult);
    Radio.resetRadios(radios);
    currentQ = 0;
    userAnswer = null;
    isChecked = false;
    isSubmitted = false;
    buttonSubmit.textContent = "Submit Answer";
  }
}

// ================================================================================
//
// TOPIC SELECT
export function handleTopicSelect(e) {
  const isInput =
    e.type === "click" || e.code === "Enter" || e.code === "Space";
  if (!isInput) return;

  const topicName = e.currentTarget.textContent.trim();
  loadTopic(topicName);
}

// ================================================================================
//
// LOAD TOPIC
async function loadTopic(topicName) {
  const dataArray = await getData();
  if (!dataArray) return;

  const quiz = dataArray.quizzes.find((q) => q.title === topicName);
  if (!quiz) return;

  currentData = quiz;
  amountQuestions = quiz.questions.length;

  Header.changeTopicIcon(quiz.icon, quiz);
  updateData(currentQ);

  ShowHide.showOrHideScreen(screenStart, screenQuiz);
  ShowHide.showHeader();
}

// ================================================================================
//
// UPDATE QUESTION
function updateData(index) {
  /*
    add userScore and currentQ to local storage
  */

  console.log(`userScore is: ${userScore}`);
  console.log(`currentQ is: ${currentQ}`);

  const q = currentData.questions[index];

  questionNumber.textContent = `Question ${index + 1} of ${amountQuestions}`;
  Progress.progressBar(index);
  questionText.textContent = q.question;
  optionA.textContent = q.options[0];
  optionB.textContent = q.options[1];
  optionC.textContent = q.options[2];
  optionD.textContent = q.options[3];

  isChecked = false;
}

// ================================================================================
//
// FETCH DATA
async function getData() {
  try {
    const response = await fetch("/data.json");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

// ================================================================================
//
// RESET QUIZ STATE
export function resetQuiz() {
  userAnswer = null;
  isChecked = false;
  userScore = 0;
  currentQ = 0;
  errorMessage.classList.add("is-hidden");
  Radio.resetRadios(radios);
  currentData = null;
}

// ================================================================================
//
// BLOCK / UNBLOCK RADIOS WHEN SUBMITTED
function radioBlock() {
  labels.forEach((label) => {
    label.style.pointerEvents = "none";
  });
}

function radioUnblock() {
  labels.forEach((label) => {
    label.style.pointerEvents = "auto";
  });
}
