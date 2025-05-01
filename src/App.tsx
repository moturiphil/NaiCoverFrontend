import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { CarInsuranceOnboard } from "./Pages/CarInsurance/CarInsuranceOnboard";
import { CarInsuranceCover } from "./Pages/CarInsurance/CarInsuranceCover";
import { CarInsuranceDetails } from "./Pages/CarInsurance/CarInsuraceDetails"
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route
          path="/insurance/motor-car"
          element={<CarInsuranceOnboard />}
        /> */}
        <Route
          path="/insurance/motor-car"
          element={<CarInsuranceCover />}
        />
        <Route
          path="/insurance/motor-car/car-details"
          element={<CarInsuranceDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
