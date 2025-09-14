const inputEl = document.getElementById("mode-switcher");
const labelEl = document.querySelector("label[for=mode-switcher]");

// listn to switcher
export function toggleMode(mode) {
  // toggle on Click
  labelEl.addEventListener("click", (e) => {
    e.preventDefault();
    applyMode(inputEl);
    saveMode(mode);
  });

  // toggle on Spacebar or Enter
  labelEl.addEventListener("keydown", (e) => {
    const isInput = e.code === "Enter" || e.code === "Space";

    if (isInput) {
      e.preventDefault();
      applyMode(inputEl);
      saveMode(mode);
    }
  });
}

// toggle 'change' on checkbox
function applyMode(input) {
  input.checked = !input.checked;
  input.dispatchEvent(new Event("change"));
  changeCurrentMode(input.checked);
}

// add .dark to body
function changeCurrentMode(state) {
  if (state) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

// save mode to local storage
function saveMode(storage) {
  const isDark = document.body.classList.contains("dark");
  storage = isDark;
  localStorage.setItem("darkMode", JSON.stringify(storage));
}

// get and apply mode on page load
export function getMode(mode) {
  if (mode) {
    document.body.classList.add("dark");
    inputEl.checked = true;
    console.log("dark");
  } else {
    document.body.classList.remove("dark");
    inputEl.checked = false;
    console.log("light");
  }
}
