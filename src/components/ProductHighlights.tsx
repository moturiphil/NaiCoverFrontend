import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Bike,
  Car,
  Shield,
  MessageSquare,
  Lock,
  Zap,
  Check,
  ArrowRight,
} from "lucide-react";

export const ProductHighlights = () => {
  const [activeTab, setActiveTab] = useState(0);

  const products = [
    {
      icon: <Car />,
      title: "MotorCar Insurance",
      description: "Comprehensive protection for your vehicle",
      features: [
        "Third-party & comprehensive coverage",
        "Accident and theft protection",
        "24/7 roadside assistance",
        "Fast claims processing (90% paid in <24hrs)",
        "No-claims discount rewards",
        "Windscreen cover included",
      ],
      color: "blue",
      colorClass: "bg-blue-100 text-blue-600",
      gradient: "from-blue-500 to-blue-600",
      stats: [
        { value: "10,000+", label: "Vehicles insured" },
        { value: "98%", label: "Claim satisfaction" },
        { value: "24/7", label: "Support available" },
      ],
    },
    {
      icon: <Bike />,
      title: "MotorCycle Insurance",
      description: "Affordable coverage for bike owners",
      features: [
        "Third-party liability coverage",
        "Theft and damage protection",
        "Medical expenses cover",
        "Discounted rates for safe riders",
        "Optional passenger cover",
        "Gear and accessories protection",
      ],
      color: "orange",
      colorClass: "bg-amber-100 text-amber-600",
      gradient: "from-amber-500 to-amber-600",
      stats: [
        { value: "5,000+", label: "Bikes protected" },
        { value: "40%", label: "Savings average" },
        { value: "1hr", label: "Quickest claim" },
      ],
    },
    {
      icon: <Shield />,
      title: "Personal Accident Cover",
      description: "Protection against accidental injuries",
      features: [
        "24-hour worldwide coverage",
        "Permanent disability benefits",
        "Medical expense reimbursement",
        "Death benefit for beneficiaries",
        "Temporary disability payments",
        "Family coverage options",
      ],
      color: "purple",
      colorClass: "bg-purple-100 text-purple-600",
      gradient: "from-purple-500 to-purple-600",
      stats: [
        { value: "50,000+", label: "Lives covered" },
        { value: "100%", label: "Digital claims" },
        { value: "1min", label: "Signup time" },
      ],
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-500/10 via-amber-500/10 to-purple-500/10"></div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
            Our Products
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Protection{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tailored
            </span>{" "}
            for You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Custom insurance solutions designed for African lifestyles and needs
          </p>
        </motion.div>

        {/* Product tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
            {products.map((product, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all relative ${
                  activeTab === index
                    ? `text-white bg-gradient-to-r ${product.gradient} shadow-md`
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {activeTab === index && (
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 z-0"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <div
                    className={`w-5 h-5 ${
                      activeTab === index
                        ? "text-white"
                        : product.colorClass.split(" ")[1]
                    }`}
                  >
                    {product.icon}
                  </div>
                  {product.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Product content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-16"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Product image/icon section */}
                <div
                  className={`bg-gradient-to-br ${products[activeTab].gradient} p-8 flex flex-col items-center justify-center`}
                >
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
                      <div className="w-12 h-12">
                        {products[activeTab].icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 text-center">
                    {products[activeTab].title}
                  </h3>
                  <p className="text-white/90 text-center mb-6">
                    {products[activeTab].description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 w-full mt-auto">
                    {products[activeTab].stats.map((stat, i) => (
                      <div
                        key={i}
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center"
                      >
                        <div className="text-2xl font-bold text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-white/80">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features list */}
                <div className="p-8 lg:col-span-2">
                  <h4 className="text-xl font-semibold text-gray-800 mb-6">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {products[activeTab].features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 mt-1 w-6 h-6 rounded-full ${
                            products[activeTab].colorClass.split(" ")[0]
                          } flex items-center justify-center`}
                        >
                          <Check
                            className={`w-4 h-4 ${
                              products[activeTab].colorClass.split(" ")[1]
                            }`}
                          />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <button
                      className={`group flex items-center justify-between w-full px-6 py-4 bg-gradient-to-r ${products[activeTab].gradient} rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all`}
                    >
                      <span>Get {products[activeTab].title}</span>
                      <div className="flex items-center">
                        <span className="mr-2">From $9/month</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Final CTA */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Protect What Matters?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl">
                Join 500,000+ Africans who trust us. No spam, no hidden fees.
              </p>
            </div>

            <div className="flex-shrink-0">
              <button className="group relative px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center">
                <span className="relative z-10 flex items-center">
                  Start Now—Free Quote
                  <Zap className="w-5 h-5 ml-2 fill-blue-600 text-blue-600 group-hover:animate-pulse" />
                </span>
                <span className="absolute inset-0 bg-white/90 group-hover:opacity-0 transition-opacity duration-300 rounded-lg"></span>
              </button>

              <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Support in local languages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Secure payments</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
