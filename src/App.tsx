import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CarInsuranceCover } from "./Pages/CarInsurance/CarInsuranceCover";
import { CarInsuranceDetails } from "./Pages/CarInsurance/CarInsuraceDetails";
import { CarInsurancePolicyCover } from "./Pages/CarInsurance/CarInsurancePolicyCover";
import { CarInsuranceValuation } from "./Pages/CarInsurance/CarInsuranceValuation";
import { MotorCycleInsuranceCover } from "./Pages/MotorCycleInsurance/MotorCycleInsuranceCover";
import { PersonalAccidentCover } from "./Pages/PersonalAccident/PersonalAccidentCover";
import { MotorCycleInsuranceDetails } from "./Pages/MotorCycleInsurance/MotorCycleInsuraceDetails";
import { InsuranceCoverPayment } from "./Pages/Payment/InsuranceCoverPayment";
import { Resources } from "./Pages/ToolsAndResources/Resources";
import { AgentOnboard } from "./Pages/Agent/AgentOnboard";
import { AskAnAgent } from "./Pages/ToolsAndResources/AskAnAgent";
import { Register } from "./Pages/Auth/Register";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import { PartnerWithUs } from "./Pages/Partner/PartnerWithUs";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resources" element={<Resources />} />
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
        <Route
          path="/insurance/motor-cycle"
          element={<MotorCycleInsuranceCover />}
        />
         <Route
          path="/insurance/personal-accident"
          element={<PersonalAccidentCover />}
        />
        <Route
          path="/insurance/motorcycle/details"
          element={<MotorCycleInsuranceDetails />}
        />
        <Route path="/payment" element={<InsuranceCoverPayment />} />

        <Route path="/partner" element={<PartnerWithUs />} />

        <Route path="/partner-with-us" element={<AgentOnboard />} />
        <Route path="/ask-an-agent" element={<AskAnAgent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
