import AgentOnboarding from "../../components/Agent/AgentOnboard";
import NavBar from "@/components/Navbar";
const AgentOnboard = () => {
  return (
    <>
      {/* <InsuranceFormNavbar /> */}
      <NavBar />
      <section className="">
        <AgentOnboarding />
      </section>
    </>
  );
};

export { AgentOnboard };
