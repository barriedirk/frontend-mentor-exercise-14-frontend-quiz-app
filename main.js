import { $, $$ } from "./utils.js";
import { getQuestions } from "./data.service.js";
import { questionsForm } from "./module.questions.js";

(async () => {
  const $headerOptionsSelected = $(".quiz-header--option-selected");
  const $quizCompleteResult = $(".quiz-complete--choiced");

  const $quizChoices = $(".quiz-choices--wrapper");
  const $quizQuestions = $(".quiz-questions--wrapper");
  const $quizComplete = $(".quiz-complete--wrapper");
  const $totalCorrectAnswers = $(".quiz-complete--correct-answers");
  const $totalAnswers = $(".quiz-complete--total-answers");
  const $spinner = $(".spinner-wrapper");
  const $$btnChoiceSubject = $$(".quiz-choices--list button");
  const $btnPlayAgain = $("#play-again");

  const showSpinner = (show) => {
    show
      ? $spinner.classList.remove("hidden")
      : $spinner.classList.add("hidden");
  };

  const initialization = () => {
    $headerOptionsSelected.replaceChildren();

    $quizChoices.classList.remove("hidden");
    $quizQuestions.classList.add("hidden");
    $quizComplete.classList.add("hidden");
  };

  const showSectionComplete = (state) => {
    $totalAnswers.innerHTML = `out of ${state.total}`;
    $totalCorrectAnswers.innerHTML = `${state.correctAnswers}`;

    $quizQuestions.classList.add("hidden");
    $quizComplete.classList.remove("hidden");
  };

  Array.from($$btnChoiceSubject).forEach((btn) => {
    btn.addEventListener("click", async (evt) => {
      evt.preventDefault();

      showSpinner(true);

      const subject = btn.getAttribute("data-option");
      const dataQuestions = await getQuestions(subject);

      $headerOptionsSelected.innerHTML = "";
      $quizCompleteResult.innerHTML = "";

      Array.from(btn.children).forEach((child) => {
        $headerOptionsSelected.appendChild(child.cloneNode(true));
        $quizCompleteResult.appendChild(child.cloneNode(true));
      });

      showSpinner(false);

      questionsForm({
        $quizQuestions,
        showSpinner,
        dataQuestions,
        showSectionComplete,
      });

      $quizChoices.classList.add("hidden");
      $quizQuestions.classList.remove("hidden");
    });
  });

  $btnPlayAgain.addEventListener("click", (evt) => {
    evt.preventDefault();

    initialization();
  });

  initialization();
})();
