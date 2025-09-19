import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/MotorCyclePrograssBar";

const PartnerWithUs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"individual" | "company">(
    "individual"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    idNumber: "",
    companyName: "",
    kraPin: "",
    location: "",
    businessType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const businessTypes = [
    "Insurance Agency",
    "Financial Services",
    "Automobile Dealer",
    "Real Estate",
    "Logistics/Transport",
    "Other",
  ];

  const locations = [
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.location) newErrors.location = "Location is required";

    if (activeTab === "individual" && !formData.idNumber.trim()) {
      newErrors.idNumber = "ID number is required";
    }

    if (activeTab === "company") {
      if (!formData.companyName.trim())
        newErrors.companyName = "Company name is required";
      if (!formData.kraPin.trim()) newErrors.kraPin = "KRA PIN is required";
      if (!formData.businessType)
        newErrors.businessType = "Business type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
    } catch (error) {
      setErrors({ form: "Failed to submit. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="w-full md:w-5/8 container mx-auto px-4 py-8 bg-white rounded-xl text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Thank You for Your Interest!
        </h2>
        <p className="text-gray-600 mb-6">
          We've received your partnership application. Our team will review your
          details and contact you within 2 business days.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-900"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block w-3/8 ml-16">
        <ProgressBar currentStage={1} />
      </div>

      <div className="w-full md:w-5/8 container mx-auto px-4 py-8 bg-white rounded-xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Partner With Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our network of trusted partners and grow your business with
            NaiCover's comprehensive insurance solutions and competitive
            commissions.
          </p>
        </div>

        <div className="flex mb-8 border-b">
          <button
            className={`pb-4 px-6 font-medium text-lg focus:outline-none relative ${
              activeTab === "individual"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("individual")}
          >
            Individual Agent
          </button>
          <button
            className={`pb-4 px-6 font-medium text-lg focus:outline-none relative ${
              activeTab === "company"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("company")}
          >
            Company/Business
          </button>
        </div>

        {Object.keys(errors).length > 0 && errors.form && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{errors.form}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name*
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg transition ${
                  errors.name
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address*
              </label>
              <input
                type="email"
                className={`w-full p-3 border rounded-lg transition ${
                  errors.email
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-gray-100 rounded-l-lg border-r border-gray-300">
                  <span className="text-gray-700">+254</span>
                </div>
                <input
                  type="tel"
                  className={`w-full p-3 pl-20 border rounded-lg transition ${
                    errors.phone
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value.replace(/\D/g, "").slice(0, 9),
                    })
                  }
                  placeholder="7XX XXX XXX"
                  maxLength={9}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {activeTab === "individual" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Number*
                </label>
                <input
                  type="text"
                  className={`w-full p-3 border rounded-lg transition ${
                    errors.idNumber
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                  value={formData.idNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, idNumber: e.target.value })
                  }
                  placeholder="National ID number"
                />
                {errors.idNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>
                )}
              </div>
            )}

            {activeTab === "company" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name*
                  </label>
                  <input
                    type="text"
                    className={`w-full p-3 border rounded-lg transition ${
                      errors.companyName
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    placeholder="Your company name"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    KRA PIN*
                  </label>
                  <input
                    type="text"
                    className={`w-full p-3 border rounded-lg transition ${
                      errors.kraPin
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                    value={formData.kraPin}
                    onChange={(e) =>
                      setFormData({ ...formData, kraPin: e.target.value })
                    }
                    placeholder="Company KRA PIN"
                  />
                  {errors.kraPin && (
                    <p className="mt-1 text-sm text-red-600">{errors.kraPin}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Type*
                  </label>
                  <select
                    className={`w-full p-3 border rounded-lg transition ${
                      errors.businessType
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                    value={formData.businessType}
                    onChange={(e) =>
                      setFormData({ ...formData, businessType: e.target.value })
                    }
                  >
                    <option value="">Select business type</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.businessType && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.businessType}
                    </p>
                  )}
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location*
              </label>
              <select
                className={`w-full p-3 border rounded-lg transition ${
                  errors.location
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              >
                <option value="">Select your location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Message
              </label>
              <textarea
                className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell us more about your business and partnership expectations"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-3 bg-gradient-to-r text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg ${
                isLoading
                  ? "from-gray-400 to-gray-600 cursor-not-allowed"
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
                  Submitting...
                </>
              ) : (
                "Submit Partnership Request"
              )}
            </button>
          </div>
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Competitive Commissions
            </h3>
            <p className="text-gray-600">
              Earn attractive commissions on every policy sold through our
              partner network.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Dedicated Support
            </h3>
            <p className="text-gray-600">
              Get dedicated account management and marketing support to grow
              your business.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Comprehensive Products
            </h3>
            <p className="text-gray-600">
              Access our wide range of insurance products to meet all your
              customers' needs.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerWithUs;
