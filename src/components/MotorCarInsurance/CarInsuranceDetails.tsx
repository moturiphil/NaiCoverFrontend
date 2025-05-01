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
  // {
  //   question: "Do you have a valid driver's license?",
  //   options: ["Yes", "No"],
  // },
  // {
  //   question: "Do you have a valid KRA PIN?",
  //   options: ["Yes", "No"],
  // },
  // {
  //   question: "Do you have a valid ID?",
  //   options: ["Yes", "No"],
  // },
  // {
  //   question: "Do you have a valid logbook?",
  //   options: ["Yes", "No"],
  // },
  // {
  //   question: "Do you have a valid inspection certificate?",
  //   options: ["Yes", "No"],
  // },
  // {
  //   question: "Do you have a valid certificate of good conduct?",
  //   options: ["Yes", "No"],
  // },
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
  // {
  //   "question": "Make",
  //   "options": [
  //     "Toyota",
  //     "Nissan",
  //     "Honda",
  //     "Hyundai",
  //     "Kia",
  //     "Mitsubishi",
  //     "Subaru",
  //     "Mazda",
  //     "Suzuki",
  //     "Isuzu",
  //     "Ford",
  //     "Chevrolet",
  //     "Volkswagen",
  //     "Mercedes-Benz",
  //     "BMW",
  //     "Audi",
  //     "Volvo",
  //     "Peugeot",
  //     "Renault",
  //     "Land Rover",
  //     "Jeep",
  //     "Lexus",
  //     "Porsche",
  //     "Jaguar",
  //     "Daihatsu",
  //     "Fiat",
  //     "Proton",
  //     "SsangYong",
  //     "Mahindra",
  //     "Tata",
  //     "Chery",
  //     "Great Wall (GWM)",
  //     "FAW",
  //     "Haval",
  //     "BYD",
  //     "Geely",
  //     "Changan",
  //     "MG (Morris Garages)",
  //     "Scania",
  //     "MAN",
  //     "Iveco",
  //     "Hino",
  //     "UD Trucks",
  //     "Dongfeng",
  //     "Foton",
  //     "JAC"
  //   ]
  // },
  // {
  //   question: "Model",
  //   options: [], // This will be dynamically populated based on the selected make
  // },
  // {
  //   question: "Manufacture Date",
  //   options: [], // This will be a user input
  // },
  // {
  //   question: "Vehicle Estimated Value",
  //   options: [], // This will be a user input
  // },
];

const CarInsuranceDetails = () => {
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
      <div className="hidden md:block w-3/8 ml-16">
        <ProgressBar currentStage={0} />
      </div>
      <div className="w-full md:w-5/8 container mx-auto px-4">
        <h1 className="text-3xl font-medium text-start mb-8">
          Tell us about your vehicle(s) insurance needs.
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
                ) : q.question === "Model" ? (
                  <select
                    className="block w-full p-2 border rounded bg-gray-100 text-black"
                    value={answers[index]}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    disabled={!answers[3]} // Disable if no make is selected
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
                    className="block w-full p-2 border rounded bg-gray-100 text-black"
                    value={answers[index]}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder="Enter Manufacture Date"
                  />
                ) : q.question === "Vehicle Estimated Value" ? (
                  <input
                    type="number"
                    className="block w-full p-2 border rounded bg-gray-100 text-black"
                    value={answers[index]}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder="Enter Estimated Value"
                  />
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
        {/* <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 border rounded bg-white text-black"
          >
            Get Quote
          </button>
        </div> */}
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

export { CarInsuranceDetails };
