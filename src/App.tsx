import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CarInsuranceCover } from "./Pages/CarInsurance/CarInsuranceCover";
import { CarInsuranceDetails } from "./Pages/CarInsurance/CarInsuraceDetails";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insurance/motor-car" element={<CarInsuranceCover />} />
        <Route
          path="/insurance/motor-car/car-details"
          element={<CarInsuranceDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
