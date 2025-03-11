import { useState } from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import Nairobi from "../assets/nrb_sky.png";
import { Link } from "react-router-dom";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Motor Car",
    description:
      "Comprehensive coverage for your car, protecting you on the road.",
    icon: <ChartIcon />,
    route: "/insurance/motor-car",
  },
  {
    title: "Health",
    description:
      "Affordable health insurance to keep you covered wherever you go.",
    icon: <WalletIcon />,
    route: "/insurance/health",
  },
  {
    title: "Motorcycle",
    description:
      "Affordable motorcycle insurance to keep you covered wherever you ride.",
    icon: <WalletIcon />,
    route: "/insurance/motorcycle",
  },
  {
    title: "Life",
    description:
      "Life insurance to protect your loved ones in case of the unexpected.",
    icon: <MagnifierIcon />,
    route: "/insurance/life",
  },
  {
    title: "Home",
    description:
      "Comprehensive home insurance to protect your property and belongings.",
    icon: <ChartIcon />,
    route: "/insurance/home",
  },
  {
    title: "Retirement",
    description: "Retirement plans to ensure a secure and comfortable future.",
    icon: <WalletIcon />,
    route: "/insurance/retirement",
  },
  {
    title: "Personal Accident",
    description: "Personal accident insurance to cover unexpected events.",
    icon: <MagnifierIcon />,
    route: "/insurance/personal-accident",
  },
];

const handleCardClick = (
  title: string,
  route: string,
  setSelectedCard: (title: string) => void
) => {
  setSelectedCard(title);
  console.log(`Card clicked: ${title}`);
  window.location.href = route;
};

const IconLink = ({ to, children }) => <Link to={to}>{children}</Link>;

export const Services = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <section className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Your Insurance{" "}
            </span>
            Simplified
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Enjoy the convenience of comparing plans from top-rated insurers,
            all in one place. No hidden fees, no fine print—just clear,
            straightforward options that give you the coverage you need at a
            price you can afford
          </p>

          <div className="grid grid-cols-2 gap-4">
            {serviceList
              .slice(0, 2)
              .map(({ icon, title, description }: ServiceProps) => (
                <div key={title} className="w-full">
                  <Card
                    onClick={() => handleCardClick(title, "/insurance/motor-car", setSelectedCard)}
                    className="relative w-full flex justify-center items-center px-3 py-1.5 font-medium tracking-wide capitalize rounded-md hover:bg-gray-100 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
                  >
                    <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                      <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                        {icon}
                      </div>
                      <div>
                        <CardTitle className="inline text-xl font-semibold leading-none">
                          {title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {serviceList
              .slice(2)
              .map(({ icon, title, description }: ServiceProps) => (
                <div key={title} className="w-full">
                  <Card
                    onClick={() => handleCardClick(title, setSelectedCard)}
                    className="relative w-full flex justify-center items-center px-2 py-1 font-medium tracking-wide capitalize rounded-md hover:bg-gray-100 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
                  >
                    <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-2">
                      <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                        {icon}
                      </div>
                      <div>
                        <CardTitle className="inline text-lg font-semibold leading-none">
                          {title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            <div className="w-full">
              <Card
                onClick={() => handleCardClick("View All", setSelectedCard)}
                className="relative w-full flex justify-center items-center px-2 py-1 font-medium tracking-wide capitalize rounded-md hover:bg-gray-100 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
              >
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-2">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    <MagnifierIcon />
                  </div>
                  <div>
                    <CardTitle className="inline text-lg font-semibold leading-none">
                      View All
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>

        <img
          src={Nairobi}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="About services"
        />
      </div>
    </section>
  );
};
