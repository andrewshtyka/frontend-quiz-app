// show and hide screens
export function showOrHideScreen(hideEl, showEl) {
  // remove classes everywhere
  if (hideEl.classList.contains("is-removed")) {
    hideEl.classList.remove("is-removed");
  }

  if (showEl.classList.contains("is-removed")) {
    showEl.classList.remove("is-removed");
  }

  // hide
  hideEl.classList.add("is-removed");
  showEl.classList.remove("is-removed");
}

// show header
export function showHeader() {
  const header = document.getElementById("header");
  header.classList.remove("is-hidden");
}

// hide header
export function hideHeader() {
  const header = document.getElementById("header");
  header.classList.add("is-hidden");
}
