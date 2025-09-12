export function toggleMode() {
  const inputEl = document.getElementById("mode-switcher");
  const labelEl = document.querySelector("label[for=mode-switcher]");

  // toggle on Click
  labelEl.addEventListener("click", (e) => {
    applyMode(inputEl, e);
  });

  // toggle on Spacebar or Enter
  labelEl.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      applyMode(inputEl, e);
    }
  });
}

// add .dark to body
function changeCurrentMode(state) {
  if (state) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

// toggle 'change' on checkbox
function applyMode(input, event) {
  event.preventDefault();
  input.checked = !input.checked;
  input.dispatchEvent(new Event("change"));
  changeCurrentMode(input.checked);
}
