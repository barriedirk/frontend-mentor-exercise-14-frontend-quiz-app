const $ = (selector) => document.querySelector(selector);

// @todo. need to improve

const labels = document.querySelectorAll("label.quiz-answer-option-wrapper");

labels.forEach((label) => {
  label.addEventListener("focus", () => {
    const inputId = label.getAttribute("for");
    const radio = document.getElementById(inputId);
    if (radio && !radio.disabled) {
      radio.checked = true;
      // Optional: trigger change event if needed
      radio.dispatchEvent(new Event("change"));
    }
  });
});
