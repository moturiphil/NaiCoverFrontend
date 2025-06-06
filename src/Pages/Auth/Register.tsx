import SignUp from "../../components/auth/SignUp";
import NavBar from "@/components/Navbar";
const Register = () => {
  return (
    <>
      {/* <InsuranceFormNavbar /> */}
      <NavBar />
      <section className="py-16 bg-gray-100 flex flex-col md:flex-row">
        <SignUp />
      </section>
    </>
  );
};

export { Register };
