const menuButton = document.getElementById("menu-button");
const navigationMenu = document.getElementById("animate-me");

menuButton.addEventListener("click", () => {
  navigationMenu.classList.toggle("open");

  if (navigationMenu.classList.contains("open")) {
    menuButton.innerHTML = "&times;";
  } else {
    menuButton.innerHTML = "&#9776;";
  }
});
