import * as AnimateSwitcher from "./anim-dark-light-mode";

const inputEl = document.getElementById("mode-switcher");
const labelEl = document.querySelector("label[for=mode-switcher]");

// listen to switcher
export function toggleMode() {
  labelEl.addEventListener("click", (e) => {
    e.preventDefault();
    const isDark = !inputEl.checked;
    inputEl.checked = isDark;
    AnimateSwitcher.animModeChange(isDark);
    saveMode(isDark);
  });

  labelEl.addEventListener("keydown", (e) => {
    const isInput = e.code === "Enter" || e.code === "Space";
    if (isInput) {
      e.preventDefault();
      const isDark = !inputEl.checked;
      inputEl.checked = isDark;
      AnimateSwitcher.animModeChange(isDark);
      saveMode(isDark);
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
