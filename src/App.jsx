import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/auth/LoginPage';
import RegisterTypePage from './Pages/auth/RegisterTypePage';
import HealthcareProviderRegistration from './Pages/auth/HealthcareProviderRegistration';
import RegisterLabCenter from './Pages/auth/RegisterLabCenter';
import RegisterImagingCenter from './Pages/auth/RegisterImagingCenter';
import OTPVerification from './Components/registration/OTPVerification';
import RegistrationSubmitted from './Pages/RegistrationSubmitted';
import ProviderSessionPage from './Pages/provider/ProviderSessionPage';
import PatientMedicalIdentity from './Pages/provider/PatientMedicalIdentity';
import MedicalHistory from './Pages/provider/MedicalHistory';
import DocumentSession from './Pages/provider/DocumentSession';
import EncounterRecorded from './Pages/provider/EncounterRecorded';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registerType" element={<RegisterTypePage />} />

          <Route
            path="/register/doctor_registration"
            element={<HealthcareProviderRegistration />}
          />
          <Route path="/register/lab_registration" element={<RegisterLabCenter />} />
          <Route path="/register/imaging_registration" element={<RegisterImagingCenter />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/registration-submitted" element={<RegistrationSubmitted />} />
          <Route path="/provider-session" element={<ProviderSessionPage />} />
          <Route
            path="/provider-session/patient-medical-identity"
            element={<PatientMedicalIdentity />}
          />
          <Route path="/provider-session/patient-medical-history" element={<MedicalHistory />} />
          <Route path="/provider-session/patient-document-session" element={<DocumentSession />} />
          <Route path="/provider-session/encounter-recorded" element={<EncounterRecorded />} />

          <Route>
            {/* <Route path="*" element={<ErrorPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
