import React, { useState } from "react";
// import InsuranceFormNavbar from "../../components/InsuranceFormNavbar";
import { Start } from "../../components/MotorCarInsurance/Start";
import { CarDetails } from "../../components/MotorCarInsurance/CarDetails";
import { Footer } from "../../components/Footer";
import ProgressBar from "@/components/PrograssBar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { buttonVariants } from "@/components/ui/button";
import { LogoIcon } from "@/components/Icons";

const questions = [
  {
    question: "Vehicle Use?",
    options: ["Private", "Commercial", "PSV"],
  },
  {
    question: "Type of insurance interested in?",
    options: ["Comprehensive", "Third Party only"],
  },
  {
    question: "Cover Duration?",
    options: ["1 Month", "12 Months"],
  },
  {
    question: "Make",
    options: [
      "Nissan",
      "Honda",
      "Hyundai",
      "Toyota",
      "Volkswagen",
      "Mercedes",
      "BMW",
      "Audi",
      "Ford",
      "Subaru",
      "Mazda",
      "Mitsubishi",
      "Peugeot",
      "Suzuki",
      "Isuzu",
      "Land Rover",
      "Jeep",
      "Chevrolet",
      "Kia",
      "Volvo",
      "Jaguar",
      "Porsche",
      "Lexus",
    ],
  },
];

const CarInsuranceOnboard = () => {
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const handleOptionChange = (questionIndex: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted with answers:", answers);
  };

  return (
    <>
      {/* <InsuranceFormNavbar /> */}
      <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
            <NavigationMenuItem className="font-bold flex justify-start">
              <a
                rel="noreferrer noopener"
                href="/"
                className="ml-2 font-bold text-xl flex"
              >
                <LogoIcon />
                InsureMore
              </a>
            </NavigationMenuItem>

            <div className="flex gap-2">
              <a
                rel="noreferrer noopener"
                href="/login"
                className={`border ${buttonVariants({ variant: "secondary" })}`}
              >
                Login
              </a>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <section className="py-16 bg-gray-100 flex flex-col md:flex-row">
        <Start />
        {/* <CarDetails /> */}
      </section>
      {/* <Footer /> */}
    </>
  );
};

export { CarInsuranceOnboard };
