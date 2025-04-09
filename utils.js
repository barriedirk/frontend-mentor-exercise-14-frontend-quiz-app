// @todo, review
const toggleSwitch = document.getElementById("theme-toggle");

// Check if user has a preference stored in localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleSwitch.checked = true;
} else {
  document.body.classList.add("light-mode");
  toggleSwitch.checked = false;
}

toggleSwitch.addEventListener("change", () => {
  if (toggleSwitch.checked) {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark"); // Store preference
  } else {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light"); // Store preference
  }
});

// @todo review

const toggleSwitch = document.getElementById("theme-toggle");

// Check if user has a preference stored in localStorage
if (localStorage.getItem("theme") === "dark") {
  setDarkMode();
  toggleSwitch.checked = true;
} else {
  setLightMode();
  toggleSwitch.checked = false;
}

toggleSwitch.addEventListener("change", () => {
  if (toggleSwitch.checked) {
    setDarkMode();
    localStorage.setItem("theme", "dark"); // Store preference
  } else {
    setLightMode();
    localStorage.setItem("theme", "light"); // Store preference
  }
});

function setDarkMode() {
  document.documentElement.style.setProperty("--background-color", "#333333");
  document.documentElement.style.setProperty("--text-color", "#ffffff");
  document.documentElement.style.setProperty("--primary-color", "#ff7f50");
}

function setLightMode() {
  document.documentElement.style.setProperty("--background-color", "#ffffff");
  document.documentElement.style.setProperty("--text-color", "#000000");
  document.documentElement.style.setProperty("--primary-color", "#007bff");
}
