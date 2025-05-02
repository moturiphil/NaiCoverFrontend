import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "./ui/button";
import { LogoIcon } from "./Icons";

export const InsuranceFormNavbar = () => {
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-16 px-4 w-screen flex justify-between items-center">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex items-center text-green-800 hover:text-green-700 transition-colors"
            >
              <LogoIcon />
              InsureMore
            </a>
          </NavigationMenuItem>

          <div className="flex gap-4">
            <a
              rel="noreferrer noopener"
              href="/login"
              className={`${buttonVariants({
                variant: "ghost",
              })} text-green-800 hover:bg-green-50 hover:text-green-700 px-4 py-2 transition-colors`}
            >
              Login
            </a>
            <a
              rel="noreferrer noopener"
              href="/my-policies"
              className={`border ${buttonVariants({
                variant: "secondary",
              })} bg-gradient-to-r from-green-600 to-green-800 text-white hover:from-green-700 hover:to-green-900 px-6 py-2 transition-colors shadow-md hover:shadow-lg`}
            >
              My Policies
            </a>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
