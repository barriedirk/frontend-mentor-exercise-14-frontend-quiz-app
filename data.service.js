const PATH = "./data.json";

export const getQuestions = async (subject) => {
  if (!["CSS", "HTML", "JavaScript", "Accessibility"].includes(subject)) {
    throw new Error("Subject is not registered, verify");
  }

  const response = await fetch(PATH, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const dataRaw = await response.json();
  const data = dataRaw["quizzes"].filter((quiz) => quiz.title === subject)[0][
    "questions"
  ];

  // emulate delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
};
