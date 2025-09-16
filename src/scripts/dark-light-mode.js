import * as AnimateSwitcher from "./anim-dark-light-mode";

const inputEl = document.getElementById("mode-switcher");
const labelEl = document.querySelector("label[for=mode-switcher]");
let isAnimating = false;

// listen to switcher
export function toggleMode(userMode) {
  labelEl.addEventListener("click", (e) => {
    handleToggle(e);
  });

  labelEl.addEventListener("keydown", (e) => {
    const isInput = e.code === "Enter" || e.code === "Space";
    if (isInput) {
      handleToggle(e);
    }
  });
}

// save mode to localStorage
function saveMode(isDark) {
  localStorage.setItem("darkMode", JSON.stringify(isDark));
}

// get and apply mode on page load
export function getMode() {
  let savedMode = JSON.parse(localStorage.getItem("darkMode"));

  if (savedMode === null) savedMode = false;
  inputEl.checked = savedMode;

  if (savedMode) document.body.classList.add("dark");
  else document.body.classList.remove("dark");
}

function handleToggle(e) {
  e.preventDefault();

  if (isAnimating) return;
  isAnimating = true;

  const isDark = !inputEl.checked;
  inputEl.checked = isDark;

  const browserWidth = window.innerWidth;
  AnimateSwitcher.animModeChange(isDark, browserWidth);
  saveMode(isDark);

  setTimeout(() => {
    isAnimating = false;
  }, 1000);
}
