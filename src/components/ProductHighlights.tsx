import { motion } from "framer-motion";
import { useState } from "react";
import { Store, Bike, Users, Shield, MessageSquare, Lock } from "lucide-react";

export const ProductHighlights = () => {
  const [activeTab, setActiveTab] = useState(0);

  const products = [
    {
      icon: <Store className="w-8 h-8 text-green-600" />,
      title: "For Market Traders",
      description: "Stall and goods insurance via USSD",
      features: [
        "Cover for market stalls",
        "Goods protection",
        "USSD claims processing",
        "Daily premium options",
      ],
      color: "green",
    },
    {
      icon: <Bike className="w-8 h-8 text-yellow-600" />,
      title: "For Riders",
      description: "Affordable bike insurance with GPS tracking",
      features: [
        "Third-party & comprehensive",
        "Theft protection",
        "Accident coverage",
        "GPS tracking included",
      ],
      color: "yellow",
    },
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      title: "For Families",
      description: "Child education + health bundles",
      features: [
        "Education fund protection",
        "Health coverage",
        "Family discount packages",
        "Emergency support",
      ],
      color: "red",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-green-50/10">
      <div className="container px-4 mx-auto">
        {/* Product Tabs */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Protection Designed for You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tailored insurance solutions for every need
          </p>
        </div>

        <div className="flex flex-col items-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {products.map((product, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === index
                    ? `bg-${product.color}-500 text-white shadow-md`
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {product.title}
              </button>
            ))}
          </div>

          <motion.div
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl mx-auto border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div
                className={`w-16 h-16 ${
                  products[activeTab].color === "green"
                    ? "bg-green-500"
                    : products[activeTab].color === "yellow"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                } rounded-full flex items-center justify-center shadow-md mx-auto md:mx-0`}
              >
                {products[activeTab].icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {products[activeTab].title}
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  {products[activeTab].description}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {products[activeTab].features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-xl p-8 md:p-12 max-w-6xl mx-auto text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Protect What Matters?
            </h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Join 500,000+ Africans who trust us. No spam, no hidden fees.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <motion.button
              className="px-10 py-4 bg-white text-green-600 font-bold rounded-lg shadow-lg text-lg mb-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Now—Free Quote in 60 Seconds
            </motion.button>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-green-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Support in Swahili & Local Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Secure Payment Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>100% African-owned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
