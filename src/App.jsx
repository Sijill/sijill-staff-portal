import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './Components/routing/ProtectedRoute';
import ErrorPage from './Pages/ErrorPage';
import LandingPage from './Pages/LandingPage';
import ForgotPasswordPage from './Pages/auth/ForgotPasswordPage';
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
import LabSessionPage from './Pages/portal/LabSessionPage';
import LabOrderPatientView from './Pages/portal/LabOrderPatientView';
import LabUploadResultsPage from './Pages/portal/LabUploadResultsPage';
import LabResultSubmittedPage from './Pages/portal/LabResultSubmittedPage';
import ImagingSessionPage from './Pages/portal/ImagingSessionPage';
import ImagingOrderPatientView from './Pages/portal/ImagingOrderPatientView';
import ImagingUploadResultsPage from './Pages/portal/ImagingUploadResultsPage';
import ImagingResultSubmittedPage from './Pages/portal/ImagingResultSubmittedPage';
import { PORTAL_TYPES } from './constants/portalSessionConfig';
import { USER_ROLES } from './utils/authSession';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/registerType" element={<RegisterTypePage />} />

          <Route
            path="/register/doctor_registration"
            element={<HealthcareProviderRegistration />}
          />
          <Route path="/register/lab_registration" element={<RegisterLabCenter />} />
          <Route path="/register/imaging_registration" element={<RegisterImagingCenter />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/registration-submitted" element={<RegistrationSubmitted />} />
          <Route
            path="/provider-session"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.HEALTHCARE_PROVIDER]}>
                <ProviderSessionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider-session/patient-medical-identity"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLES.HEALTHCARE_PROVIDER]}
                sessionType="clinical"
              >
                <PatientMedicalIdentity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider-session/patient-medical-history"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLES.HEALTHCARE_PROVIDER]}
                sessionType="clinical"
              >
                <MedicalHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider-session/patient-document-session"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLES.HEALTHCARE_PROVIDER]}
                sessionType="clinical"
              >
                <DocumentSession />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider-session/encounter-recorded"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLES.HEALTHCARE_PROVIDER]}
                sessionType="clinical"
              >
                <EncounterRecorded />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lab-session"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.LAB]}>
                <LabSessionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lab-session/order"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLES.LAB]}
                sessionType="portal"
                portalConfig={PORTAL_TYPES.LAB}
              >
                <LabOrderPatientView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lab-session/upload-results"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLES.LAB]}
                sessionType="portal"
                portalConfig={PORTAL_TYPES.LAB}
              >
                <LabUploadResultsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lab-session/result-submitted"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLES.LAB]}
                sessionType="portal"
                portalConfig={PORTAL_TYPES.LAB}
              >
                <LabResultSubmittedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/imaging-session"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.IMAGING_CENTER]}>
                <ImagingSessionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/imaging-session/order"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLES.IMAGING_CENTER]}
                sessionType="portal"
                portalConfig={PORTAL_TYPES.IMAGING_CENTER}
              >
                <ImagingOrderPatientView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/imaging-session/upload-results"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLES.IMAGING_CENTER]}
                sessionType="portal"
                portalConfig={PORTAL_TYPES.IMAGING_CENTER}
              >
                <ImagingUploadResultsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/imaging-session/result-submitted"
            element={
              <ProtectedRoute
                allowedRoles={[USER_ROLES.IMAGING_CENTER]}
                sessionType="portal"
                portalConfig={PORTAL_TYPES.IMAGING_CENTER}
              >
                <ImagingResultSubmittedPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
