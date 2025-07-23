import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/MotorCyclePrograssBar";

const AuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");

  // Registration form state
  const [regFormData, setRegFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Login form state
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Common validation for both forms
  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Please enter a valid email";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    return "";
  };

  // Registration validation
  const validateRegistration = () => {
    const newErrors: Record<string, string> = {};

    if (!regFormData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!regFormData.lastName.trim())
      newErrors.lastName = "Last name is required";

    const emailError = validateEmail(regFormData.email);
    if (emailError) newErrors.email = emailError;

    if (!regFormData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{9,15}$/.test(regFormData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    const passwordError = validatePassword(regFormData.password);
    if (passwordError) newErrors.password = passwordError;

    if (regFormData.password !== regFormData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Login validation
  const validateLogin = () => {
    const newErrors: Record<string, string> = {};

    const emailError = validateEmail(loginFormData.email);
    if (emailError) newErrors.loginEmail = emailError;

    const passwordError = validatePassword(loginFormData.password);
    if (passwordError) newErrors.loginPassword = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegChange = (field: string, value: string) => {
    setRegFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleLoginChange = (field: string, value: string) => {
    setLoginFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[`login${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      setErrors((prev) => ({
        ...prev,
        [`login${field.charAt(0).toUpperCase() + field.slice(1)}`]: "",
      }));
    }
  };

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateRegistration()) {
      setShowTermsModal(true);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin()) {
      // Handle login logic here
      console.log("Login submitted:", loginFormData);
      navigate("/insurance/motor-car/coverage");
    }
  };

  const handleTermsAccept = () => {
    setShowTermsModal(false);
    localStorage.setItem("userData", JSON.stringify(regFormData));
    setShowVerificationModal(true);
  };

  const handleModalConfirm = () => {
    setShowVerificationModal(false);
    navigate("/insurance/motor-car/coverage");
  };

  return (
    <>
      <div className="hidden md:block w-3/8 ml-16">
        <ProgressBar currentStage={2} />
      </div>
      <div className="w-full md:w-5/8 container mx-auto px-4 py-8 bg-white rounded-xl shadow-lg">
        {/* Enhanced Tab Navigation */}
        <div className="flex mb-8">
          <button
            className={`flex-1 py-4 px-6 font-medium text-sm focus:outline-none transition-all duration-300 ${
              activeTab === "register"
                ? "text-white bg-gradient-to-r from-green-500 to-green-700 rounded-t-lg shadow-md"
                : "text-gray-600 hover:text-green-600 hover:bg-green-50"
            } relative overflow-hidden group`}
            onClick={() => setActiveTab("register")}
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Create Account
            </span>
            {activeTab === "register" && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-green-400"></span>
            )}
          </button>
          <button
            className={`flex-1 py-4 px-6 font-medium text-sm focus:outline-none transition-all duration-300 ${
              activeTab === "login"
                ? "text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-lg shadow-md"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            } relative overflow-hidden group`}
            onClick={() => setActiveTab("login")}
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign In
            </span>
            {activeTab === "login" && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400"></span>
            )}
          </button>
        </div>

        {activeTab === "register" ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join Our Community
            </h1>

            <form onSubmit={handleRegSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name*
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className={`w-full p-3 border rounded-lg transition ${
                      errors.firstName
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    }`}
                    value={regFormData.firstName}
                    onChange={(e) =>
                      handleRegChange("firstName", e.target.value)
                    }
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name*
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className={`w-full p-3 border rounded-lg transition ${
                      errors.lastName
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    }`}
                    value={regFormData.lastName}
                    onChange={(e) =>
                      handleRegChange("lastName", e.target.value)
                    }
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address*
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full p-3 border rounded-lg transition ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  }`}
                  value={regFormData.email}
                  onChange={(e) => handleRegChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-gray-100 rounded-l-lg border-r border-gray-300">
                    <span className="text-gray-700">+254</span>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    className={`w-full p-3 pl-20 border rounded-lg transition ${
                      errors.phone
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    }`}
                    value={regFormData.phone}
                    onChange={(e) => handleRegChange("phone", e.target.value)}
                    placeholder="712 345 678"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password*
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full p-3 border rounded-lg transition ${
                      errors.password
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    }`}
                    value={regFormData.password}
                    onChange={(e) =>
                      handleRegChange("password", e.target.value)
                    }
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password*
                </label>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  className={`w-full p-3 border rounded-lg transition ${
                    errors.confirmPassword
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  }`}
                  value={regFormData.confirmPassword}
                  onChange={(e) =>
                    handleRegChange("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg hover:from-gray-600 hover:to-gray-800 flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
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
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg hover:from-green-700 hover:to-green-900 flex items-center"
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
            </form>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back!
            </h1>


            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="loginEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address*
                </label>
                <input
                  id="loginEmail"
                  type="email"
                  className={`w-full p-3 border rounded-lg transition ${
                    errors.loginEmail
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  }`}
                  value={loginFormData.email}
                  onChange={(e) => handleLoginChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
                {errors.loginEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.loginEmail}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="loginPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password*
                </label>
                <div className="relative">
                  <input
                    id="loginPassword"
                    type={showPassword ? "text" : "password"}
                    className={`w-full p-3 border rounded-lg transition ${
                      errors.loginPassword
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    }`}
                    value={loginFormData.password}
                    onChange={(e) =>
                      handleLoginChange("password", e.target.value)
                    }
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.loginPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.loginPassword}
                  </p>
                )}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none transition-colors duration-300"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg hover:from-gray-600 hover:to-gray-800 flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
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
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-900 flex items-center"
                >
                  Sign In
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
            </form>
          </>
        )}
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Terms & Conditions
            </h2>

            <div className="prose prose-sm max-w-none mb-6">
              <h3 className="font-semibold">1. Acceptance of Terms</h3>
              <p>
                By creating an account with our insurance platform, you agree to
                be bound by these Terms and Conditions. If you do not agree with
                any part of these terms, you must not use our services.
              </p>

              <h3 className="font-semibold mt-4">2. Account Registration</h3>
              <p>
                You must provide accurate and complete information during
                registration. You are responsible for maintaining the
                confidentiality of your account credentials and for all
                activities that occur under your account.
              </p>

              <h3 className="font-semibold mt-4">3. Privacy Policy</h3>
              <p>
                Your personal information will be handled in accordance with our
                Privacy Policy. We may use your information to provide services,
                process claims, and for marketing purposes.
              </p>

              <h3 className="font-semibold mt-4">4. Insurance Services</h3>
              <p>
                Our platform facilitates the purchase of insurance products but
                does not guarantee coverage. All policies are subject to the
                terms and conditions set by the respective insurance providers.
              </p>

              <h3 className="font-semibold mt-4">5. Premium Payments</h3>
              <p>
                You agree to pay all premiums and fees associated with your
                insurance policy. Failure to make timely payments may result in
                cancellation of coverage.
              </p>

              <h3 className="font-semibold mt-4">6. Claims Processing</h3>
              <p>
                All claims are subject to investigation and approval by the
                insurance provider. We are not responsible for claim decisions
                made by third-party insurers.
              </p>

              <h3 className="font-semibold mt-4">7. Limitation of Liability</h3>
              <p>
                Our platform shall not be liable for any indirect, incidental,
                or consequential damages arising from the use of our services or
                inability to obtain insurance coverage.
              </p>

              <h3 className="font-semibold mt-4">8. Amendments</h3>
              <p>
                We reserve the right to modify these terms at any time.
                Continued use of our services after changes constitutes
                acceptance of the new terms.
              </p>

              <h3 className="font-semibold mt-4">9. Governing Law</h3>
              <p>
                These terms shall be governed by and construed in accordance
                with the laws of Kenya. Any disputes shall be subject to the
                exclusive jurisdiction of Kenyan courts.
              </p>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={handleTermsAccept}
                className="px-6 py-3 bg-gradient-to-r text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
              >
                I Accept the Terms & Conditions
              </button>
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-6 py-3 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Email Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-600 text-center mb-6">
              We've sent a verification link to{" "}
              <span className="font-semibold">{regFormData.email}</span>. Please
              check your inbox and click the link to verify your email address.
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleModalConfirm}
                className="px-6 py-3 bg-gradient-to-r text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
              >
                I've verified my email
              </button>
              <button
                onClick={() => setShowVerificationModal(false)}
                className="px-6 py-3 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Resend Email
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthPage;
