import { useState, useEffect } from "react";
import {
  CarFront,
  Bike,
  HeartPulse,
  Shield,
  Home,
  Umbrella,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Peace of Mind Today",
    subtitle: "Unexpected events happen - be prepared",
    text: "Don't wait until it's too late. Get covered now and protect what matters most.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    bgColor: "bg-blue-50",
    buttonText: "Get Protected",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Affordable Protection",
    subtitle: "More affordable than you think",
    text: "Our plans start at just a few dollars a month. Small price for big protection.",
    image:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    bgColor: "bg-green-50",
    buttonText: "See Plans",
    buttonColor: "bg-green-600 hover:bg-green-700",
  },
  {
    title: "Instant Coverage",
    subtitle: "No waiting periods for most policies",
    text: "Get protected immediately after payment. No medical exams for many plans.",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    bgColor: "bg-purple-50",
    buttonText: "Get Covered Now",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    title: "24/7 Support",
    subtitle: "We're here when you need us",
    text: "File claims anytime, anywhere through our simple mobile app.",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    bgColor: "bg-orange-50",
    buttonText: "Contact Support",
    buttonColor: "bg-orange-600 hover:bg-orange-700",
  },
];

const insuranceTypes = [
  {
    name: "Motorcar Insurance",
    icon: <CarFront className="w-6 h-6" />,
    href: "/insurance/motor-car",
    description: "Comprehensive coverage for your vehicles",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
  },
  {
    name: "Motorcycle Insurance",
    icon: <Bike className="w-6 h-6" />,
    href: "/insurance/motor-cycle",
    description: "Protection for riders and their bikes",
    color: "text-red-600",
    bgColor: "bg-red-50",
    hoverBg: "hover:bg-red-100",
  },
  {
    name: "Personal Accident",
    icon: <HeartPulse className="w-6 h-6" />,
    href: "/insurance/personal-accident",
    description: "Coverage for unexpected injuries",
    color: "text-green-600",
    bgColor: "bg-green-50",
    hoverBg: "hover:bg-green-100",
  },
  {
    name: "Home Insurance",
    icon: <Home className="w-6 h-6" />,
    href: "/insurance/home",
    description: "Protect your home and belongings",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    hoverBg: "hover:bg-purple-100",
  },
  {
    name: "Travel Insurance",
    icon: <Umbrella className="w-6 h-6" />,
    href: "/insurance/travel",
    description: "Stay protected wherever you go",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    hoverBg: "hover:bg-amber-100",
  },
  {
    name: "Life Insurance",
    icon: <Shield className="w-6 h-6" />,
    href: "/insurance/life",
    description: "Secure your family's future",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    hoverBg: "hover:bg-indigo-100",
  },
];

export const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <section className="w-full bg-white">
      {/* Hero Banner */}
      <div className="relative h-[600px] w-full overflow-hidden">
        <AnimatePresence custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="max-w-2xl text-white"
                >
                  <p className="text-lg md:text-xl font-medium text-white/90 mb-2">
                    {slides[currentSlide].subtitle}
                  </p>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-lg">
                    {slides[currentSlide].text}
                  </p>
                  <button
                    className={`px-8 py-3 rounded-lg text-lg font-medium ${slides[currentSlide].buttonColor} text-white transition-all shadow-lg hover:shadow-xl`}
                  >
                    {slides[currentSlide].buttonText}
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide controls */}
        <div className="absolute bottom-8 left-0 right-0 z-30">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentSlide ? 1 : -1);
                    setCurrentSlide(index);
                  }}
                  className="focus:outline-none"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={`h-2 w-8 transition-all duration-500 rounded-full ${
                      index === currentSlide
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="bg-white/30 hover:bg-white/50 p-3 rounded-full transition transform hover:scale-110"
                aria-label="Previous slide"
              >
                <svg
                  className="w-6 h-6"
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
              </button>
              <button
                onClick={nextSlide}
                className="bg-white/30 hover:bg-white/50 p-3 rounded-full transition transform hover:scale-110"
                aria-label="Next slide"
              >
                <svg
                  className="w-6 h-6"
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
          </div>
        </div>
      </div>

      {/* Insurance Products Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Insurance Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive protection tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insuranceTypes.map((insurance, index) => (
              <motion.a
                key={insurance.name}
                href={insurance.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group block p-6 rounded-xl transition-all duration-300 shadow-sm ${insurance.bgColor} ${insurance.hoverBg} hover:shadow-md border border-transparent hover:border-white`}
              >
                <div className="flex items-start">
                  <div
                    className={`p-3 rounded-lg ${insurance.bgColor} group-hover:bg-opacity-100 transition`}
                  >
                    <span className={insurance.color}>{insurance.icon}</span>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition">
                      {insurance.name}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {insurance.description}
                    </p>
                  </div>
                  <div className="text-gray-400 group-hover:text-primary-600 transition-transform group-hover:translate-x-1">
                    <svg
                      className="w-5 h-5"
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
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/all-products"
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              <span className="mr-2">View all insurance products</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
