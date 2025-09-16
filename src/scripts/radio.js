import * as AnimateRadios from "./anim-radios";

// check clicked radio and show icon
export function radioCheck(label, radios) {
  resetRadios(radios);

  const id = label.getAttribute("for");
  const clicked = document.getElementById(id);

  clicked.checked = true;
  AnimateRadios.animRadioCheckIcon(label);

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
