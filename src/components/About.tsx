// import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";
import { Button } from "./ui/button";

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  Your Insurance, Simplified.{" "}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Finding the right insurance doesn’t have to be complicated. With
                [App Name], we bring together the best insurance options to help
                you make informed decisions with ease. Whether you’re looking
                for car, home, life, or health insurance, we provide a simple,
                quick, and transparent way to compare and choose plans that fit
                your needs and budget. Our platform does all the hard work, so
                you can focus on what really matters—your peace of mind.
              </p>
              <br />
              <br />
              <div className="space-y-4 lg:col-start-2">
                <Button className="w-full md:mr-4 md:w-auto">
                  Compare Now
                </Button>
                {/* <Button variant="outline" className="w-full md:w-auto">
                  Get Quotation
                </Button> */}
              </div>
            </div>

            {/* <Statistics /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
