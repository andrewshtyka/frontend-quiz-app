import * as Header from "./header";
import * as Progress from "./progress-bar";
import * as Result from "./result";
import * as Radio from "./radio";
import * as Validate from "./validate";
import * as StorageQuiz from "./local-storage-quiz";
import * as AnimateStartScreen from "./anim-screen-quiz";
import * as AnimateButtons from "./anim-buttons";

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
    AnimateButtons.animErrorMessageHide(errorMessage);
  });

  label.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.code === "Space") {
      e.preventDefault();
      currentRadio = e.currentTarget;
      isChecked = Radio.radioCheck(label, radios);
      userAnswer = label.querySelector("[data-answer]").textContent;
      AnimateButtons.animErrorMessageHide(errorMessage);
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
    AnimateButtons.animErrorMessage(errorMessage);
    return;
  }

  isSubmitted = true;

  if (amountQuestions - currentQ === 1) {
    AnimateButtons.animateButtonText(buttonSubmit, "Show Result");
  } else {
    AnimateButtons.animateButtonText(buttonSubmit, "Next Question");
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
  radioUnblock();

  if (currentQ < amountQuestions) {
    updateData(currentQ);
    Radio.resetRadios(radios);
    userAnswer = null;
    isChecked = false;
    isSubmitted = false;
    AnimateButtons.animateButtonText(buttonSubmit, "Submit Answer");
  } else {
    AnimateStartScreen.animHideShowScreen(screenQuiz, screenResult);
    Radio.resetRadios(radios);
    currentQ = 0;
    userAnswer = null;
    isChecked = false;
    isSubmitted = false;
    AnimateButtons.animateButtonText(buttonSubmit, "Submit Answer");
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

  AnimateStartScreen.animShowHeader();
  AnimateStartScreen.animHideShowScreen(screenStart, screenQuiz);
}

// load data from localStorage
export async function restoreQuiz(savedData) {
  const dataArray = await getData();
  if (!dataArray) return;

  const quiz = dataArray.quizzes.find((q) => q.title === savedData.topic);
  if (!quiz) return;

  currentData = quiz;
  amountQuestions = quiz.questions.length;
  currentQ = savedData.questionIndex || 0;
  userScore = savedData.userScore || 0;

  Header.changeTopicIcon(quiz.icon, quiz);
  updateData(currentQ);
  Result.updateScore(userScore, amountQuestions);

  AnimateStartScreen.animHideShowScreen(screenStart, screenQuiz);
  AnimateStartScreen.animShowHeader();
}

// ================================================================================
//
// UPDATE QUESTION
function updateData(index) {
  const currentQuestion = currentData.questions[index];

  // save 'question index', 'score' and 'topic name' to local storage
  StorageQuiz.saveQuizState(index, userScore, currentData.title);

  questionNumber.textContent = `Question ${index + 1} of ${amountQuestions}`;
  Progress.progressBar(index);
  questionText.textContent = currentQuestion.question;
  optionA.textContent = currentQuestion.options[0];
  optionB.textContent = currentQuestion.options[1];
  optionC.textContent = currentQuestion.options[2];
  optionD.textContent = currentQuestion.options[3];

  isChecked = false;
}

// ================================================================================
//
// FETCH DATA
export async function getData() {
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
export function radioBlock() {
  labels.forEach((label) => {
    label.style.pointerEvents = "none";
  });
}

export function radioUnblock() {
  labels.forEach((label) => {
    label.style.pointerEvents = "auto";
  });
}
