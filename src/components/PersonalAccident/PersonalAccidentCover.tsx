import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/PersonalAccidentPrograssBar";

const coverTypes = ["Individual", "Family", "Student"] as const;
type CoverType = (typeof coverTypes)[number];

const durationOptions = {
  Individual: [{ value: "1", label: "1 Year" }],
  Family: [{ value: "1", label: "1 Year" }],
  Student: [
    { value: "0.25", label: "3 Months" },
    { value: "0.5", label: "6 Months" },
    { value: "1", label: "1 Year" },
  ],
};

const PersonalAccidentCover = () => {
  const navigate = useNavigate();
  const [coverType, setCoverType] = useState<CoverType | "">("");
  const [adultsCount, setAdultsCount] = useState<string>("1");
  const [childrenCount, setChildrenCount] = useState<string>("0");
  const [duration, setDuration] = useState<string>("1");
  const [showError, setShowError] = useState(false);

  const handleCoverTypeChange = (value: string) => {
    const newCoverType = value as CoverType;
    setCoverType(newCoverType);

    // Reset duration to default when cover type changes
    if (newCoverType === "Student") {
      setDuration("1"); // Default to 1 year for Student
    } else {
      setDuration("1"); // Default to 1 year for others
    }

    setShowError(false);
  };

  const handleNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    max: number = 10
  ) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= max)) {
      setter(value);
    }
  };

  const isFormValid = () => {
    if (!coverType) return false;

    if (coverType === "Family") {
      return adultsCount !== "" && childrenCount !== "";
    }

    return true;
  };

  const saveToCache = () => {
    const dataToSave = {
      coverType,
      ...(coverType === "Family" && {
        adultsCount,
        childrenCount,
      }),
      duration,
      durationLabel:
        durationOptions[coverType].find((opt) => opt.value === duration)
          ?.label || "1 Year",
    };

    try {
      localStorage.setItem("personalAccidentData", JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Failed to save to cache:", error);
      sessionStorage.setItem(
        "personalAccidentData",
        JSON.stringify(dataToSave)
      );
    }
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      setShowError(true);
      return;
    }

    saveToCache();
    navigate("/signup");
  };

  return (
    <>
      <div className="hidden md:block w-3/8 ml-16">
        <ProgressBar currentStage={0} />
      </div>
      <div className="w-full md:w-5/8 container mx-auto px-4 py-8 bg-white rounded-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Personal Accident Insurance Details
        </h1>

        {showError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>Please provide all required information before continuing.</p>
          </div>
        )}

        <div className="space-y-8">
          {/* Cover Type Selection */}
          <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
            <div className="md:w-1/2 pr-4 mb-4 md:mb-0 flex items-center">
              <div
                className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-4 font-medium ${
                  coverType
                    ? "bg-green-600 text-white"
                    : showError
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {coverType ? (
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
                  1
                )}
              </div>
              <p className="text-lg font-semibold text-gray-900">
                Who do you want to cover?
              </p>
            </div>
            <div className="md:w-1/2">
              <select
                className={`block w-full p-3 border rounded-lg transition ${
                  showError && !coverType
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 focus:ring-green-600 focus:border-green-600"
                }`}
                value={coverType}
                onChange={(e) => handleCoverTypeChange(e.target.value)}
              >
                <option value="" disabled>
                  Select cover type
                </option>
                {coverTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Family-specific fields */}
          {coverType === "Family" && (
            <>
              <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
                <div className="md:w-1/2 pr-4 mb-4 md:mb-0 flex items-center">
                  <div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-4 font-medium ${
                      adultsCount
                        ? "bg-green-600 text-white"
                        : showError
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {adultsCount ? (
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
                      2
                    )}
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    Number of adults (max 10)
                  </p>
                </div>
                <div className="md:w-1/2">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className={`block w-full p-3 border rounded-lg transition ${
                      showError && !adultsCount
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300 focus:ring-green-600 focus:border-green-600"
                    }`}
                    value={adultsCount}
                    onChange={(e) => handleNumberInput(e, setAdultsCount, 10)}
                    placeholder="Number of adults"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
                <div className="md:w-1/2 pr-4 mb-4 md:mb-0 flex items-center">
                  <div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-4 font-medium ${
                      childrenCount
                        ? "bg-green-600 text-white"
                        : showError
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {childrenCount ? (
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
                      3
                    )}
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    Number of children under 18
                  </p>
                </div>
                <div className="md:w-1/2">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    className={`block w-full p-3 border rounded-lg transition ${
                      showError && !childrenCount
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300 focus:ring-green-600 focus:border-green-600"
                    }`}
                    value={childrenCount}
                    onChange={(e) => handleNumberInput(e, setChildrenCount, 20)}
                    placeholder="Number of children"
                  />
                </div>
              </div>
            </>
          )}

          {/* Cover Duration (shown for all types except when not selected) */}
          {coverType && (
            <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
              <div className="md:w-1/2 pr-4 mb-4 md:mb-0 flex items-center">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-4 font-medium bg-green-600 text-white">
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
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  Cover duration
                </p>
              </div>
              <div className="md:w-1/2">
                <select
                  className="block w-full p-3 border border-gray-200 bg-gray-50 rounded-lg hover:border-gray-300 focus:ring-green-600 focus:border-green-600"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  {durationOptions[coverType].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
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
            Get Quote
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

export { PersonalAccidentCover };
