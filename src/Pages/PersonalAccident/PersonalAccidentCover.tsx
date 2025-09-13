import { PersonalAccidentCover as PersonalAccidentCoverComponent } from "../../components/PersonalAccident/PersonalAccidentCover";
import NavBar from "@/components/Navbar";
const PersonalAccidentCover = () => {
  return (
    <>
      {/* <InsuranceFormNavbar /> */}
      <NavBar />
      <section className="py-16 bg-gray-100 flex flex-col md:flex-row">
        <PersonalAccidentCoverComponent />
      </section>
    </>
  );
};

export { PersonalAccidentCover };

