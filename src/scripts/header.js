// change topic icon
export function changeTopicIcon(name, data) {
  const iconHeader = document.getElementById("header").querySelector("use");
  const iconResult = document
    .getElementById("result-text")
    .querySelector("[data-result-icon]");
  const selectorsArray = [iconHeader, iconResult];

  selectorsArray.forEach((el) => changeIcons(el, name));

  changeIconBG(name);
  changeName(name, data);
}

// function to change icon in topic
function changeIcons(el, name) {
  el.href.baseVal = `./src/assets/images/icons.svg#icon-${name}`;
}

// ======================================================================
//
// change icon background
function changeIconBG(name) {
  const iconAreaHeader = document
    .getElementById("header")
    .querySelector("span").classList;
  const iconAreaResult = document
    .getElementById("result-text")
    .querySelector("span").classList;
  const selectorsArray = [iconAreaHeader, iconAreaResult];

  selectorsArray.forEach((el) => changeIconsBG(el, name));
}

// function to change icon background in topic
function changeIconsBG(el, name) {
  el.remove("u-color_orange-50");
  el.remove("u-color_green-100");
  el.remove("u-color_blue-50");
  el.remove("u-color_purple-100");

  if (name === "html") el.add("u-color_orange-50");
  else if (name === "css") el.add("u-color_green-100");
  else if (name === "js") el.add("u-color_blue-50");
  else if (name === "accessibility") el.add("u-color_purple-100");
  else return;
}

// ======================================================================
//
// change topic name
function changeName(name, data) {
  const nameElHeader = document.getElementById("header").querySelector("h2");
  const nameElResult = document
    .getElementById("result-text")
    .querySelector("h2");
  const selectorsArray = [nameElHeader, nameElResult];

  selectorsArray.forEach((el) => changeAllNames(el, name, data));
}

// function to change name in topic
function changeAllNames(el, name, data) {
  if (name === data.icon) el.textContent = data.title;
  else return;
}
