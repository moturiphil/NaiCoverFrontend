import AskAnAgentComponent from "../../components/ToolsAndResources/AskAnAgent";
import NavBar from "@/components/Navbar";
const AskAnAgent = () => {
  return (
    <>
      {/* <InsuranceFormNavbar /> */}
      <NavBar />
      <section className="">
        <AskAnAgentComponent />
      </section>
    </>
  );
};

export { AskAnAgent };


