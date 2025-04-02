import { useState, useEffect } from "react";

const slides = [
  {
    title: "Peace of Mind Today",
    subtitle: "Unexpected events happen - be prepared",
    text: "Don't wait until it's too late. Get covered now and protect what matters most.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bostonreview.net%2Fwp-content%2Fuploads%2F2022%2F10%2F2DU_Kenya8_5367331640-scaled-1.jpg&f=1&nofb=1&ipt=f3287873bf6acfcbe30f0fc95c808f0f995522aa45b68602bf1256ff273d2450&ipo=images",
  },
  {
    title: "Affordable Protection",
    subtitle: "More affordable than you think",
    text: "Our plans start at just a few dollars a month. Small price for big protection.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fh2g6j3q2.rocketcdn.me%2Fwp-content%2Fuploads%2F2012%2F09%2Fmobilephoneuser.jpg&f=1&nofb=1&ipt=8e08e854d2b13eb17198b6ffbfd0d8722bc731a95a40acc0b275917a09d18c74&ipo=images",
  },
  {
    title: "Instant Coverage",
    subtitle: "No waiting periods for most policies",
    text: "Get protected immediately after payment. No medical exams for many plans.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.africanleadershipmagazine.co.uk%2Fwp-content%2Fuploads%2F2015%2F02%2FA-farmer-uses-his-mobile-008.jpeg&f=1&nofb=1&ipt=87168574f3e8d1a3385519450d6de9336a2c19fdbb043b906a9f148e74d3920f&ipo=images",
  },
  {
    title: "24/7 Support",
    subtitle: "We're here when you need us",
    text: "File claims anytime, anywhere through our simple mobile app.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gsma.com%2Fmobilefordevelopment%2Fwp-content%2Fuploads%2F2020%2F11%2FIMG_3652-edited-scaled.jpg&f=1&nofb=1&ipt=e94789f4c07d979d72866a0609f65a8aaad93b43cb1c5912d67b23a426b9ee80&ipo=images",
  },
];

export const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center h-[75vh] w-screen overflow-hidden transition-all duration-1000"
      style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
    >
      {/* Green gradient overlay with transparency */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 128, 0, 0.4) 0%, rgba(0, 128, 0, 0.1) 50%, transparent 90%)",
        }}
      ></div>

      <div className="container relative z-10 text-left text-white flex flex-col items-start justify-center h-full">
        <div className="w-full max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-start mb-2">
            {slides[currentSlide].title}
          </h2>
          <h3 className="text-xl md:text-2xl text-primary mb-4">
            {slides[currentSlide].subtitle}
          </h3>
          <p className="text-lg md:text-xl mb-8">{slides[currentSlide].text}</p>

          <div className="flex gap-4 items-center">
            <button
              type="button"
              className="px-6 py-3 bg-primary text-white font-semibold rounded-full border-2 border-[#39B54A] hover:bg-primary/80 transition"
            >
              Get Covered Now
            </button>
          </div>
        </div>
      </div>

      {/* Slide indicators container at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Previous button */}
        <button
          onClick={prevSlide}
          className="bg-white/30 hover:bg-white/50 text-white p-1 rounded-full transition w-8 h-8 flex items-center justify-center"
          aria-label="Previous slide"
        >
          &lt;
        </button>

        {/* Slide indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`h-1 w-6 transition-all duration-300 ${
                  index === currentSlide ? "bg-primary" : "bg-white/30"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="bg-white/30 hover:bg-white/50 text-white p-1 rounded-full transition w-8 h-8 flex items-center justify-center"
          aria-label="Next slide"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};
