import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CarInsuranceCover } from "./Pages/CarInsurance/CarInsuranceCover";
import { CarInsuranceDetails } from "./Pages/CarInsurance/CarInsuraceDetails";
import { CarInsurancePolicyCover } from "./Pages/CarInsurance/CarInsurancePolicyCover";
import { CarInsuranceValuation } from "./Pages/CarInsurance/CarInsuranceValuation";
import { Register } from "./Pages/Auth/Register";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insurance/motor-car" element={<CarInsuranceCover />} />
        <Route
          path="/insurance/motor-car/car-details"
          element={<CarInsuranceDetails />}
        />
        <Route
          path="/insurance/motor-car/coverage"
          element={<CarInsurancePolicyCover />}
        />
        <Route
          path="/insurance/motor-car/valuation"
          element={<CarInsuranceValuation />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
