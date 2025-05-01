// import React, { useState } from "react";\
import { useState } from "react";
import ProgressBar from "@/components/PrograssBar";

const carModels: { [key: string]: string[] } = {
  Nissan: ["Model A", "Model B", "Model C"],
  Honda: ["Model D", "Model E", "Model F"],
  Mazda: ["cx1", "cx2", "cx3"],
};

const questions = [
  {
    question: "Do you currently have car insurance?",
    options: ["Yes", "No"],
  },
  {
    question:
      "Have you had an active car insurance policy in the last 31 days?",
    options: ["Yes", "No"],
  },
  {
    question: "Vehicle Use?",
    options: ["Private", "Commercial", "PSV"],
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

const CarDetails = () => {
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const handleOptionChange = (questionIndex: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    console.log("Form submitted with answers:", answers);
  };

  // Helper function to check if question is Yes/No type
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
          Tell us about your vehicle(s) insurance needs.
        </h1>
        <div className="space-y-8">
          {questions.map((q, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center mb-4 group"
            >
              <div className="md:w-1/2 pr-4 mb-4 md:mb-0 flex items-center">
                <div
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-4 font-medium transition ${
                    answers[index]
                      ? "bg-green-600 text-white"
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
                {q.question === "Make" ? (
                  <select
                    className="block w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 hover:border-gray-300 focus:ring-green-600 focus:border-green-600 transition"
                    value={answers[index]}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    title="Select Make"
                    aria-label="Select Make"
                  >
                    <option value="" disabled>
                      Select Make
                    </option>
                    {q.options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : q.question === "Model" ? (
                  <select
                    className="block w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 hover:border-gray-300 focus:ring-green-600 focus:border-green-600 transition"
                    value={answers[index]}
                    title="Select Model"
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    disabled={!answers[3]}
                  >
                    <option value="" disabled>
                      Select Model
                    </option>
                    {carModels[answers[3]]?.map((model, modelIndex) => (
                      <option key={modelIndex} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                ) : q.question === "Manufacture Date" ? (
                  <input
                    type="number"
                    className="block w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 hover:border-gray-300 focus:ring-green-600 focus:border-green-600 transition"
                    value={answers[index]}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder="Enter Manufacture Date"
                  />
                ) : q.question === "Vehicle Estimated Value" ? (
                  <input
                    type="number"
                    className="block w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 hover:border-gray-300 focus:ring-green-600 focus:border-green-600 transition"
                    value={answers[index]}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder="Enter Estimated Value"
                  />
                ) : isYesNoQuestion(q.question) ? (
                  // Horizontal layout for Yes/No questions
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
                  // Vertical layout for other questions
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
        </div>
        <div className="mt-12 flex justify-end">
          <button
            type="button"
            onClick={() => {
              handleSubmit();
              window.location.href = "/insurance/motor-car/car-details";
            }}
            // className="w-full md:w-1/2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg"
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg"
          >
            Save and Continue
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

export { CarDetails };
