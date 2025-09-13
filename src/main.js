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

// ================================================================================
//
// FUNCTIONS
window.addEventListener("load", () => {
  document.fonts.ready.then(() => {
    // dark-light mode switcher
    Mode.toggleMode();

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
}

/*
Окремі HTML-сторінки тут не потрібні. Це робиться як одна HTML-сторінка, а екрани (старт, питання, результат) — просто різні блоки в DOM.

Причина
	•	Легше керувати станом квіза через JS (прогрес, поточне питання, рахунок).
	•	Не треба перезавантажувати сторінку → швидко й плавно працює.
	•	JSON із питаннями зручно підвантажувати один раз і крутити все в JS.

Як верстати
	•	Один index.html.
	•	Усередині кілька section / div для екранів:
	•	#start-screen (вибір теми).
	•	#quiz-screen (питання + варіанти + прогресбар).
	•	#result-screen (бали + кнопка «на початок»).
	•	CSS: всі екрани display: none;, крім активного.
	•	JS: керує видимістю (classList.add("active")/remove("active")), підтягує потрібні питання з JSON, оновлює DOM.

Логіка
	1.	На старті юзер обирає тему → завантажуєш із JSON питання цієї теми.
	2.	Показуєш #quiz-screen, малюєш перше питання.
	3.	Клік по відповіді → перевіряєш правильність, рахуєш бал, оновлюєш прогресбар.
	4.	Якщо ще є питання → показуєш наступне. Якщо ні → показуєш #result-screen.
	5.	Кнопка «Повернутися» → скидаєш стейт, показуєш #start-screen.

Це класичний SPA-підхід на ванільному JS (single page application, але без фреймворків).

==================================================================================================================================

Тему (Dark/Light) не роблять окремими сторінками. Це теж одна сторінка, і тема міняється через клас на body або CSS-перемінні.

Як врахувати у процесі
	•	У body робиш базово class="light".
	•	Кнопка «Dark / Light» у будь-якому екрані → в JS міняєш body.classList.toggle("dark").
	•	CSS пишеш через змінні:

  :root {
  --bg: #fff;
  --text: #000;
}

body.dark {
  --bg: #111;
  --text: #eee;
}

body {
  background: var(--bg);
  color: var(--text);
}

Що це дає
	•	Всі екрани (start, quiz, result) автоматично підлаштовуються, бо вони стиляться через змінні.
	•	Логіка переключення теми — незалежна від логіки самого квіза.

Рекомендація
	•	Зроби окрему функцію toggleTheme().
	•	Збережи вибір теми в localStorage, щоб після перезавантаження користувач бачив останню тему.
*/
