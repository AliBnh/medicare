import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CabinetLoginPage from "./pages/CabinetLoginPage/CabinetLoginPage";
import SuperAdminLogin from "./pages/SuperAdmin/SuperAdminLogin";
import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import SuperAdminAddCabinet from "./pages/SuperAdmin/SuperAdminAddCabinet";
import AdminLoginPage from "./pages/AdminPages/AdminLoginPage";
import SecretaryLoginPage from "./pages/SecretaryPages/SecretaryLoginPage";
import ChoicePage from "./pages/ChoicePages/ChoicePage";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import DoctorLoginPage from "./pages/DoctorPages/DoctorLoginPage";
import SecretaryPatients from "./pages/SecretaryPages/SecretaryPatients";
import DoctorPatients from "./pages/DoctorPages/DoctorPatients";
import SecretaryRDV from "./pages/SecretaryPages/SecretaryRDV";
import DoctorConsultation from "./pages/DoctorPages/DoctorConsultation";
import DoctorRDV from "./pages/DoctorPages/DoctorRDV";
import PatientDetails from "./pages/PatientDetails";
function App() {
  useEffect(() => {
    document.title = "MediCare";
  }, []);

  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CabinetLoginPage />}></Route>
        <Route
          path="/cabinet/type-utilisateur"
          element={<ChoicePage />}
        ></Route>
        <Route path="/cabinet/login" element={<CabinetLoginPage />}></Route>
        <Route path="/admin/login" element={<AdminLoginPage />}></Route>
        <Route path="/doctor/login" element={<DoctorLoginPage />}></Route>
        <Route
          path="/secretaire/login"
          element={<SecretaryLoginPage />}
        ></Route>
        <Route path="/patients" element={<SecretaryPatients />}></Route>
        <Route path="/superAdmin/login" element={<SuperAdminLogin />}></Route>
        <Route
          path="/superAdmin/dashboard"
          element={<SuperAdminDashboard />}
        ></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        <Route
          path="/superAdmin/ajouterCabinet"
          element={<SuperAdminAddCabinet />}
        ></Route>
        <Route path="/doctor/patients" element={<DoctorPatients />}></Route>
        <Route path="/doctor/rdv" element={<DoctorRDV />}></Route>
        <Route path="/rdv" element={<SecretaryRDV />}></Route>
        <Route
          path="/doctor/rdv/consultation/:patientId/:rdvId"
          element={<DoctorConsultation />}
        ></Route>
        <Route
          path="/patient/documents/:patientId"
          element={<PatientDetails />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
