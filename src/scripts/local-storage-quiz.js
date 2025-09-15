// save 'question index', 'score' and 'topic name' to local storage
export function saveQuizState(questionIndex, userScore, topic) {
  const storedData = JSON.parse(localStorage.getItem("data")) || {};

  storedData["questionIndex"] = questionIndex;
  storedData["userScore"] = userScore;
  storedData["topic"] = topic;

  localStorage.setItem("data", JSON.stringify(storedData));
}
