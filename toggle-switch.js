import { $, $$ } from "./utils.js";

(async () => {
  const $toggleSwitch = $("#theme-toggle");
  const isDarktheme = localStorage.getItem("theme") === "dark";
  const className = isDarktheme ? "dark-mode" : "light-mode";
  const styles = {
    "--bg-color": {
      light: "var(--clr-grey-50)",
      dark: "var(--clr-blue-900)",
    },

    "--text-color": {
      light: "var(--clr-blue-900)",
      dark: "var(--clr-white)",
    },
    "--bg-btn-choice": {
      light: "var(--clr-white)",
      dark: "var(--clr-blue-850)",
    },
    "--bg-answer-option-wrapper": {
      light: "var(--clr-white)",
      dark: "var(--clr-blue-850)",
    },
    "--bg-range-wrapper": {
      light: "var(--clr-white)",
      dark: "var(--clr-blue-850)",
    },
    "--bg-quiz-complete": {
      light: "var(--clr-white)",
      dark: "var(--clr-blue-850)",
    },
    "--clr-complete-text": {
      light: "var(--clr-blue-900)",
      dark: "var(--clr-white)",
    },
    "--clr-complete-sub-text": {
      light: "var(--clr-grey-500)",
      dark: "var(--clr-blue-300)",
    },
    "--pattern-mobile": {
      light: 'url("./assets/images/pattern-background-mobile-light.svg")',
      dark: 'url("./assets/images/pattern-background-mobile-dark.svg")',
    },
    "--pattern-tablet": {
      light: 'url("./assets/images/pattern-background-tablet-light.svg")',
      dark: 'url("./assets/images/pattern-background-tablet-dark.svg")',
    },
    "--pattern-desktop": {
      light: 'url("./assets/images/pattern-background-desktop-light.svg")',
      dark: 'url("./assets/images/pattern-background-desktop-dark.svg")',
    },
    "--bg-icon-moon": {
      light: 'url("./assets/images/icon-moon-light.svg")',
      dark: 'url("./assets/images/icon-moon-dark.svg")',
    },
    "--bg-icon-sun": {
      light: 'url("./assets/images/icon-sun-light.svg")',
      dark: 'url("./assets/images/icon-sun-dark.svg")',
    },
  };

  const updateStyles = (themeMode, styles) => {
    Object.keys(styles).forEach((cssVar) =>
      document.documentElement.style.setProperty(
        cssVar,
        styles[cssVar][themeMode]
      )
    );
  };

  const setDarkMode = () => {
    localStorage.setItem("theme", "dark");

    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");

    updateStyles("dark", styles);
  };
  const setLightMode = () => {
    localStorage.setItem("theme", "light");

    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");

    updateStyles("light", styles);
  };

  document.body.classList.add(className);
  $toggleSwitch.checked = isDarktheme;

  $toggleSwitch.addEventListener("change", () => {
    if ($toggleSwitch.checked) {
      setDarkMode();
    } else {
      setLightMode();
    }
  });

  $toggleSwitch.dispatchEvent(new Event("change"));
})();
