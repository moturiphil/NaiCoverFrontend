import { useState } from "react";
import { Footer } from "./../Footer";

const AskAnAgent = () => {
  const [activeTab, setActiveTab] = useState<"ask" | "faq" | "live">("ask");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Sample FAQ data
  const faqs = [
    {
      question: "What documents do I need to make an insurance claim?",
      answer:
        "Typically you'll need your policy number, ID, proof of loss/damage, and any relevant police reports. The exact requirements vary by claim type.",
    },
    {
      question: "How can I lower my insurance premiums?",
      answer:
        "Consider increasing your deductible, bundling policies, maintaining a good claims history, and asking about available discounts.",
    },
    {
      question:
        "What's the difference between comprehensive and third-party coverage?",
      answer:
        "Comprehensive covers damage to your own vehicle from accidents, theft, or natural events. Third-party only covers damage you cause to others.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    setSubmitted(true);
    setMessage("");
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-green-900 to-green-700 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ask an Insurance Agent
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Get expert advice from our licensed insurance professionals
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap mb-8 border-b border-gray-200 bg-white">
          <button
            className={`pb-4 px-6 font-medium text-lg focus:outline-none relative transition-all duration-200 ${
              activeTab === "ask"
                ? "text-green-600 bg-green-50"
                : "text-gray-600 hover:text-green-500 hover:bg-green-50"
            }`}
            onClick={() => setActiveTab("ask")}
          >
            Ask a Question
            {activeTab === "ask" && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-t"></span>
            )}
          </button>
          <button
            className={`pb-4 px-6 font-medium text-lg focus:outline-none relative transition-all duration-200 ${
              activeTab === "faq"
                ? "text-green-600 bg-green-50"
                : "text-gray-600 hover:text-green-500 hover:bg-green-50"
            }`}
            onClick={() => setActiveTab("faq")}
          >
            FAQ
            {activeTab === "faq" && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-t"></span>
            )}
          </button>
          <button
            className={`pb-4 px-6 font-medium text-lg focus:outline-none relative transition-all duration-200 ${
              activeTab === "live"
                ? "text-green-600 bg-green-50"
                : "text-gray-600 hover:text-green-500 hover:bg-green-50"
            }`}
            onClick={() => setActiveTab("live")}
          >
            Live Chat
            {activeTab === "live" && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-t"></span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          {activeTab === "ask" && (
            <div>
              {submitted ? (
                <div className="text-center py-12">
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
                    Question Submitted!
                  </h2>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Our agents will review your question and respond within 24
                    hours. Check your email for updates.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
                  >
                    Ask Another Question
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Question*
                    </label>
                    <textarea
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 min-h-[150px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your insurance question here..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name*
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Insurance Type
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500">
                        <option value="">Select insurance type</option>
                        <option>Motor Insurance</option>
                        <option>Health Insurance</option>
                        <option>Life Insurance</option>
                        <option>Property Insurance</option>
                        <option>Travel Insurance</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      I agree to the{" "}
                      <a
                        href="/terms"
                        className="text-green-600 hover:underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        className="text-green-600 hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 shadow-md"
                    >
                      Submit Question
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === "faq" && (
            <div className="space-y-6">
              <div className="relative max-w-md mb-6">
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100">
                      <h3 className="font-medium text-gray-900">
                        {faq.question}
                      </h3>
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="p-4 bg-white border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 text-center">
                <p className="text-gray-600 mb-4">
                  Didn't find what you were looking for?
                </p>
                <button
                  onClick={() => setActiveTab("ask")}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Ask a custom question →
                </button>
              </div>
            </div>
          )}

          {activeTab === "live" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Live Chat with an Agent
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Our licensed agents are available Monday-Friday, 8am-5pm to
                answer your questions in real-time.
              </p>
              <div className="space-y-4 max-w-sm mx-auto">
                <button className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-md">
                  Start Live Chat
                </button>
                <p className="text-sm text-gray-500">
                  Current wait time:{" "}
                  <span className="font-medium">3 minutes</span>
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Chat Hours
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-medium">Weekdays</p>
                    <p className="text-gray-600">8:00 AM - 5:00 PM</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">Saturday</p>
                    <p className="text-gray-600">9:00 AM - 1:00 PM</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">Sunday</p>
                    <p className="text-gray-600">Closed</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600">
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
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Call Support
            </h3>
            <p className="text-gray-600 mb-4">
              Speak directly with our customer service team
            </p>
            <a
              href="tel:+254700000000"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              +254 700 000 000
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600">
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
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>x
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Email Support
            </h3>
            <p className="text-gray-600 mb-4">
              Get help via email with 24-hour response time
            </p>
            <a
              href="mailto:support@insuremore.co.ke"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              support@insuremore.co.ke
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600">
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
                  strokeWidth="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Visit Office
            </h3>
            <p className="text-gray-600 mb-4">
              Meet with an agent in person at our offices
            </p>
            <p className="text-gray-700">Westlands, Nairobi, Kenya</p>
          </div>
        </div>
      </div>

      {/* Full-width Footer */}
      <Footer />
    </div>
  );
};

export default AskAnAgent;
