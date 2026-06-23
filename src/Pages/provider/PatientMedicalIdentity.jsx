import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, LoaderCircle, Ruler, Scale, ShieldPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EditableStatModal from '../../Components/provider/EditableStatModal';
import MedicalInfoSection from '../../Components/provider/MedicalInfoSection';
import ProviderLoadingToast from '../../Components/provider/ProviderLoadingToast';
import ProviderSessionLayout from '../../Components/provider/ProviderSessionLayout';
import ProviderStatusMessage from '../../Components/provider/ProviderStatusMessage';
import { getMedicalIdentity, updatePatientVitals } from '../../api/clinicalApi';
import { BLOOD_TYPE_OPTIONS } from '../../constants/medicalConstants';
import { saveClinicalSession } from '../../utils/clinicalSession';
import buildMedicalIdentitySections from './medicalIdentitySections';
import useProviderClinicalSession from './useProviderClinicalSession';
import { canWriteClinicalSession, resolvePatientImageUrl } from './providerSessionUtils';

export default function PatientMedicalIdentity() {
  const navigate = useNavigate();
  const { clinicalSession, patient } = useProviderClinicalSession();
  const [identity, setIdentity] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [modal, setModal] = useState({ type: null, value: '' });

  useEffect(() => {
    if (!clinicalSession?.sessionId || !clinicalSession?.clinicalSessionToken) {
      return;
    }

    const loadMedicalIdentity = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        setIdentity(await getMedicalIdentity(clinicalSession.sessionId, clinicalSession.clinicalSessionToken));
      } catch (error) {
        setErrorMessage(error.message || 'Unable to load medical identity.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMedicalIdentity();
  }, [clinicalSession?.clinicalSessionToken, clinicalSession?.sessionId]);

  const canEditVitals = canWriteClinicalSession(clinicalSession?.accessType);
  const basicInfo = identity?.basicInfo ?? {};
  const sections = useMemo(() => buildMedicalIdentitySections(identity), [identity]);
  const stats = buildStats(basicInfo, canEditVitals, setModal);
  const patientWithImage = useMemo(
    () => ({
      ...patient,
      imageUrl:
        resolvePatientImageUrl(clinicalSession?.patient) ||
        resolvePatientImageUrl(identity?.patient) ||
        resolvePatientImageUrl(identity?.patientInfo) ||
        resolvePatientImageUrl(identity?.basicInfo) ||
        resolvePatientImageUrl(identity),
    }),
    [clinicalSession?.patient, identity, patient]
  );

  const handleVitalsUpdate = async (payload) => {
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await updatePatientVitals(clinicalSession.sessionId, payload, clinicalSession.clinicalSessionToken);
      setIdentity((current) => ({
        ...current,
        basicInfo: {
          ...current?.basicInfo,
          bloodType: response.bloodType ?? current?.basicInfo?.bloodType ?? null,
          weightKg: response.weightKg ?? current?.basicInfo?.weightKg ?? null,
          heightCm: response.heightCm ?? current?.basicInfo?.heightCm ?? null,
        },
      }));
      saveClinicalSession(clinicalSession);
      setModal({ type: null, value: '' });
      setSuccessMessage(response.updatedFields?.length ? `Updated ${response.updatedFields.join(', ')}.` : 'Vitals updated successfully.');
    } catch (error) {
      setErrorMessage(error.message || 'Unable to update patient vitals.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <ProviderSessionLayout patient={patientWithImage} stats={stats} onBack={() => navigate('/provider-session')}>
        {isLoading ? (
          <ProviderStatusMessage icon={LoaderCircle} message="Loading medical identity..." tone="info" className="py-5" />
        ) : (
          <>
            <ProviderStatusMessage icon={AlertCircle} message={errorMessage} tone="danger" />
            <ProviderStatusMessage icon={CheckCircle2} message={successMessage} tone="success" />
            {sections.map((section) => <MedicalInfoSection key={section.title} {...section} />)}
          </>
        )}
      </ProviderSessionLayout>

      <EditableStatModal
        show={modal.type === 'bloodType'}
        onHide={() => setModal({ type: null, value: '' })}
        title="Set Patient's Blood Type"
        icon={ShieldPlus}
        controlId="patient-blood-type"
        fieldType="select"
        value={modal.value}
        onChange={(value) => setModal((current) => ({ ...current, value }))}
        options={BLOOD_TYPE_OPTIONS}
        onSave={() => handleVitalsUpdate({ bloodType: modal.value })}
      />

      <StatNumberModal
        modal={modal}
        type="weightKg"
        title="Set Patient's Weight"
        icon={Scale}
        placeholder="Weight / kg"
        onClose={() => setModal({ type: null, value: '' })}
        onChange={(value) => setModal((current) => ({ ...current, value }))}
        onSave={handleVitalsUpdate}
      />

      <StatNumberModal
        modal={modal}
        type="heightCm"
        title="Set Patient's Height"
        icon={Ruler}
        placeholder="Height / cm"
        onClose={() => setModal({ type: null, value: '' })}
        onChange={(value) => setModal((current) => ({ ...current, value }))}
        onSave={handleVitalsUpdate}
      />

      <ProviderLoadingToast message="Saving vitals..." show={isSaving} />
    </>
  );
}

function buildStats(basicInfo, canEditVitals, setModal) {
  return [
    buildStat('Blood Type', basicInfo.bloodType || 'Not set', ShieldPlus, '#fff1f1', '#d14949', canEditVitals && !basicInfo.bloodType, () => setModal({ type: 'bloodType', value: 'UNKNOWN' })),
    buildStat('Weight', basicInfo.weightKg ? `${basicInfo.weightKg} KG` : 'Not set', Scale, '#edf5f4', '#285f62', canEditVitals && !basicInfo.weightKg, () => setModal({ type: 'weightKg', value: '' })),
    buildStat('Height', basicInfo.heightCm ? `${basicInfo.heightCm} CM` : 'Not set', Ruler, '#eefafb', '#36c8d3', canEditVitals && !basicInfo.heightCm, () => setModal({ type: 'heightCm', value: '' })),
  ];
}

function buildStat(label, value, icon, iconBg, iconColor, editable, onEdit) {
  return { label, value, icon, iconBg, iconColor, editable, onEdit };
}

function StatNumberModal({ modal, type, title, icon, placeholder, onClose, onChange, onSave }) {
  return (
    <EditableStatModal
      show={modal.type === type}
      onHide={onClose}
      title={title}
      icon={icon}
      controlId={type}
      fieldType="number"
      value={modal.value}
      onChange={onChange}
      placeholder={placeholder}
      min="1"
      step="1"
      onSave={() => modal.value.trim() && onSave({ [type]: Number(modal.value) })}
    />
  );
}
