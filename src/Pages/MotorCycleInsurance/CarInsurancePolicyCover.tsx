import CarPolicy from "../../components/MotorCarInsurance/CarInsurancePolicyCover.tsx";
import NavBar from "@/components/Navbar";
const CarInsurancePolicyCover = () => {
  return (
    <>
      {/* <InsuranceFormNavbar /> */}
      <NavBar />
      <section className="py-16 bg-gray-100 flex flex-col md:flex-row">
        <CarPolicy />
      </section>
    </>
  );
};

export { CarInsurancePolicyCover };
