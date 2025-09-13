import { motion } from "framer-motion";
import {
  Clock,
  FileText,
  Wallet,
  ShieldCheck,
  Headphones,
  TrendingUp,
} from "lucide-react";

export const PainPoints = () => {
  const painPoints = [
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      pain: "Slow Claims?",
      solution: "Get paid in hours, not weeks",
      stat: "90% claims processed in <24hrs",
      bg: "bg-green-50",
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      pain: "Too Complicated?",
      solution: "Tap, tap, covered—no paperwork",
      stat: "100% digital process",
      bg: "bg-blue-50",
    },
    {
      icon: <Wallet className="w-8 h-8 text-amber-600" />,
      pain: "Expensive?",
      solution: "Fair prices tailored for you",
      stat: "Save up to 40% vs traditional",
      bg: "bg-amber-50",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
      pain: "Unreliable Coverage?",
      solution: "Comprehensive protection",
      stat: "Backed by AA-rated insurers",
      bg: "bg-purple-50",
    },
    {
      icon: <Headphones className="w-8 h-8 text-red-600" />,
      pain: "Poor Support?",
      solution: "24/7 human assistance",
      stat: "98% customer satisfaction",
      bg: "bg-red-50",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      pain: "No Flexibility?",
      solution: "Adjust coverage anytime",
      stat: "Modify your plan in 2 taps",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <section
      id="painpoints"
      className="py-20 bg-gradient-to-b from-white to-green-50/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Insurance That{" "}
            <span className="text-green-600">Actually Works</span> For You
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We've reinvented insurance to solve the biggest frustrations with
            traditional providers
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              className={`group p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-green-200 ${point.bg}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-lg ${point.bg} bg-opacity-70 group-hover:bg-opacity-100 transition`}
                  >
                    {point.icon}
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-gray-800">
                    {point.pain}
                  </h3>
                </div>

                <p
                  className="text-lg font-semibold mb-3"
                  style={{
                    color: point.icon.props.className.includes("text-")
                      ? point.icon.props.className
                          .split("text-")[1]
                          .split(" ")[0]
                          .replace("-600", "") + "-600"
                      : "text-green-600",
                  }}
                >
                  {point.solution}
                </p>

                <p className="text-gray-500 text-sm mb-4">{point.stat}</p>

                <div className="mt-auto pt-4 border-t border-gray-200 group-hover:border-gray-300 transition">
                  <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                      style={{ width: `${Math.random() * 60 + 40}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button className="relative px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl group overflow-hidden">
            <span className="relative z-10 flex items-center justify-center">
              Get Covered in Minutes
              <svg
                className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
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
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>

          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-1 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              No commitment
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-1 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Cancel anytime
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-1 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              7-day money back guarantee
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
