import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "./ui/button";
import { Menu, Phone } from "lucide-react";
import { LogoIcon } from "./Icons";

interface RouteProps {
  href: string;
  label: string;
}

interface MenuItemProps extends RouteProps {
  subItems?: RouteProps[];
}

const menuItems: MenuItemProps[] = [
  {
    href: "#",
    label: "Apply",
    subItems: [
      { href: "/become-agent", label: "Become an agent" },
      { href: "/partner", label: "Partner with us" },
    ],
  },
  {
    href: "#",
    label: "Shop",
    subItems: [
      { href: "/insurance/motor-car", label: "Motor Car Insurance" },
      { href: "/insurance/motor-cycle", label: "Motor-cycle Insurance" },
      { href: "/insurance/personal-accident", label: "Personal Accident" },
    ],
  },
  {
    href: "#",
    label: "Tools & Tips",
    subItems: [
      { href: "/calculator", label: "Car Insurance Calculator" },
      { href: "/resources", label: "Resource Center" },
      { href: "/ask-agent", label: "Ask an Agent" },
      { href: "/faqs", label: "FAQs" },
    ],
  },
  {
    href: "#",
    label: "Company",
    subItems: [
      { href: "/about", label: "About Us" },
      // { href: "/infosim", label: "Infosim" },
    ],
  },
  {
    href: "/lipa-mdogo",
    label: "Lipa Mdogo Mdogo",
  },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="relative">
        <div className="container h-16 px-4 w-screen flex justify-between items-center">
          {/* Logo */}
          <div className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex items-center text-green-800 hover:text-green-700 transition-colors"
            >
              <LogoIcon />
              <span className="ml-2">InsureMore</span>
            </a>
          </div>

          {/* Mobile Menu */}
          <span className="flex md:hidden gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="flex md:hidden h-5 w-5 text-gray-700 hover:text-green-600 transition-colors" />
              </SheetTrigger>
              <SheetContent side={"left"} className="bg-white">
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl text-green-800">
                    InsureMore
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-start gap-2 mt-4">
                  {menuItems.map((item) => (
                    <div key={item.label} className="w-full">
                      <a
                        href={item.href}
                        className={`${buttonVariants({
                          variant: "ghost",
                        })} text-gray-700 hover:text-green-600 w-full text-left justify-start`}
                      >
                        {item.label}
                      </a>
                      {item.subItems && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.subItems.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              className={`${buttonVariants({
                                variant: "ghost",
                              })} text-gray-500 hover:text-green-600 w-full text-left justify-start text-sm`}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* Desktop Menu - Centered */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex items-center justify-center gap-1">
              {menuItems.map((item) => (
                <li key={item.label} className="relative group">
                  {item.subItems ? (
                    <>
                      <button
                        className={`${buttonVariants({
                          variant: "ghost",
                        })} text-gray-700 hover:text-green-600 bg-white hover:bg-green-50 group-hover:text-green-600 group-hover:bg-green-50 flex items-center`}
                      >
                        {item.label}
                        <svg
                          className="ml-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                        <ul className="p-2 space-y-1">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.label}>
                              <a
                                href={subItem.href}
                                className={`${buttonVariants({
                                  variant: "ghost",
                                })} w-full justify-start text-gray-700 hover:text-green-600 hover:bg-green-50`}
                              >
                                {subItem.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className={`${buttonVariants({
                        variant: "ghost",
                      })} text-gray-700 hover:text-green-600`}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side - Login and Help */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-2 text-green-600" />
              <span>Our Agents can help you save</span>
            </div>
            <a
              href="/auth/login"
              className={`${buttonVariants({
                variant: "outline",
              })} border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700`}
            >
              Login
            </a>
          </div>
        </div>

        {/* Green Ribbon */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-green-800"></div>
      </div>
    </header>
  );
};

export default NavBar;
