export function toggleMode(input, label) {
  const inputEl = document.getElementById("mode-switcher");
  const labelEl = document.querySelector("label[for=mode-switcher]");

  // toggle on Click
  labelEl.addEventListener("click", (e) => {
    e.preventDefault();
    applyMode(inputEl, e);
  });

  // toggle on Spacebar or Enter
  labelEl.addEventListener("keydown", (e) => {
    const isInput = e.code === "Enter" || e.code === "Space";

    if (isInput) {
      e.preventDefault();
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
function applyMode(input) {
  input.checked = !input.checked;
  input.dispatchEvent(new Event("change"));
  changeCurrentMode(input.checked);
}
