import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/PrograssBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CarInsuranceValuation = () => {
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState({
    registrationNumber: "",
    logBook: null as File | null,
    securityFeatures: {
      alarm: false,
      cutOff: false,
      gearLock: false,
      steeringLock: false,
      factoryFitted: false,
    },
    policyStartDate: null as Date | null,
    idNumber: "",
    idFront: null as File | null,
    idBack: null as File | null,
    valuationDate: null as Date | null,
    valuationTime: "",
    valuationLocation: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name in carDetails.securityFeatures) {
      setCarDetails((prev) => ({
        ...prev,
        securityFeatures: {
          ...prev.securityFeatures,
          [name]: checked,
        },
      }));
    } else {
      setCarDetails((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      setCarDetails((prev) => ({
        ...prev,
        [field]: e.target.files![0],
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!carDetails.registrationNumber) {
      newErrors.registrationNumber = "Registration number is required";
    }

    if (!carDetails.logBook) {
      newErrors.logBook = "Log book is required";
    }

    if (!carDetails.policyStartDate) {
      newErrors.policyStartDate = "Policy start date is required";
    } else if (carDetails.policyStartDate <= new Date()) {
      newErrors.policyStartDate = "Start date must be in the future";
    }

    if (!carDetails.idNumber) {
      newErrors.idNumber = "ID number is required";
    }

    if (!carDetails.idFront) {
      newErrors.idFront = "Front ID photo is required";
    }

    if (!carDetails.idBack) {
      newErrors.idBack = "Back ID photo is required";
    }

    if (!carDetails.valuationDate) {
      newErrors.valuationDate = "Valuation date is required";
    }

    if (!carDetails.valuationTime) {
      newErrors.valuationTime = "Valuation time is required";
    }

    if (!carDetails.valuationLocation) {
      newErrors.valuationLocation = "Valuation location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Save to localStorage or state management
      localStorage.setItem("carDetails", JSON.stringify(carDetails));
      navigate("/next-step"); // Replace with your actual next step route
    }
  };


  return (
    <>
      <div className="hidden md:block w-3/8 ml-16">
        <ProgressBar currentStage={4} />
      </div>
      <div className="w-full md:w-5/8 container mx-auto px-4 py-8 bg-white rounded-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Vehicle Information
        </h1>
        <p className="text-gray-600 mb-8">
          Please provide details about your vehicle
        </p>

        {/* Car Information Section */}
        <div className="w-full bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Vehicle Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Registration Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={carDetails.registrationNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="e.g. KAA 123A"
              />
              {errors.registrationNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.registrationNumber}
                </p>
              )}
            </div>

            {/* Log Book Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Car Log Book (PDF/Image)
              </label>
              <div className="flex items-center">
                <label className="flex flex-col items-center px-4 py-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">
                    {carDetails.logBook
                      ? carDetails.logBook.name
                      : "Choose file"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "logBook")}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.logBook && (
                <p className="mt-1 text-sm text-red-600">{errors.logBook}</p>
              )}
            </div>

            {/* Security Features */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Security Features (Check all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { id: "alarm", label: "Alarm" },
                  { id: "cutOff", label: "Cut Off" },
                  { id: "gearLock", label: "Gear Lock" },
                  { id: "steeringLock", label: "Steering Lock" },
                  { id: "factoryFitted", label: "Factory Fitted" },
                ].map((feature) => (
                  <div key={feature.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={feature.id}
                      name={feature.id}
                      checked={
                        carDetails.securityFeatures[
                          feature.id as keyof typeof carDetails.securityFeatures
                        ]
                      }
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={feature.id}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {feature.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Policy Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Policy Start Date
              </label>
              {/* <DatePicker
                selected={carDetails.policyStartDate}
                onChange={(date: Date | null) =>
                  setCarDetails((prev) => ({ ...prev, policyStartDate: date }))
                }
                minDate={new Date()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholderText="Select a future date"
              /> */}
              {errors.policyStartDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.policyStartDate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ID Information Section */}
        <div className="w-full bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Identification Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ID Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Number
              </label>
              <input
                type="text"
                name="idNumber"
                value={carDetails.idNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Your national ID number"
              />
              {errors.idNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>
              )}
            </div>

            {/* ID Front Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Front of ID (Image)
              </label>
              <div className="flex items-center">
                <label className="flex flex-col items-center px-4 py-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">
                    {carDetails.idFront
                      ? carDetails.idFront.name
                      : "Choose file"}
                  </span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "idFront")}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.idFront && (
                <p className="mt-1 text-sm text-red-600">{errors.idFront}</p>
              )}
            </div>

            {/* ID Back Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Back of ID (Image)
              </label>
              <div className="flex items-center">
                <label className="flex flex-col items-center px-4 py-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">
                    {carDetails.idBack ? carDetails.idBack.name : "Choose file"}
                  </span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "idBack")}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.idBack && (
                <p className="mt-1 text-sm text-red-600">{errors.idBack}</p>
              )}
            </div>
          </div>
        </div>

        {/* Valuation Booking Section */}
        <div className="w-full bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Vehicle Valuation Appointment
          </h2>
          <p className="text-gray-600 mb-6">
            Where do you want your valuation done? Book your valuation now. One
            of our valuers will come to your location. Choose your convenient
            time from 8AM - 5PM any day from Monday to Friday.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Valuation Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valuation Date
              </label>
              {/* <DatePicker
                selected={carDetails.valuationDate}
                onChange={(date: Date) =>
                  setCarDetails((prev) => ({ ...prev, valuationDate: date }))
                }
                minDate={new Date()}
                filterDate={(date) =>
                  date.getDay() !== 0 && date.getDay() !== 6
                } // Only weekdays
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholderText="Select a weekday"
              /> */}
              {errors.valuationDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.valuationDate}
                </p>
              )}
            </div>

            {/* Valuation Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valuation Time
              </label>
              <select
                name="valuationTime"
                value={carDetails.valuationTime}
                onChange={(e) =>
                  setCarDetails((prev) => ({
                    ...prev,
                    valuationTime: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select a time</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const hour = 8 + i; // From 8AM to 5PM
                  return (
                    <option key={hour} value={`${hour}:00`}>
                      {hour}:00 AM - {hour + 1}:00 AM
                    </option>
                  );
                })}
              </select>
              {errors.valuationTime && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.valuationTime}
                </p>
              )}
            </div>

            {/* Valuation Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valuation Location
              </label>
              <input
                type="text"
                name="valuationLocation"
                value={carDetails.valuationLocation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Your preferred location"
              />
              {errors.valuationLocation && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.valuationLocation}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg"
          >
            <svg
              className="w-4 h-4 mr-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg"
          >
            Continue
            <svg
              className="w-4 h-4 ml-2"
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

export default CarInsuranceValuation;
