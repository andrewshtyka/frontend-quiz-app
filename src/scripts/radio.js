// check clicked radio and show icon
export function radioCheck(label, radios) {
  resetRadios(radios);

  const id = label.getAttribute("for");
  const clicked = document.getElementById(id);

  clicked.checked = true;
  label.querySelector("[data-correct]").classList.remove("is-hidden");

  return clicked.checked;
}

// all radios unchecked and hide all icons
export function resetRadios(radios) {
  radios.forEach((radio) => {
    radio.checked = false;
    document
      .querySelector(`label[for="${radio.id}"] [data-correct]`)
      .classList.add("is-hidden");
  });
}
