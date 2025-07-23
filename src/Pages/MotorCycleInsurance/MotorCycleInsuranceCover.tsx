import { MotorCycleDetails } from "../../components/MotorCycleInsurance/Start";
import NavBar from "@/components/Navbar";

const MotorCycleInsuranceCover = () => {
  return (
    <>
      <NavBar />
      <section className="py-16 bg-gray-100 flex flex-col md:flex-row">
        <MotorCycleDetails />
        {/* <CarDetails /> */}
      </section>
      {/* <Footer /> */}
    </>
  );
};

export { MotorCycleInsuranceCover };