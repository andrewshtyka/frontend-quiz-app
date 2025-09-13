// progress bar movement
export function progressBar(num) {
  const progress = document.getElementById("progress-bar");
  progress.style.inlineSize = `${(num + 1) * 10}%`;
}
