const userMode = JSON.parse(localStorage.getItem("darkMode")) || "";

if (userMode) {
  document.body.style.backgroundColor = "hsl(216, 25%, 25%)";
}



