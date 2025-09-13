import InsurancePayment from "../../components/Payment/InsuranceCoverPayment";
import NavBar from "@/components/Navbar";
const InsuranceCoverPayment = () => {
  return (
    <>
      {/* <InsuranceFormNavbar /> */}
      <NavBar />
      <section className="py-16 bg-gray-100 flex flex-col md:flex-row">
        <InsurancePayment />
      </section>
    </>
  );
};

export { InsuranceCoverPayment };

