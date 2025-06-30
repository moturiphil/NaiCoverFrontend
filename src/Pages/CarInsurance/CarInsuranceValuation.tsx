import CarPolicy from "../../components/MotorCarInsurance/CarInsuranceValuation";
import NavBar from "@/components/Navbar";
const CarInsuranceValuation = () => {
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

export { CarInsuranceValuation };
