// change topic icon
export function changeTopicIcon(name, data) {
  const icon = document.getElementById("header").querySelector("use");
  icon.href.baseVal = `./src/assets/images/icons.svg#icon-${name}`;

  changeIconBG(name);
  changeName(name, data);
}

// change icon background
function changeIconBG(name) {
  const iconArea = document
    .getElementById("header")
    .querySelector("span").classList;

  iconArea.remove("u-color_orange-50");
  iconArea.remove("u-color_green-100");
  iconArea.remove("u-color_blue-50");
  iconArea.remove("u-color_purple-100");

  if (name === "html") iconArea.add("u-color_orange-50");
  else if (name === "css") iconArea.add("u-color_green-100");
  else if (name === "js") iconArea.add("u-color_blue-50");
  else if (name === "accessibility") iconArea.add("u-color_purple-100");
  else return;
}

// change topic name
function changeName(name, data) {
  const nameEl = document.getElementById("header").querySelector("h2");

  if (name === data.icon) nameEl.textContent = data.title;
  else return;
}
