import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/MotorCyclePrograssBar"; // Make sure this import path is correct

const CarValuationSelection = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [valuationDetails, setValuationDetails] = useState({
    valuationDate: "",
    valuationTime: "",
    valuationLocation: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const kenyanTowns = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Eldoret",
    "Thika",
    "Malindi",
    "Kitale",
    "Kakamega",
    "Kisii",
    "Nyeri",
    "Meru",
    "Nanyuki",
    "Naivasha",
    "Machakos",
  ];

  // Generate time slots from 8AM to 5PM
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = 8 + i;
    return {
      value: `${hour}:00`,
      label: `${hour}:00 - ${hour + 1}:00 ${hour < 12 ? "AM" : "PM"}`,
    };
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (field: string, value: string) => {
    setValuationDetails((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!valuationDetails.valuationDate)
      newErrors.valuationDate = "Valuation date is required";
    if (!valuationDetails.valuationTime)
      newErrors.valuationTime = "Please select a time slot";
    if (!valuationDetails.valuationLocation)
      newErrors.valuationLocation = "Please select a location";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        localStorage.setItem(
          "valuationDetails",
          JSON.stringify(valuationDetails)
        );
        navigate("/payment");
      }
    } catch (error) {
      setLoadError("Failed to save valuation details");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadError) {
    return (
      <div className="w-full md:w-5/8 container mx-auto px-4 py-8 bg-white rounded-xl">
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {loadError}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // const handleSubmit = () => {
  //   if (!isFormValid()) {
  //     setShowError(true);
  //     return;
  //   }

  //   // Save data to cache
  //   saveToCache();

  //   // Navigate to signup page
  //   navigate("/signup");
  // };

  return (
    <>
      {/* Progress Bar - Now visible on all screen sizes */}
      <div className="hidden md:block w-3/8 ml-16">
        <ProgressBar currentStage={4} />
      </div>

      <div className="w-full md:w-5/8 container mx-auto px-4 py-8 bg-white rounded-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Schedule Your Vehicle Valuation
        </h1>
        <p className="text-gray-600 mb-8">
          Select your preferred valuation date, time and location
        </p>

        {Object.keys(errors).length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>Please fill in all required fields</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Valuation Date */}
            <div className="md:col-span-1">
              <label
                htmlFor="valuationDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Valuation Date*
              </label>
              <input
                id="valuationDate"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className={`w-full p-3 border rounded-lg transition ${
                  errors.valuationDate
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 focus:ring-green-600 focus:border-green-600"
                }`}
                value={valuationDetails.valuationDate}
                onChange={(e) => handleChange("valuationDate", e.target.value)}
              />
              {errors.valuationDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.valuationDate}
                </p>
              )}
            </div>

            {/* Valuation Time */}
            <div className="md:col-span-1">
              <label
                htmlFor="valuationTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Valuation Time*
              </label>
              <select
                id="valuationTime"
                className={`w-full p-3 border rounded-lg transition ${
                  errors.valuationTime
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 focus:ring-green-600 focus:border-green-600"
                }`}
                value={valuationDetails.valuationTime}
                onChange={(e) => handleChange("valuationTime", e.target.value)}
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
              {errors.valuationTime && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.valuationTime}
                </p>
              )}
            </div>

            {/* Valuation Location */}
            <div className="md:col-span-2">
              <label
                htmlFor="valuationLocation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Valuation Location*
              </label>
              <select
                id="valuationLocation"
                className={`w-full p-3 border rounded-lg transition ${
                  errors.valuationLocation
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 focus:ring-green-600 focus:border-green-600"
                }`}
                value={valuationDetails.valuationLocation}
                onChange={(e) =>
                  handleChange("valuationLocation", e.target.value)
                }
              >
                <option value="">Select your town</option>
                {kenyanTowns.map((town) => (
                  <option key={town} value={town}>
                    {town}
                  </option>
                ))}
              </select>
              {errors.valuationLocation && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.valuationLocation}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={isLoading}
              className="px-6 py-3 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-900 disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CarValuationSelection;
