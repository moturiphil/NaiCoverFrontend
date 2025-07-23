import { Start } from "../../components/MotorCarInsurance/Start";
import NavBar from "../../components/Navbar"

const CarInsuranceOnboard = () => {

  return (
    <>
      {/* <InsuranceFormNavbar /> */}
      <NavBar />

      
      <section className="py-16 bg-gray-100 flex flex-col md:flex-row">
        <Start />
        {/* <CarDetails /> */}
      </section>
      {/* <Footer /> */}
    </>
  );
};

export { CarInsuranceOnboard };
