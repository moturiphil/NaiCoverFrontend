import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/MotorCyclePrograssBar";

const InsuranceCoverPayment = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber =
        "Please enter a valid MPESA phone number (e.g., 07XXXXXXXX)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate MPESA payment initiation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you would call your backend API here to initiate MPESA payment
      // const response = await initiateMpesaPayment(phoneNumber);

      setPaymentInitiated(true);

      // Simulate payment completion
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // On successful payment, navigate to confirmation
      navigate("/payment-confirmation");
    } catch (error) {
      console.error("Payment error:", error);
      setErrors({
        payment: "Failed to initiate MPESA payment. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="hidden md:block w-3/8 ml-16">
        <ProgressBar currentStage={5} /> {/* Adjust stage as needed */}
      </div>

      <div className="w-full md:w-5/8 container mx-auto px-4 py-8 bg-white rounded-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Complete Your Insurance Payment
        </h1>
        <p className="text-gray-600 mb-8">
          Pay securely via MPESA to activate your insurance cover
        </p>

        {Object.keys(errors).length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {errors.payment || "Please correct the errors below"}
          </div>
        )}

        <form onSubmit={handlePayment} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Payment Amount Display */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">
                  Total Amount:
                </span>
                <span className="text-2xl font-bold text-green-600">
                  KES 12,345
                </span>
              </div>
            </div>

            {/* MPESA Payment Instructions */}
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                MPESA Payment Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Enter your MPESA registered phone number</li>
                <li>Click "Pay with MPESA" button</li>
                <li>Check your phone for MPESA prompt</li>
                <li>Enter your MPESA PIN to complete payment</li>
              </ol>
            </div>

            {/* Phone Number Input */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                MPESA Phone Number*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-gray-100 rounded-l-lg border-r border-gray-300">
                  <span className="text-gray-700">+254</span>
                </div>
                <input
                  id="phoneNumber"
                  type="tel"
                  className={`w-full p-3 pl-20 border rounded-lg transition ${
                    errors.phoneNumber
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300 focus:ring-green-600 focus:border-green-600"
                  }`}
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 9)
                    );
                    if (errors.phoneNumber)
                      setErrors({ ...errors, phoneNumber: "" });
                  }}
                  placeholder="7XX XXX XXX"
                  maxLength={9}
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phoneNumber}
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
              disabled={isLoading || paymentInitiated}
              className={`px-6 py-3 bg-gradient-to-r text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg ${
                isLoading || paymentInitiated
                  ? "from-yellow-500 to-yellow-600 cursor-not-allowed"
                  : "from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Initiating Payment...
                </>
              ) : paymentInitiated ? (
                "Awaiting MPESA Confirmation..."
              ) : (
                "Pay with MPESA"
              )}
            </button>
          </div>
        </form>

        {/* Payment Processing Modal */}
        {paymentInitiated && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full animate-fade-in">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                Complete Payment on Your Phone
              </h2>
              <p className="text-gray-600 text-center mb-6">
                We've sent an MPESA payment request to{" "}
                <span className="font-semibold">+254{phoneNumber}</span>. Please
                check your phone and enter your MPESA PIN to complete the
                payment.
              </p>
              <div className="flex justify-center">
                <div className="animate-pulse flex space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InsuranceCoverPayment;
