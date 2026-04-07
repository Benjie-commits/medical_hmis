import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Doctor from './pages/Doctor';
import Nurse from './pages/Nurse';
import Manager from './pages/Manager';
import Labtech from './pages/Labtech';
import Patient from './pages/Patient';
import Pharmacist from './pages/Pharmacist';
import Receptionist from './pages/Receptionist';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/nurse" element={<Nurse />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/labtech" element={<Labtech />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/pharmacist" element={<Pharmacist />} />
        <Route path="/receptionist" element={<Receptionist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;