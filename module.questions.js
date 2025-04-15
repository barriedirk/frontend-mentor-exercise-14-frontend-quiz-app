function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const questionTemplate = (value, option) => {
  return `
<label
  class="quiz-answer-option-wrapper"
  for="answer-${option}"
  tabindex="0"
>
  <input
    type="radio"
    value="${value}"
    id="answer-${option}"
    name="answer-option"
  />
  <div class="answer-option-wrapper flex-row">
    <span class="answer-option">${option}</span>
    <span class="answer-text">${escapeHTML(value)}</span>
  </div>
</label>
`;
};

const checkedRadioWhenLabelReceiveFocus = () => {
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
};

const disabledRadio = (isCorrectAnswer, answer) => {
  const labels = document.querySelectorAll("label.quiz-answer-option-wrapper");

  labels.forEach((label) => {
    const inputId = label.getAttribute("for");
    const radio = document.getElementById(inputId);

    if (radio.value === answer) {
      label.classList.add("answer-correct");
    }

    if (!radio) return;

    radio.disabled = true;

    if (radio.checked === true) {
      if (isCorrectAnswer) {
        label.classList.add("correct");
      } else {
        label.classList.add("error");
      }
    }
  });
};

const fillForm = ({
  step,
  total,
  dataQuestion,
  $questionsTitle,
  $questionsParagraph,
  $questionWrapper,
  $questionProgressBar,
  showSpinner,
}) => {
  const progress = Math.floor((step / total) * 100);

  showSpinner(true);
  $questionsTitle.textContent = dataQuestion.question;
  $questionsParagraph.textContent = `Question ${step} of ${total}`;

  $questionWrapper.innerHTML = "";

  dataQuestion.options.forEach((value, index) => {
    const option = String.fromCharCode(65 + index);
    const html = questionTemplate(value, option);

    $questionWrapper.insertAdjacentHTML("beforeend", html);
  });

  $questionProgressBar.style.width = `${progress}%`;

  checkedRadioWhenLabelReceiveFocus();
  showSpinner(false);
};

export const questionsForm = ({
  $quizQuestions,
  showSpinner,
  dataQuestions,
  showSectionComplete,
}) => {
  const controller = new AbortController();
  const $questionsTitle = $quizQuestions.querySelector(
    ".quiz-questions--title"
  );
  const $questionsParagraph = $quizQuestions.querySelector(
    ".quiz-questions--advanced"
  );

  const $questionProgressBar =
    $quizQuestions.querySelector(".quiz-progress-bar");
  const $questionForm = $quizQuestions.querySelector("form.quiz-answers");
  const $btnSubmitAnswer = $quizQuestions.querySelector("#submit-answer");
  const $btnNextQuestion = $quizQuestions.querySelector("#next-question");
  const $btnShowResult = $quizQuestions.querySelector("#show-result");
  const $questionWrapper = $questionForm.querySelector("fieldset");
  const $errorSelectAnAnswer = $questionForm.querySelector(".select-an-answer");

  const state = {
    step: 1,
    total: dataQuestions.length,
    dataQuestion: dataQuestions[0],
    answer: dataQuestions[0].answer,
    correctAnswers: 0,
  };

  $btnSubmitAnswer.classList.remove("hidden");
  $errorSelectAnAnswer.classList.add("hidden");
  $btnNextQuestion.classList.add("hidden");
  $btnShowResult.classList.add("hidden");

  // initialOptions
  fillForm({
    step: state.step,
    total: state.total,
    dataQuestion: state.dataQuestion,
    $questionsTitle,
    $questionsParagraph,
    $questionWrapper,
    $questionProgressBar,
    showSpinner,
  });

  $questionForm.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const ansCustomer = formData.get("answer-option");

      if (!ansCustomer) {
        $errorSelectAnAnswer.classList.remove("hidden");

        window.scrollTo({
          top: $errorSelectAnAnswer.getBoundingClientRect().top,
          left: 0,
          behavior: "smooth",
        });

        return;
      }

      const isCorrectAnswer = ansCustomer === state.answer;

      if (isCorrectAnswer) {
        state.correctAnswers++;
      }

      disabledRadio(isCorrectAnswer, state.answer);

      $errorSelectAnAnswer.classList.add("hidden");
      $btnSubmitAnswer.classList.add("hidden");

      if (state.step == state.total) {
        $btnShowResult.classList.remove("hidden");
      } else {
        $btnNextQuestion.classList.remove("hidden");
      }
    },
    {
      signal: controller.signal,
    }
  );

  $btnNextQuestion.addEventListener(
    "click",
    (event) => {
      event.preventDefault();

      $btnNextQuestion.classList.add("hidden");

      if (state.step < state.total) {
        state.step++;
        state.dataQuestion = dataQuestions[state.step - 1];
        state.answer = dataQuestions[state.step - 1].answer;

        fillForm({
          step: state.step,
          total: state.total,
          dataQuestion: state.dataQuestion,
          $questionsTitle,
          $questionsParagraph,
          $questionWrapper,
          $questionProgressBar,
          showSpinner,
        });

        $btnSubmitAnswer.classList.remove("hidden");

        return;
      }

      $btnNextQuestion.classList.add("hidden");
      $btnShowResult.classList.remove("hidden");
    },
    {
      signal: controller.signal,
    }
  );

  $btnShowResult.addEventListener(
    "click",
    (event) => {
      event.preventDefault();

      showSectionComplete({
        total: state.total,
        correctAnswers: state.correctAnswers,
      });

      controller.abort();
    },
    { signal: controller.signal }
  );
};
