import { CarDetails } from "../../components/MotorCarInsurance/CarInsuranceDetails";
import NavBar from "@/components/Navbar";
const CarInsuranceDetails = () => {
  return (
    <>
      {/* <InsuranceFormNavbar /> */}
      <NavBar />
      <section className="py-16 bg-gray-100 flex flex-col md:flex-row">
        <CarDetails />
      </section>
    </>
  );
};

export { CarInsuranceDetails };
