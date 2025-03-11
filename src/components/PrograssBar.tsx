import React from "react";

interface ProgressBarProps {
  currentStage: number;
}

const stages = ["Start", "Vehicles", "Coverage", "Results"];

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStage }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {stages.map((stage, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-4 h-4 rounded-full ${
              currentStage === index
                ? "bg-blue-500"
                : index < currentStage
                ? "bg-black"
                : "bg-gray-300"
            }`}
          ></div>
          <span
            className={`mt-2 text-sm ${
              currentStage === index ? "text-blue-500" : "text-black"
            }`}
          >
            {stage}
          </span>
          {index < stages.length - 1 && (
            <div className="w-px h-8 bg-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
