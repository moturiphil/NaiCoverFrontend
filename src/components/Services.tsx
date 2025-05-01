import { useState, useEffect } from "react";
import { CarFront, Bike, HeartPulse } from "lucide-react";

const slides = [
  {
    title: "Peace of Mind Today",
    subtitle: "Unexpected events happen - be prepared",
    text: "Don't wait until it's too late. Get covered now and protect what matters most.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.m3WDO4IPUUFeLW0xa0btqwHaE7%26pid%3DApi&f=1&ipt=4ae3638b35c2450d899a90677e41e03898c4889d6a6a515469c1b1116dfe41a6&ipo=images", // Local image path or reliable CDN
    bgColor: "bg-blue-50",
  },
  {
    title: "Affordable Protection",
    subtitle: "More affordable than you think",
    text: "Our plans start at just a few dollars a month. Small price for big protection.",
    image: "https://infomineo.com/wp-content/uploads/2024/01/group-afro-americans-working-together-_1_-1.webp",
    bgColor: "bg-green-50",
  },
  {
    title: "Instant Coverage",
    subtitle: "No waiting periods for most policies",
    text: "Get protected immediately after payment. No medical exams for many plans.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.f7SuevzT651cyLARp25Z3AHaE8%26pid%3DApi&f=1&ipt=f9f39e71d8311b1795e7e817f088960bbdfcd8cd98417163aa4c1abce13184e1&ipo=images",
    bgColor: "bg-purple-50",
  },
  {
    title: "24/7 Support",
    subtitle: "We're here when you need us",
    text: "File claims anytime, anywhere through our simple mobile app.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.bPBKXWDcdbjAKxV_JKbzKwHaEz%26pid%3DApi&f=1&ipt=d50ce1f25f7d7116f955cd48984aea51b6afb45fa329df56023ae716f61948f9&ipo=images",
    bgColor: "bg-orange-50",
  },
];

const insuranceTypes = [
  {
    name: "Motorcar Insurance",
    icon: <CarFront className="w-5 h-5" />,
    href: "/insurance/motor-car",
    description: "Comprehensive coverage for your vehicles",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Motorcycle Insurance",
    icon: <Bike className="w-5 h-5" />,
    href: "/insurance/motor-cycle",
    description: "Protection for riders and their bikes",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    name: "Personal Accident",
    icon: <HeartPulse className="w-5 h-5" />,
    href: "/insurance/personal-accident",
    description: "Coverage for unexpected injuries",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
];

export const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <section className="container grid lg:grid-cols-2 gap-8 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Left side - Enhanced Image carousel */}
      <div
        className="relative h-full min-h-[500px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div
            className={`absolute inset-0 ${slides[currentSlide].bgColor} transition-colors duration-1000`}
          ></div>
        </div>

        {/* Carousel container */}
        <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-xl z-10">
          {/* Image with fallback */}
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/images/insurance-fallback.jpg";
              }}
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          {/* Carousel content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 animate-fadeIn">
              {slides[currentSlide].title}
            </h2>
            <h3 className="text-xl md:text-2xl text-primary-300 mb-4 animate-fadeIn">
              {slides[currentSlide].subtitle}
            </h3>
            <p className="text-lg md:text-xl mb-6 animate-fadeIn">
              {slides[currentSlide].text}
            </p>

            {/* Enhanced Slide controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="bg-white/30 hover:bg-white/50 p-3 rounded-full transition transform hover:scale-110"
                aria-label="Previous slide"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex gap-2 flex-grow justify-center">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="focus:outline-none"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <div
                      className={`h-2 w-8 transition-all duration-300 rounded-full ${
                        index === currentSlide
                          ? "bg-primary-400"
                          : "bg-white/30"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="bg-white/30 hover:bg-white/50 p-3 rounded-full transition transform hover:scale-110"
                aria-label="Next slide"
              >
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
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Enhanced Insurance buttons */}
      <div className="flex flex-col justify-center h-full space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Insurance Products
          </h2>
          <p className="text-lg text-gray-600">
            Select the coverage that fits your needs
          </p>
        </div>

        <div className="grid gap-4">
          {insuranceTypes.map((insurance) => (
            <a
              key={insurance.name}
              href={insurance.href}
              className="group block p-6 border border-gray-200 rounded-xl hover:border-transparent transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center">
                <div
                  className={`p-3 mr-4 rounded-lg ${insurance.bgColor} group-hover:bg-opacity-100 transition`}
                >
                  <span className={insurance.color}>{insurance.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition">
                    {insurance.name}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-800 transition">
                    {insurance.description}
                  </p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition">
                  <svg
                    className="w-5 h-5 text-gray-400"
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
            </a>
          ))}
        </div>

        <div className="pt-4">
          <a
            href="/all-products"
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800 transition-colors group"
          >
            <span className="mr-2">View all insurance products</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
    </section>
  );
};
