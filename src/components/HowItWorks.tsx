import { motion } from "framer-motion";
import { ClipboardList, ShieldCheck, Smartphone } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <ClipboardList className="w-6 h-6 text-white" />,
      title: "Tell Us Your Needs",
      description: "Quick 2-minute quiz about your insurance needs",
      color: "bg-green-500",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: "Pick Your Plan",
      description: "Clear pricing tiers with no hidden fees",
      color: "bg-yellow-500",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-white" />,
      title: "Get Protected Instantly",
      description: "Digital policy delivered via SMS/email",
      color: "bg-red-500",
    },
  ];

  return (
    <section
      id="howItWorks"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-green-50/10"
    >
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Getting Covered is Simple
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three easy steps to complete protection
          </p>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-10 w-full max-w-6xl mx-auto border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Animated connecting line (except last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 w-16 h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 z-0 transition-all duration-300 group-hover:w-20"></div>
                )}

                <div
                  className={`absolute -top-8 left-8 w-14 h-14 ${step.color} rounded-full flex items-center justify-center shadow-md z-10 transition-transform duration-300 group-hover:scale-110`}
                >
                  {step.icon}
                </div>

                <div className="pt-12 pb-8 px-8 h-full bg-gray-50/30 rounded-lg transition-all duration-300 group-hover:bg-gray-50/60">
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-3xl font-bold ${step.color} text-transparent bg-clip-text`}
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.button
              className="px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg text-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 100, 0, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Quiz Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
