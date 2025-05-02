import { CarDetails } from "../../components/MotorCarInsurance/CarDetails";
import NavBar from "@/components/Navbar";

const CarInsuranceCover = () => {
  return (
    <>
      <NavBar />
      <section className="py-16 bg-gray-100 flex flex-col md:flex-row">
        <CarDetails />
        {/* <CarDetails /> */}
      </section>
      {/* <Footer /> */}
    </>
  );
};

export { CarInsuranceCover };