export function toggleMode() {
  const bodyEl = document.querySelector("body");
  const switcherEl = document.getElementById("mode-switcher");

  switcherEl.addEventListener("change", () => {
    if (switcherEl.checked) {
      bodyEl.classList.add("dark");
    } else {
      bodyEl.classList.remove("dark");
    }
  });
}
