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
import Test from "./test";
import AdminRDV from "./pages/AdminPages/AdminRDV";
import AdminPatients from "./pages/AdminPages/AdminPatients";
import SecretaryDashboard from "./pages/SecretaryPages/SecretaryDashboard";
import DoctorDashboard from "./pages/DoctorPages/DoctorDashboard";
import SecretaryRDV from "./pages/SecretaryPages/SecretaryRDV";
import SecretaryConsultation from "./pages/SecretaryPages/SecretaryConsultation";

//Providers
//import { AdminProvider } from "../Contexts/AdminContext";

//Administrateur pages
//import Homepage from "../pages/Homepage/Homepage";



function App() {
  useEffect(() => {
    document.title = "MediCare";
  }, []);

  const [user, setUser] = useState(null);

  return (
    <Router>
        <Routes>
            <Route path="/" element={<CabinetLoginPage />}></Route>
            <Route path="/cabinet/type-utilisateur" element={<ChoicePage />}></Route>
            <Route path="/cabinet/login" element={<CabinetLoginPage />}></Route>
            <Route path="/admin/login" element={<AdminLoginPage />}></Route>
            <Route path="/doctor/login" element={<DoctorLoginPage />}></Route>
            <Route path="/secretaire/login" element={<SecretaryLoginPage />}></Route>
            <Route path="/secretaire/dashboard" element={<SecretaryDashboard />}></Route>
            <Route path="/superAdmin/login" element={<SuperAdminLogin />}></Route>
            <Route path="/superAdmin/dashboard" element={<SuperAdminDashboard />}></Route>
            <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
            <Route path="/admin/patients" element={<AdminPatients />}></Route>
            <Route path="/admin/rdv" element={<AdminRDV />}></Route>
            <Route path="/superAdmin/ajouterCabinet" element={<SuperAdminAddCabinet />}></Route>
            <Route path="/doctor/dashboard" element={<DoctorDashboard />}></Route>
            <Route path="/secretaire/rdv" element={<SecretaryRDV />}></Route>
            <Route path="/secretaire/rdv/consultation/:rdvId" element={<SecretaryConsultation />}></Route>
        </Routes>
      {/* <AdminProvider>
        <Routes>
          
        </Routes>
      </AdminProvider>
      <EncadrantProvider>
        <Routes>
          
        </Routes>
      </EncadrantProvider>
      <StagiaireProvider>
        <Routes>
          
        </Routes>
      </StagiaireProvider> */}
    </Router>
  );
}

export default App;
