import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
// import cubeLeg from "../assets/cube-leg.png";
// import Nairobi from "../assets/Nairobi.jpg";
import Nairobi from "../assets/nrb_sky.png";

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
  },
  {
    title: "Motorcycle",
    description:
      "Affordable motorcycle insurance to keep you covered wherever you ride.",
    icon: <WalletIcon />,
  },
  {
    title: "Personal Accident",
    description:
      "Financial protection in case of injury or accident, giving you peace of mind.",
    icon: <MagnifierIcon />,
  },
];

export const Services = () => {
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

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
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
