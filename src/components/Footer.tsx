import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="footer" className="bg-gradient-to-b from-green-50 to-white">
      <hr className="w-11/12 mx-auto border-gray-200" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        {/* Company Info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
              I
            </div>
            <span className="font-bold text-lg">NaiCover</span>
          </div>
          <p className="text-sm text-gray-600">
            100% African-owned insurance solutions
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#">
              <Facebook className="w-5 h-5 text-green-600" />
            </a>
            <a href="#">
              <Twitter className="w-5 h-5 text-green-600" />
            </a>
            <a href="#">
              <Instagram className="w-5 h-5 text-green-600" />
            </a>
            <a href="#">
              <Linkedin className="w-5 h-5 text-green-600" />
            </a>
          </div>
        </div>

        {/* Products */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Products</h3>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            Motor Car
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            MotorCycle
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            Personal Accident
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            Business Insurance
          </a>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Company</h3>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            About Us
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            Careers
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            Blog
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            Contact
          </a>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Support</h3>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            FAQs
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            Claims
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            USSD Codes
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            Live Chat
          </a>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Legal</h3>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            Terms
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            Privacy
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            Licenses
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition">
            Compliance
          </a>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Contact</h3>
          <p className="text-gray-600">Nairobi, Kenya</p>
          <p className="text-gray-600">info@naicover.co.ke</p>
          <p className="text-gray-600">+254 700 000 000</p>
          <p className="text-gray-600">24/7 Support</p>
        </div>
      </section>

      {/* Bottom Footer */}
      <section className="container pb-10 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © 2025 NaiCover. All rights reserved.
          </p>
          <div className="flex gap-4">
            <img src="/src/assets/mpesa.png" alt="M-Pesa" className="h-8" />
            {/* <img src="/images/visa.png" alt="Visa" className="h-8" />
            <img
              src="/images/mastercard.png"
              alt="Mastercard"
              className="h-8"
            /> */}
          </div>
          <p className="text-sm text-gray-600">
            Proudly Kenyan
          </p>
        </div>
      </section>
    </footer>
  );
};
