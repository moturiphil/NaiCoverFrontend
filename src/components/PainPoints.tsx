import { motion } from "framer-motion";
import { Clock, FileText, Wallet } from "lucide-react";

export const PainPoints = () => {
  const painPoints = [
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      pain: "Slow Claims?",
      solution: "Get paid in hours, not weeks.",
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      pain: "Too Complicated?",
      solution: "Tap, tap, covered—no paperwork.",
    },
    {
      icon: <Wallet className="w-8 h-8 text-green-600" />,
      pain: "Expensive?",
      solution: "Fair prices tailored for you.",
    },
  ];

  return (
    <section
      id="painpoints"
      className="py-16 bg-white bg-gradient-to-t from-green-50/30 to-white"
      style={{
        backgroundImage:
          "linear-gradient(to top, rgba(0, 128, 0, 0.03) 0%, rgba(255, 255, 255, 1) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Insurance That Actually Works For You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We solved the biggest frustrations with traditional insurance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-100"
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-green-50/50 rounded-full border border-green-100">
                  {point.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {point.pain}
                </h3>
                <p className="text-green-600 font-medium text-lg">
                  {point.solution}
                </p>
                <div className="mt-4 w-16 h-1 bg-gradient-to-r from-green-500 via-black/20 to-red-500 rounded-full opacity-80"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg">
            Get Covered in Minutes
          </button>
        </div>
      </div>
    </section>
  );
};
