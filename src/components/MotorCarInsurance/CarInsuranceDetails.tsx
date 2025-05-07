import { useState } from "react";
import ProgressBar from "@/components/PrograssBar";

// Expanded vehicle data
const vehicleData = {
  makes: ["Toyota", "Nissan", "Honda", "Mazda", "BMW", "Mercedes-Benz"],
  models: {
    Toyota: ["Corolla", "Camry", "RAV4", "Hilux", "Land Cruiser"],
    Nissan: ["Sunny", "Almera", "X-Trail", "Navara", "Patrol"],
    Honda: ["Accord", "Civic", "CR-V", "Fit", "HR-V"],
    Mazda: ["CX-5", "CX-30", "Mazda3", "Mazda6", "BT-50"],
    BMW: ["3 Series", "5 Series", "X3", "X5", "X7"],
    "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE", "S-Class"],
  },
  years: Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i),
};

const questions = [
  {
    id: "make",
    question: "What is the vehicle make?",
    type: "select",
    options: vehicleData.makes,
  },
  {
    id: "model",
    question: "What is the vehicle model?",
    type: "select",
    options: [], // Will be populated based on make selection
  },
  {
    id: "year",
    question: "What is the year of manufacture?",
    type: "select",
    options: vehicleData.years,
  },
  {
    id: "value",
    question: "What is the estimated value of the car? (KES)",
    type: "input",
    inputType: "number",
  },
  {
    id: "owner",
    question: "Are you the owner of the car?",
    type: "radio",
    options: ["Yes", "No"],
  },
];

const CarDetails = () => {
  const [formData, setFormData] = useState<Record<string, string>>({
    make: "",
    model: "",
    year: "",
    value: "",
    owner: "",
  });
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };

    // If make changes, reset model and update available models
    if (field === "make") {
      newData.model = "";
      setAvailableModels(
        vehicleData.models[value as keyof typeof vehicleData.models] || []
      );
    }

    setFormData(newData);
    setShowError(false);
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      setShowError(true);
      return;
    }
    console.log("Form submitted:", formData);
    window.location.href = "/insurance/motor-car/car-details";
  };

  return (
    <>
      <div className="hidden md:block w-3/8 ml-16">
        <ProgressBar currentStage={1} />
      </div>
      <div className="w-full md:w-5/8 container mx-auto px-4 py-8 bg-white rounded-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Tell us about your vehicle
        </h1>

        {showError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>Please answer all questions before continuing.</p>
          </div>
        )}

        <div className="space-y-8">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className={`flex flex-col md:flex-row items-start md:items-center mb-4 group ${
                showError && !formData[q.id] ? "animate-pulse" : ""
              }`}
            >
              <div className="md:w-1/2 pr-4 mb-4 md:mb-0 flex items-center">
                <div
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-4 font-medium transition ${
                    formData[q.id]
                      ? "bg-green-600 text-white"
                      : showError && !formData[q.id]
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {formData[q.id] ? (
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
                {q.type === "select" ? (
                  <select
                    className={`block w-full p-3 border rounded-lg transition ${
                      showError && !formData[q.id]
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300 focus:ring-green-600 focus:border-green-600"
                    }`}
                    value={formData[q.id] || ""}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    disabled={q.id === "model" && !formData.make}
                  >
                    <option value="" disabled>
                      Select{" "}
                      {q.id === "make"
                        ? "make"
                        : q.id === "model"
                        ? "model"
                        : "year"}
                    </option>
                    {(q.id === "model" ? availableModels : q.options ?? []).map(
                      (option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      )
                    )}
                  </select>
                ) : q.type === "input" ? (
                  <input
                    type={q.inputType}
                    className={`block w-full p-3 border rounded-lg transition ${
                      showError && !formData[q.id]
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300 focus:ring-green-600 focus:border-green-600"
                    }`}
                    value={formData[q.id] || ""}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    placeholder={`Enter ${
                      q.id === "value" ? "estimated value" : ""
                    }`}
                  />
                ) : (
                  <div className="flex gap-4">
                    {(q.options ?? []).map((option) => (
                      <label
                        key={option}
                        className={`inline-flex items-center px-4 py-3 border rounded-lg cursor-pointer transition-all flex-1 text-center ${
                          formData[q.id] === option
                            ? "border-green-600 bg-green-50"
                            : showError && !formData[q.id]
                            ? "border-red-200 bg-red-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={option}
                          checked={formData[q.id] === option}
                          onChange={() => handleChange(q.id, String(option))}
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
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`px-6 py-3 bg-gradient-to-r text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg ${
              isFormValid()
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

export { CarDetails };
