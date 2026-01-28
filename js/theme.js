const toggle = document.getElementById("theme");
const body = document.body;

toggle.onclick = () => {
  body.dataset.theme =
    body.dataset.theme === "dark" ? "light" : "dark";
};
