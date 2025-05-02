// import { CarInsuranceDetails } from "../../components/MotorCarInsurance/CarInsuranceDetails";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { buttonVariants } from "@/components/ui/button";
import { LogoIcon } from "@/components/Icons";
const CarInsuranceDetails = () => {

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
        <CarInsuranceDetails />
      </section>

    </>
  );
};

export { CarInsuranceDetails };
