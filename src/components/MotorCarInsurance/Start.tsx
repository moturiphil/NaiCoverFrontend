// import InsuranceFormNavbar from "../../components/InsuranceFormNavbar";
// import { Footer } from "../Footer";
import ProgressBar from "@/components/PrograssBar";
import { useState } from "react";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";

// import { buttonVariants } from "@/components/ui/button";
// import { LogoIcon } from "@/components/Icons";

const questions = [
  {
    question: "Do you currently have car insurance?",
    options: ["Yes", "No"],
  },
  // {
  //   question: "Do you own or rent your home?",
  //   options: ["I own my home", "I own my condo", "I rent", "Other"],
  // },
  {
    question: "When do you plan to purchase your new insurance policy?",
    options: [
      "I'd like to buy or change insurance policies today",
      "Sometime in the future",
    ],
  },
];

const Start = () => {
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const handleOptionChange = (questionIndex: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted with answers:", answers);
  };

  return (
    <>
      {/* <InsuranceFormNavbar /> */}
      <div className="hidden md:block w-3/8 ml-16">
        <ProgressBar currentStage={0} />
      </div>
      <div className="w-full md:w-5/8 container mx-auto px-4">
        <h1 className="text-3xl font-medium text-start mb-8">
          Tell us about your insurance needs.
        </h1>
        <div className="space-y-8">
          {questions.map((q, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center mb-4"
            >
              <div className="md:w-1/2 pr-4 mb-4 md:mb-0 flex items-center">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full mr-4">
                  {index + 1}
                </div>
                <p className="text-lg font-semibold">{q.question}</p>
              </div>
              <div className="md:w-1/2">
                {q.question === "Make" ? (
                  <select
                    className="block w-full p-2 border rounded bg-gray-100 text-black"
                    value={answers[index]}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
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
                ) : (
                  q.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`block mb-2 p-2 border rounded cursor-pointer ${
                        answers[index] === option
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={answers[index] === option}
                        onChange={() => handleOptionChange(index, option)}
                        className="mr-2 appearance-none border border-black rounded-full w-4 h-4 checked:bg-white checked:border-black"
                      />
                      <span className="inline-block">{option}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
            <button
            type="button"
            onClick={() => {
              handleSubmit();
              window.location.href = "/insurance/motor-car/car-details";
            }}
            className="px-4 py-2 border rounded bg-white text-black"
            >
            Save and Continue
            </button>
        </div>
      </div>
    </>
  );
};

export { Start };
