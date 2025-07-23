import { useState } from "react";
import ProgressBar from "@/components/MotorCyclePrograssBar";

const motorcycleModels: { [key: string]: string[] } = {
  Nissan: ["Model A", "Model B", "Model C"],
  Honda: ["Model D", "Model E", "Model F"],
  Mazda: ["cx1", "cx2", "cx3"],
};

const questions = [
  {
    question: "Do you currently have motorcycle insurance?",
    options: ["Yes", "No"],
  },
  {
    question: "Motorcycle Use?",
    options: ["Private", "PSV"],
  },
  {
    question: "Type of insurance interested in?",
    options: ["Comprehensive", "Third Party only"],
  },
  {
    question: "Cover Duration?",
    options: ["1 Month", "12 Months"],
  },
];

const psvAdditionalQuestions = [
  {
    question: "Person Covered",
    options: ["Individual", "Corporate"],
  },
  {
    question: "MotorCycle Use",
    options: ["Bodaboda"],
  },
  {
    question: "Number of passengers",
    options: [], // This will be a numeric input
  },
];

const MotorCycleDetails = () => {
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [psvAnswers, setPsvAnswers] = useState<string[]>(
    Array(psvAdditionalQuestions.length).fill("")
  );
  const [passengerCount, setPassengerCount] = useState("");
  const [showError, setShowError] = useState(false);

  const handleOptionChange = (questionIndex: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
    setShowError(false);

    // Auto-select "Bodaboda" when PSV is selected
    if (questionIndex === 1 && option === "PSV") {
      const newPsvAnswers = [...psvAnswers];
      newPsvAnswers[1] = "Bodaboda"; // Auto-select the only option for MotorCycle Use
      setPsvAnswers(newPsvAnswers);
    }
  };

  const handlePsvOptionChange = (questionIndex: number, option: string) => {
    const newAnswers = [...psvAnswers];
    newAnswers[questionIndex] = option;
    setPsvAnswers(newAnswers);
    setShowError(false);
  };

  const isPsvSelected = answers[1] === "PSV";

  // Function to check if all questions are answered
  // and if PSV questions are answered correctly if PSV is selected
  const allQuestionsAnswered = () => {
    const baseQuestionsAnswered = answers.every(
      (answer) => answer.trim() !== ""
    );

    if (!isPsvSelected) {
      return baseQuestionsAnswered;
    }

    // For PSV questions, we know index 1 ("MotorCycle Use") should be "Bodaboda"
    const psvQuestionsAnswered =
      psvAnswers[0] !== "" && psvAnswers[1] === "Bodaboda";

    const passengerCountValid =
      passengerCount.trim() !== "" &&
      !isNaN(parseInt(passengerCount)) &&
      parseInt(passengerCount) > 0 &&
      parseInt(passengerCount) <= 2;

    return baseQuestionsAnswered && psvQuestionsAnswered && passengerCountValid;
  };

  const handleSubmit = () => {
    if (!allQuestionsAnswered()) {
      setShowError(true);
      return;
    }
    console.log("Form submitted with answers:", {
      ...answers,
      ...(isPsvSelected && {
        psvDetails: {
          ...psvAnswers,
          passengerCount,
        },
      }),
    });
    window.location.href = "/insurance/motorcycle/details";
  };

  const isYesNoQuestion = (question: string) => {
    return question.startsWith("Do you") || question.startsWith("Have you");
  };

  return (
    <>
      <div className="hidden md:block w-3/8 ml-16">
        <ProgressBar currentStage={0} />
      </div>
      <div className="w-full md:w-5/8 container mx-auto px-4 py-8 bg-white rounded-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Tell us about your motorcycle(s) insurance needs.
        </h1>

        {showError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>Please answer all questions before continuing.</p>
          </div>
        )}

        <div className="space-y-8">
          {questions.map((q, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-start md:items-center mb-4 group ${
                showError && !answers[index] ? "animate-pulse" : ""
              }`}
            >
              <div className="md:w-1/2 pr-4 mb-4 md:mb-0 flex items-center">
                <div
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-4 font-medium transition ${
                    answers[index]
                      ? "bg-green-600 text-white"
                      : showError && !answers[index]
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {answers[index] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {q.question}
                </p>
              </div>
              <div className="md:w-1/2">
                {isYesNoQuestion(q.question) ? (
                  <div className="flex gap-4">
                    {q.options.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className={`inline-flex items-center px-4 py-3 border rounded-lg cursor-pointer transition-all flex-1 text-center ${
                          answers[index] === option
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={answers[index] === option}
                          onChange={() => handleOptionChange(index, option)}
                          className="mr-2 w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <span className="text-gray-900 font-medium">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {q.options.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className={`flex items-center px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                          answers[index] === option
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={answers[index] === option}
                          onChange={() => handleOptionChange(index, option)}
                          className="mr-2 w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <span className="text-gray-900 font-medium">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isPsvSelected && (
            <>
              {psvAdditionalQuestions.map((q, index) => (
                <div
                  key={`psv-${index}`}
                  className={`flex flex-col md:flex-row items-start md:items-center mb-4 group ${
                    showError &&
                    !psvAnswers[index] &&
                    q.question !== "Number of passengers"
                      ? "animate-pulse"
                      : showError &&
                        q.question === "Number of passengers" &&
                        !passengerCount
                      ? "animate-pulse"
                      : ""
                  }`}
                >
                  <div className="md:w-1/2 pr-4 mb-4 md:mb-0 flex items-center">
                    <div
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-4 font-medium transition ${
                        q.question === "Number of passengers"
                          ? passengerCount
                            ? "bg-green-600 text-white"
                            : showError && !passengerCount
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-200 text-gray-700"
                          : psvAnswers[index]
                          ? "bg-green-600 text-white"
                          : showError && !psvAnswers[index]
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {q.question === "Number of passengers" ? (
                        passengerCount ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          questions.length + index + 1
                        )
                      ) : psvAnswers[index] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        questions.length + index + 1
                      )}
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {q.question}
                    </p>
                  </div>
                  <div className="md:w-1/2">
                    {q.question === "Number of passengers" ? (
                      <input
                        type="number"
                        min="1"
                        max="2"
                        className="block w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 hover:border-gray-300 focus:ring-green-600 focus:border-green-600 transition"
                        value={passengerCount}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow empty string or numbers between 1-2
                          if (
                            value === "" ||
                            (parseInt(value) > 0 && parseInt(value) <= 2)
                          ) {
                            setPassengerCount(value);
                          }
                        }}
                        onBlur={(e) => {
                          // If value is empty or exceeds max, reset to max
                          if (
                            e.target.value === "" ||
                            parseInt(e.target.value) > 2
                          ) {
                            setPassengerCount("2");
                          }
                        }}
                        placeholder="Enter number of passengers (1-2)"
                      />
                    ) : (
                      <div className="space-y-2">
                        {q.options.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className={`flex items-center px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                              psvAnswers[index] === option
                                ? "border-green-600 bg-green-50"
                                : "border-gray-200 hover:border-gray-300 bg-white"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`psv-question-${index}`}
                              value={option}
                              checked={psvAnswers[index] === option}
                              onChange={() =>
                                handlePsvOptionChange(index, option)
                              }
                              className="mr-2 w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                            />
                            <span className="text-gray-900 font-medium">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="mt-12 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered()}
            className={`px-6 py-3 bg-gradient-to-r text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg ${
              allQuestionsAnswered()
                ? "from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
                : "from-gray-400 to-gray-600 cursor-not-allowed"
            }`}
          >
            Save & Continue
            <svg
              className="w-4 h-4 ml-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export { MotorCycleDetails };
