import { MotorCycleDetails } from "../../components/MotorCycleInsurance/MotorCycleInsuranceDetails";
import NavBar from "@/components/Navbar";
const MotorCycleInsuranceDetails = () => {
  return (
    <>
      {/* <InsuranceFormNavbar /> */}
      <NavBar />
      <section className="py-16 bg-gray-100 flex flex-col md:flex-row">
        <MotorCycleDetails />
      </section>
    </>
  );
};

export { MotorCycleInsuranceDetails };
