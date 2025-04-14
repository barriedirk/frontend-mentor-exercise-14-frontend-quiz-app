import { $, $$ } from "./utils.js";
import { getQuestions } from "./data.service.js";
import { questionsForm } from "./module.questions.js";

(async () => {
  const $headerOptionsSelected = $(".quiz-header--option-selected");
  const $quizCompleteResult = $(".quiz-complete--choiced");

  const $quizChoices = $(".quiz-choices--wrapper");
  const $quizQuestions = $(".quiz-questions--wrapper");
  const $quizComplete = $(".quiz-complete--wrapper");
  const $spinner = $(".spinner-wrapper");
  const $$btnChoiceSubject = $$(".quiz-choices--list button");

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
    $quizQuestions.classList.add("hidden");
    $quizComplete.classList.remove("hidden");

    console.log(showSectionComplete, state);
  };

  Array.from($$btnChoiceSubject).forEach((btn) => {
    btn.addEventListener("click", async (evt) => {
      evt.preventDefault();

      showSpinner(true);

      const subject = btn.getAttribute("data-option");

      $headerOptionsSelected.innerHTML = "";
      $quizCompleteResult.innerHTML = "";

      Array.from(btn.children).forEach((child) => {
        const cloned = child.cloneNode(true);

        $headerOptionsSelected.append(cloned);
        $quizCompleteResult.append(cloned);
      });

      const dataQuestions = await getQuestions(subject);

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

  initialization();
})();
