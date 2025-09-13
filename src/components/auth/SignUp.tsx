import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/MotorCyclePrograssBar";

const AuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  // Password strength indicator
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    message: string;
  }>({ score: 0, message: "" });

  const validateEmail = (email: string) => {
    if (!email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    let message = "";

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) message = "Weak";
    else if (score <= 4) message = "Medium";
    else message = "Strong";

    setPasswordStrength({ score, message });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (activeTab === "register") {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";

      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[0-9]{9,15}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }

      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrors.password = passwordError;

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (!formData.acceptedTerms) {
        newErrors.acceptedTerms = "You must accept the terms and conditions";
      }
    } else {
      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;

      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }

    setErrors(newErrors);
    setShowError(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    if (field === "password") {
      checkPasswordStrength(value as string);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (activeTab === "register") {
        console.log("registration trial");
        const response = await fetch("http://localhost:8000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.firstName + " " + formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            password_confirmation: formData.password,
          }),
        });

        console.log(response);

        if (!response.ok) {
          const errorData = await response.json();
          setShowError(true);
          setErrors({ api: errorData.message || "Registration failed" });
          setIsLoading(false);
          return;
        }

        setShowVerificationModal(true);
      } else {
        const response = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setShowError(true);
          setErrors({ api: errorData.message || "Login failed" });
          setIsLoading(false);
          return;
        }

        navigate("/insurance/motor-car/coverage");
      }
    } catch (err) {
      setShowError(true);
      setErrors({ api: "Network error. Please try again." });
    }

    setIsLoading(false);
  };

  const handleModalConfirm = () => {
    setShowVerificationModal(false);
    navigate("/insurance/motor-car/coverage");
  };

  const fields =
    activeTab === "register"
      ? [
          {
            id: "firstName",
            label: "First Name",
            type: "text",
            placeholder: "Enter your first name",
            required: true,
            colSpan: 1,
          },
          {
            id: "lastName",
            label: "Last Name",
            type: "text",
            placeholder: "Enter your last name",
            required: true,
            colSpan: 1,
          },
          {
            id: "email",
            label: "Email Address",
            type: "email",
            placeholder: "Enter your email",
            required: true,
            colSpan: 2,
          },
          {
            id: "phone",
            label: "Phone Number",
            type: "tel",
            placeholder: "712 345 678",
            required: true,
            colSpan: 2,
            prefix: "+254",
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "Create a password",
            required: true,
            colSpan: 2,
            showToggle: true,
          },
          {
            id: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: "Confirm your password",
            required: true,
            colSpan: 2,
            showToggle: true,
          },
        ]
      : [
          {
            id: "email",
            label: "Email Address",
            type: "email",
            placeholder: "Enter your email",
            required: true,
            colSpan: 2,
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
            required: true,
            colSpan: 2,
            showToggle: true,
          },
          {
            id: "rememberMe",
            label: "Remember me",
            type: "checkbox",
            colSpan: 2,
          },
        ];

  return (
    <div className="flex min-h-screen">
      {/* Progress Bar Section */}
      <div className="w-1/5 bg-gray-100 flex justify-center">
        <div className="w-full">
          <ProgressBar currentStage={2} />
        </div>
      </div>

      {/* Form Section - 5/8 width */}
      <div className="w-4/5 flex  justify-center">
        <div className="w-full shadow-lg overflow-hidden bg-white rounded-xl mt-6">
          <div className="flex">
            <div className="w-1/2 bg-gradient-to-br from-green-600 to-green-800 p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Secure Your Journey</h2>
              <p className="text-green-100 mb-6">
                Join thousands of satisfied customers who trust us with their
                insurance needs.
              </p>
              <div className="space-y-4 mt-12">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full p-2 mr-4">
                    <svg
                      className="h-6 w-6"
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
                  <span>Comprehensive coverage options</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full p-2 mr-4">
                    <svg
                      className="h-6 w-6"
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
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full p-2 mr-4">
                    <svg
                      className="h-6 w-6"
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
                  <span>Fast claims processing</span>
                </div>
              </div>
            </div>

            <div className="w-1/2 p-8">
              <div className="flex mb-8 border-b">
                <button
                  className={`pb-3 px-4 font-medium text-md focus:outline-none relative ${
                    activeTab === "register"
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("register")}
                >
                  Create Account
                </button>
                <button
                  className={`pb-3 px-4 font-medium text-md focus:outline-none relative ${
                    activeTab === "login"
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("login")}
                >
                  Sign In
                </button>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {activeTab === "register"
                  ? "Join Our Community"
                  : "Welcome Back!"}
              </h1>
              <p className="text-gray-600 ">
                {activeTab === "register"
                  ? "Create an account to get started with your insurance journey"
                  : "Sign in to continue to your insurance dashboard"}
              </p>

              {showError && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                  <p>Please correct the errors below before continuing.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className={`${
                        field.colSpan === 2 ? "md:col-span-2" : ""
                      } ${
                        field.type === "checkbox" ? "flex items-center" : ""
                      }`}
                    >
                      {field.type !== "checkbox" && (
                        <label
                          htmlFor={field.id}
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {field.label}
                          {field.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                      )}

                      {field.type === "text" ||
                      field.type === "email" ||
                      field.type === "tel" ? (
                        <div className="relative">
                          {field.prefix && (
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-gray-100 rounded-l-lg border-r border-gray-300">
                              <span className="text-gray-700 text-sm">
                                {field.prefix}
                              </span>
                            </div>
                          )}
                          <input
                            id={field.id}
                            type={field.type}
                            className={`block w-full p-3 border rounded-lg transition ${
                              errors[field.id]
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300 bg-gray-50 hover:border-gray-400 focus:ring-green-500 focus:border-green-500"
                            } ${field.prefix ? "pl-16" : ""}`}
                            value={
                              formData[
                                field.id as keyof typeof formData
                              ] as string
                            }
                            onChange={(e) =>
                              handleChange(field.id, e.target.value)
                            }
                            placeholder={field.placeholder}
                          />
                          {errors[field.id] && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors[field.id]}
                            </p>
                          )}
                        </div>
                      ) : field.type === "password" ? (
                        <div className="relative">
                          <input
                            id={field.id}
                            type={
                              field.id === "password"
                                ? showPassword
                                  ? "text"
                                  : "password"
                                : showConfirmPassword
                                ? "text"
                                : "password"
                            }
                            className={`block w-full p-3 border rounded-lg transition ${
                              errors[field.id]
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300 bg-gray-50 hover:border-gray-400 focus:ring-green-500 focus:border-green-500"
                            }`}
                            value={
                              formData[
                                field.id as keyof typeof formData
                              ] as string
                            }
                            onChange={(e) =>
                              handleChange(field.id, e.target.value)
                            }
                            placeholder={field.placeholder}
                          />
                          {field.showToggle && (
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                              onClick={() =>
                                field.id === "password"
                                  ? setShowPassword(!showPassword)
                                  : setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {field.id === "password" ? (
                                showPassword ? (
                                  <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
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
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
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
                                )
                              ) : showConfirmPassword ? (
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
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
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
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
                          )}
                          {errors[field.id] && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors[field.id]}
                            </p>
                          )}
                          {field.id === "password" && formData.password && (
                            <div className="mt-2">
                              <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      passwordStrength.score <= 2
                                        ? "bg-red-500"
                                        : passwordStrength.score <= 4
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                    }`}
                                    style={{
                                      width: `${
                                        (passwordStrength.score / 5) * 100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="ml-2 text-xs text-gray-600">
                                  {passwordStrength.message}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : field.type === "checkbox" ? (
                        <div className="flex items-center">
                          <input
                            id={field.id}
                            type="checkbox"
                            checked={
                              formData[
                                field.id as keyof typeof formData
                              ] as boolean
                            }
                            onChange={(e) =>
                              handleChange(field.id, e.target.checked)
                            }
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={field.id}
                            className="ml-2 block text-sm text-gray-700"
                          >
                            {field.label}
                          </label>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>

                {activeTab === "register" && (
                  <div className="md:col-span-2">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="acceptedTerms"
                          type="checkbox"
                          checked={formData.acceptedTerms}
                          onChange={(e) =>
                            handleChange("acceptedTerms", e.target.checked)
                          }
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="acceptedTerms"
                          className="text-gray-700"
                        >
                          I accept the{" "}
                          <button
                            type="button"
                            onClick={() => setShowTermsModal(true)}
                            className="text-green-600 hover:text-green-800 font-medium"
                          >
                            Terms and Conditions
                          </button>
                        </label>
                        {errors.acceptedTerms && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.acceptedTerms}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "login" && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        id="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) =>
                          handleChange("rememberMe", e.target.checked)
                        }
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
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
                      className="text-sm text-green-600 hover:text-green-800 focus:outline-none transition-colors duration-300"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      (activeTab === "register" && !formData.acceptedTerms)
                    }
                    className={`w-full px-6 py-3 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors shadow-md ${
                      isLoading ||
                      (activeTab === "register" && !formData.acceptedTerms)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
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
                        {activeTab === "register"
                          ? "Creating Account..."
                          : "Signing In..."}
                      </>
                    ) : (
                      <>
                        {activeTab === "register"
                          ? "Create Account"
                          : "Sign In"}
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
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-sm text-gray-600 pt-4">
                  {activeTab === "register" ? (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("login")}
                        className="text-green-600 hover:text-green-800 font-medium focus:outline-none"
                      >
                        Sign in
                      </button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("register")}
                        className="text-green-600 hover:text-green-800 font-medium focus:outline-none"
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Terms & Conditions
            </h2>

            <div className="prose prose-sm max-w-none mb-6">
              <p className="mb-4">
                Welcome to our insurance platform. These terms and conditions
                outline the rules and regulations for the use of our website and
                services.
              </p>

              <h3 className="font-semibold mt-4">1. Acceptance of Terms</h3>
              <p className="mb-3">
                By accessing this website and using our services, you accept
                these terms and conditions in full. Do not continue to use our
                website if you do not accept all of the terms and conditions
                stated on this page.
              </p>

              <h3 className="font-semibold mt-4">2. License to Use Website</h3>
              <p className="mb-3">
                Unless otherwise stated, we own the intellectual property rights
                for all material on this website. You may view and use the
                website for your personal purposes subject to restrictions set
                in these terms and conditions.
              </p>

              <h3 className="font-semibold mt-4">3. User Account</h3>
              <p className="mb-3">
                If you create an account on our website, you are responsible for
                maintaining the security of your account and you are fully
                responsible for all activities that occur under the account. You
                must immediately notify us of any unauthorized uses of your
                account or any other breaches of security.
              </p>

              <h3 className="font-semibold mt-4">4. Insurance Services</h3>
              <p className="mb-3">
                Our platform provides insurance comparison and purchase
                services. The actual insurance contracts are between you and the
                insurance provider, not with us. We are not liable for any
                claims, losses, or damages resulting from your insurance policy.
              </p>

              <h3 className="font-semibold mt-4">5. Privacy Policy</h3>
              <p className="mb-3">
                Your privacy is important to us. Our Privacy Policy explains how
                we collect, use, and protect your personal information. By using
                our service, you agree to the collection and use of information
                in accordance with our Privacy Policy.
              </p>

              <h3 className="font-semibold mt-4">
                6. Limitations of Liability
              </h3>
              <p className="mb-3">
                In no event shall we be liable for any indirect, incidental,
                special, consequential or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from your access to or use of or
                inability to access or use the services.
              </p>

              <h3 className="font-semibold mt-4">7. Changes to Terms</h3>
              <p className="mb-3">
                We reserve the right to modify these terms and conditions at any
                time. You should check this page regularly to ensure you are
                familiar with the current version.
              </p>

              <h3 className="font-semibold mt-4">8. Governing Law</h3>
              <p className="mb-3">
                These terms and conditions are governed by and construed in
                accordance with the laws of your country, and you irrevocably
                submit to the exclusive jurisdiction of the courts in that
                location.
              </p>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  handleChange("acceptedTerms", true);
                  setShowTermsModal(false);
                }}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:bg-green-700"
              >
                I Accept the Terms & Conditions
              </button>
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-6 py-3 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
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
              <span className="font-semibold">{formData.email}</span>. Please
              check your inbox and click the link to verify your email address.
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleModalConfirm}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:bg-green-700"
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
    </div>
  );
};

export default AuthPage;
