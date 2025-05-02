import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { ScrollToTop } from "./components/ScrollToTop";
import { Services } from "./components/Services";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Services />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
