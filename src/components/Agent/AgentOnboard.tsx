import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./../Footer";

interface FormData {
  userType: "agent" | "business" | "";
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNo: string;
  idNo: string;
  email: string;
  address: string;
  companyName: string;
  kraPin: string;
  location: string;
  businessType: string;
  message: string;
  policeClearance: File | null;
  curriculumVitae: File | null;
  identificationCard: File | null;
  passportPhoto: File | null;
  insuranceCertificate: File | null;
}

const PartnerApplication = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"agent" | "business">("agent");
  const [formData, setFormData] = useState<FormData>({
    userType: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNo: "",
    idNo: "",
    email: "",
    address: "",
    companyName: "",
    kraPin: "",
    location: "",
    businessType: "",
    message: "",
    policeClearance: null,
    curriculumVitae: null,
    identificationCard: null,
    passportPhoto: null,
    insuranceCertificate: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const businessTypes = [
    "Bank/Financial Institution",
    "Insurance Company",
    "Insurance Agency/Broker",
    "SACCO/Microfinance",
    "Automobile Dealer",
    "Real Estate",
    "Logistics/Transport",
    "E-commerce Platform",
    "Affinity Group",
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
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Common validations
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "Please enter a valid phone number";
    }

    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (activeTab === "agent") {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.idNo.trim()) newErrors.idNo = "ID number is required";

      // File validations for agents
      if (!formData.policeClearance)
        newErrors.policeClearance = "Police clearance is required";
      if (!formData.curriculumVitae)
        newErrors.curriculumVitae = "Curriculum vitae is required";
      if (!formData.identificationCard)
        newErrors.identificationCard = "Identification card is required";
      if (!formData.passportPhoto)
        newErrors.passportPhoto = "Passport photo is required";
      if (!formData.insuranceCertificate)
        newErrors.insuranceCertificate = "Insurance certificate is required";
    }

    if (activeTab === "business") {
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
      <div className="w-full bg-white">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-600"
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received!
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Thank you for your interest in partnering with us. Our team will
            review your application and contact you within 2 business days.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 shadow-md"
            >
              Return to Home
            </button>
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors"
            >
              Explore Our Products
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-green-900 to-green-700 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Become part of Africa's leading insurance distribution platform as
            an agent or business partner.
          </p>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Application Form
            </h2>
            <p className="text-gray-600">
              Complete this form to start your journey with us
            </p>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Are you a*
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                  activeTab === "agent"
                    ? "border-green-500 bg-green-50 text-green-700 font-medium"
                    : "border-gray-300 text-gray-700 hover:border-green-300"
                }`}
                onClick={() => setActiveTab("agent")}
              >
                Individual Agent
              </button>
              <button
                type="button"
                className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                  activeTab === "business"
                    ? "border-green-500 bg-green-50 text-green-700 font-medium"
                    : "border-gray-300 text-gray-700 hover:border-green-300"
                }`}
                onClick={() => setActiveTab("business")}
              >
                Business/Company
              </button>
            </div>
          </div>

          {Object.keys(errors).length > 0 && errors.form && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{errors.form}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeTab === "agent" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className={`w-full p-3 border rounded-lg transition bg-white ${
                        errors.firstName
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                      }`}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      placeholder="Your middle name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className={`w-full p-3 border rounded-lg transition bg-white ${
                        errors.lastName
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                      }`}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID Number*
                    </label>
                    <input
                      type="text"
                      name="idNo"
                      className={`w-full p-3 border rounded-lg transition bg-white ${
                        errors.idNo
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                      }`}
                      value={formData.idNo}
                      onChange={handleInputChange}
                      placeholder="National ID number"
                    />
                    {errors.idNo && (
                      <p className="mt-1 text-sm text-red-600">{errors.idNo}</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name*
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      className={`w-full p-3 border rounded-lg transition bg-white ${
                        errors.companyName
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                      }`}
                      value={formData.companyName}
                      onChange={handleInputChange}
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
                      name="kraPin"
                      className={`w-full p-3 border rounded-lg transition bg-white ${
                        errors.kraPin
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                      }`}
                      value={formData.kraPin}
                      onChange={handleInputChange}
                      placeholder="Company KRA PIN"
                    />
                    {errors.kraPin && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.kraPin}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Type*
                    </label>
                    <select
                      name="businessType"
                      className={`w-full p-3 border rounded-lg transition bg-white ${
                        errors.businessType
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                      }`}
                      value={formData.businessType}
                      onChange={handleInputChange}
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
                  Email Address*
                </label>
                <input
                  type="email"
                  name="email"
                  className={`w-full p-3 border rounded-lg transition bg-white ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                  }`}
                  value={formData.email}
                  onChange={handleInputChange}
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
                    name="phoneNo"
                    className={`w-full p-3 pl-20 border rounded-lg transition bg-white ${
                      errors.phoneNo
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                    }`}
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    placeholder="7XX XXX XXX"
                    maxLength={9}
                  />
                </div>
                {errors.phoneNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.phoneNo}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address*
                </label>
                <textarea
                  name="address"
                  className={`w-full p-3 border rounded-lg transition bg-white ${
                    errors.address
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                  }`}
                  rows={2}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Your complete address"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location*
                </label>
                <select
                  name="location"
                  className={`w-full p-3 border rounded-lg transition bg-white ${
                    errors.location
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                  }`}
                  value={formData.location}
                  onChange={handleInputChange}
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

              {activeTab === "agent" && (
                <>
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 mt-8">
                      Required Documents
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Please upload the following documents:
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Police Clearance Certificate*
                    </label>
                    <input
                      type="file"
                      name="policeClearance"
                      className={`w-full p-2 border rounded-lg transition bg-white ${
                        errors.policeClearance
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                      }`}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    {errors.policeClearance && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.policeClearance}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Curriculum Vitae*
                    </label>
                    <input
                      type="file"
                      name="curriculumVitae"
                      className={`w-full p-2 border rounded-lg transition bg-white ${
                        errors.curriculumVitae
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                      }`}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                    />
                    {errors.curriculumVitae && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.curriculumVitae}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Identification Card*
                    </label>
                    <input
                      type="file"
                      name="identificationCard"
                      className={`w-full p-2 border rounded-lg transition bg-white ${
                        errors.identificationCard
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                      }`}
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png,.pdf"
                    />
                    {errors.identificationCard && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.identificationCard}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passport Photo*
                    </label>
                    <input
                      type="file"
                      name="passportPhoto"
                      className={`w-full p-2 border rounded-lg transition bg-white ${
                        errors.passportPhoto
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                      }`}
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png"
                    />
                    {errors.passportPhoto && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.passportPhoto}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Insurance Regulatory Agency Certificate*
                    </label>
                    <input
                      type="file"
                      name="insuranceCertificate"
                      className={`w-full p-2 border rounded-lg transition bg-white ${
                        errors.insuranceCertificate
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                      }`}
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {errors.insuranceCertificate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.insuranceCertificate}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  name="message"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white hover:border-green-400 focus:border-green-500 focus:ring-green-500"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself and why you want to join our platform"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                By submitting this form, you agree to our{" "}
                <a href="/terms" className="text-green-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-green-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-3 bg-gradient-to-r text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg ${
                  isLoading
                    ? "from-gray-400 to-gray-600 cursor-not-allowed"
                    : "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
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
                    Processing...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-green-50 rounded-xl border border-green-100">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Competitive Commissions
            </h3>
            <p className="text-gray-600">
              Earn industry-leading commissions with performance-based
              incentives and bonuses.
            </p>
          </div>

          <div className="p-8 bg-green-50 rounded-xl border border-green-100">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Comprehensive Products
            </h3>
            <p className="text-gray-600">
              Access 100+ insurance products from 40+ insurers through a single
              platform.
            </p>
          </div>

          <div className="p-8 bg-green-50 rounded-xl border border-green-100">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Dedicated Support
            </h3>
            <p className="text-gray-600">
              Get 24/7 technical support, marketing materials, and business
              development resources.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width Footer */}
      <Footer />
    </div>
  );
};

export default PartnerApplication;
