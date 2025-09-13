import { motion } from "framer-motion";
import {
  ClipboardList,
  ShieldCheck,
  Smartphone,
  ArrowRight,
} from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: "Tell Us Your Needs",
      description: "Quick 2-minute quiz about your insurance needs",
      color: "from-blue-500 to-blue-600",
      details: [
        "Answer simple questions",
        "No personal info required",
        "Get instant recommendations",
      ],
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Pick Your Plan",
      description: "Clear pricing tiers with no hidden fees",
      color: "from-purple-500 to-purple-600",
      details: [
        "Side-by-side comparisons",
        "Adjust coverage levels",
        "See exact premiums",
      ],
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Get Protected Instantly",
      description: "Digital policy delivered via SMS/email",
      color: "from-green-500 to-green-600",
      details: ["Immediate coverage", "Digital ID card", "24/7 access in app"],
    },
  ];

  return (
    <section
      id="howItWorks"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10"></div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Getting Covered Takes{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              3 Minutes
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process gets you protected faster than traditional
            insurers
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline connector */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 mx-16 z-0"></div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Step indicator */}
                <div
                  className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} shadow-lg flex items-center justify-center`}
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
                    {step.icon}
                  </div>
                </div>

                {/* Step card */}
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full pt-12 pb-8 px-6 border border-gray-100 overflow-hidden group">
                  <div className="relative h-full flex flex-col">
                    <div className="mb-6 text-center">
                      <span className="inline-block text-4xl font-bold bg-gradient-to-br bg-clip-text text-transparent mb-2">
                        0{index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>

                    <div className="mt-auto">
                      <ul className="space-y-2 mb-6">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1, delay: index * 0.3 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center justify-center">
              Start Your Quiz Now
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              No credit card required
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              No obligation
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Get instant quote
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
