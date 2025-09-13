import { useState, useEffect } from "react";
import { Footer } from "./../Footer";

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState<
    "guides" | "stats" | "webinars" | "tools"
  >("guides");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample data - replace with your actual content
  const resourceData = {
    guides: [
      {
        title: "Insurance Sales Playbook",
        description: "Complete guide to selling insurance products effectively",
        category: "Sales",
        downloads: "1.2k",
        date: "2023-10-15",
      },
      {
        title: "Digital Transformation Guide",
        description: "How to transition your insurance business online",
        category: "Operations",
        downloads: "845",
        date: "2023-09-28",
      },
      {
        title: "Microinsurance Handbook",
        description:
          "Everything about microinsurance products and distribution",
        category: "Products",
        downloads: "1.5k",
        date: "2023-11-02",
      },
    ],
    stats: [
      {
        title: "Insurance Penetration in Africa",
        value: "3.5%",
        change: "+0.7% YoY",
        trend: "up",
      },
      {
        title: "Digital Policy Purchases",
        value: "42%",
        change: "+18% YoY",
        trend: "up",
      },
      {
        title: "Claims Processing Time",
        value: "4.2 days",
        change: "-1.8 days YoY",
        trend: "down",
      },
    ],
    webinars: [
      {
        title: "Future of Insurance Tech",
        date: "2023-12-05",
        speaker: "Dr. Jane Mwangi",
        registration: "1,450",
      },
      {
        title: "Regulatory Updates 2024",
        date: "2024-01-15",
        speaker: "CPA James Omondi",
        registration: "980",
      },
    ],
    tools: [
      {
        name: "Commission Calculator",
        description:
          "Calculate your potential earnings from different products",
        category: "Sales",
      },
      {
        name: "Customer Onboarding Toolkit",
        description: "Digital templates for client acquisition",
        category: "Operations",
      },
    ],
  };

  // Simulate loading data
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const filteredResources = resourceData[activeTab].filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleToolClick = (e: React.MouseEvent, toolName: string) => {
    e.preventDefault();
    // Prevent blank page redirect by handling navigation properly
    alert(`Opening ${toolName}...`); // Replace with actual navigation logic
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-green-800 to-green-600 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Insurance Resources Center
          </h1>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Access market insights, sales tools, and educational materials to
            grow your insurance business
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex-1">
        {/* Resource Navigation */}
        <div className="flex flex-wrap mb-6 border-b border-gray-200">
          {[
            { id: "guides", label: "Guides & Playbooks" },
            // { id: "stats", label: "Market Stats" },
            // { id: "webinars", label: "Webinars" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-3 font-medium text-base md:text-lg focus:outline-none transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-green-700 border-b-2 border-green-600 font-semibold"
                  : "text-gray-600 hover:text-green-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-500"
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
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Resource Content */}
        {!isLoading && !error && (
          <div className="space-y-8">
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No resources found
                </h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
            ) : (
              <>
                {activeTab === "guides" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((guide, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {guide.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {guide.downloads} downloads
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {guide.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {guide.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              Published: {guide.date}
                            </span>
                            <button className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center">
                              Download
                              <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "stats" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <h3 className="text-base font-medium text-gray-900 mb-3">
                          {stat.title}
                        </h3>
                        <div className="flex items-end mb-2">
                          <p className="text-2xl font-bold text-gray-900 mr-2">
                            {stat.value}
                          </p>
                          <span
                            className={`flex items-center text-sm font-medium ${
                              stat.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {stat.change}
                            {stat.trend === "up" ? (
                              <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 15l7-7 7 7"
                                ></path>
                              </svg>
                            ) : (
                              <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 9l-7 7-7-7"
                                ></path>
                              </svg>
                            )}
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              stat.trend === "up"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${Math.random() * 70 + 30}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    <div className="md:col-span-2 lg:col-span-3 bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Insurance Market Trends
                      </h3>
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <div className="h-64 flex items-center justify-center text-gray-400">
                          [Interactive Chart Placeholder]
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-3">
                        Data based on industry reports and partner performance
                        metrics. Updated quarterly.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "webinars" && (
                  <div className="space-y-5">
                    {filteredResources.map((webinar, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="p-5 md:flex md:items-start">
                          <div className="md:flex-shrink-0 mb-4 md:mb-0 md:mr-5">
                            <div className="w-full md:w-32 h-24 bg-green-100 rounded-md flex items-center justify-center text-green-600">
                              <svg
                                className="h-8 w-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {webinar.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3">
                                  Speaker: {webinar.speaker}
                                </p>
                              </div>
                              <div className="mb-3 md:mb-0">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {webinar.date}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {webinar.registration} registered
                              </span>
                              <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                                Register Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "tools" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredResources.map((tool, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start mb-3">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-green-100 text-green-600 mr-3">
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
                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-1">
                              {tool.name}
                            </h3>
                            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-800">
                              {tool.category}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {tool.description}
                        </p>
                        <button
                          onClick={(e) => handleToolClick(e, tool.name)}
                          className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center"
                        >
                          Access Tool
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 md:p-8 border border-green-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Stay Updated
            </h2>
            <p className="text-gray-600 text-sm mb-5">
              Subscribe to our monthly newsletter for the latest insurance
              insights, product updates, and exclusive resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width Footer */}
      <Footer />
    </div>
  );
};

export default ResourcesPage;
