// import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
// import { Newsletter } from "../components/Newsletter";
import { PainPoints } from "../components/PainPoints";
import { HowItWorks } from "../components/HowItWorks";
import { ProductHighlights } from "../components/ProductHighlights";
import { ScrollToTop } from "../components/ScrollToTop";
import { Services } from "../components/Services";
import "../App.css";

function App() {
  return (
    <>
      <Navbar />
      <Services />
      <PainPoints />
      <HowItWorks />
      <ProductHighlights />
      {/* <Newsletter />
      <FAQ /> */}
      <Footer />
      <ScrollToTop />
    </>
  );
}


export default App;
