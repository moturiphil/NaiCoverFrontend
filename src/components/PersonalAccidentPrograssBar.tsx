import React from "react";

interface ProgressBarProps {
  currentStage: number;
}

const stages = [ "Start", "Bio Data", "Coverage", "Payment"];

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStage }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {stages.map((stage, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
              currentStage === index
                ? "border-green-600 bg-green-600 text-white" // Current stage - solid green
                : index < currentStage
                ? "border-green-600 bg-green-100 text-green-600" // Completed stage - green outline with light green bg
                : "border-gray-300 bg-white text-gray-400" // Future stage - gray
            } transition-colors duration-300`}
          >
            {index < currentStage ? (
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
          <span
            className={`mt-2 text-sm font-medium ${
              currentStage === index
                ? "text-green-600"
                : index < currentStage
                ? "text-green-600"
                : "text-gray-400"
            } transition-colors duration-300`}
          >
            {stage}
          </span>
          {index < stages.length - 1 && (
            <div
              className={`w-px h-8 ${
                index < currentStage - 1
                  ? "bg-green-600" // Completed connector
                  : "bg-gray-300" // Future connector
              } transition-colors duration-300`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
