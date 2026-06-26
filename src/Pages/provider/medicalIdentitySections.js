import { ClipboardList, HeartPulse, PhoneCall, Pill, TriangleAlert } from 'lucide-react';
import { formatDate, formatDateTime, formatEnumLabel, getSeverityTone } from '../../constants/medicalConstants';

function buildFallbackItems(message) {
  return [
    {
      title: message,
      subtitle: 'No records available',
      note: 'New clinical information will appear here once it is available.',
      tone: 'mint',
    },
  ];
}

function buildBasicInfoItems(identity) {
  const basicInfo = identity?.basicInfo ?? {};
  const bmi = calculateBmi(basicInfo.weightKg, basicInfo.heightCm);

  return [
    {
      title: basicInfo.fullName || 'Name not provided',
      subtitle: formatEnumLabel(basicInfo.gender),
      note: basicInfo.age !== undefined && basicInfo.age !== null ? `${basicInfo.age} years old` : 'Age not provided',
      tone: 'teal',
    },
    {
      title: 'Blood Type',
      subtitle: basicInfo.bloodType || 'Not set',
      note: 'Editable from the vitals modal',
      tone: basicInfo.bloodType ? 'teal' : 'mint',
    },
    {
      title: 'Weight',
      subtitle: basicInfo.weightKg !== undefined && basicInfo.weightKg !== null ? `${basicInfo.weightKg} kg` : 'Not set',
      note: 'Editable from the vitals modal',
      tone: basicInfo.weightKg ? 'teal' : 'mint',
    },
    {
      title: 'Height',
      subtitle: basicInfo.heightCm !== undefined && basicInfo.heightCm !== null ? `${basicInfo.heightCm} cm` : 'Not set',
      note: 'Editable from the vitals modal',
      tone: basicInfo.heightCm ? 'teal' : 'mint',
    },
    {
      title: 'BMI',
      subtitle: bmi !== null ? bmi.toFixed(2) : 'Not calculated',
      note: 'Derived from height and weight',
      tone: bmi !== null ? 'teal' : 'mint',
    },
  ];
}

export default function buildMedicalIdentitySections(identity) {
  return [
    {
      title: 'Patient Overview',
      icon: HeartPulse,
      items: identity?.basicInfo ? buildBasicInfoItems(identity) : buildFallbackItems('No patient identity details available'),
    },
    {
      title: 'Active Diagnosis',
      icon: HeartPulse,
      items: identity?.activeDiagnoses?.length
        ? identity.activeDiagnoses.map((item) => ({
            title: item.icd11Title,
            subtitle: `ICD-11 - ${item.icd11Code}`,
            note: `Diagnosed by ${item.diagnosedBy} - ${formatDateTime(item.diagnosedDate)}`,
            tone: 'teal',
          }))
        : buildFallbackItems('No active diagnoses'),
    },
    {
      title: 'Current Medications',
      icon: Pill,
      items: identity?.currentMedications?.length
        ? identity.currentMedications.map((item) => ({
            title: item.medicationName,
            subtitle: `${item.dosageAmount} ${item.dosageUnit} - ${formatEnumLabel(item.form)} - ${formatEnumLabel(item.frequency)}`,
            note: [
              item.prescribedBy ? `Prescribed by ${item.prescribedBy}` : null,
              item.prescribedAt ? formatDateTime(item.prescribedAt) : null,
              item.instructions ? `Instructions: ${item.instructions}` : null,
            ].filter(Boolean).join(' - '),
            meta: `${formatDate(item.startDate)} - ${item.endDate ? formatDate(item.endDate) : 'Ongoing'}`,
            tone: 'teal',
          }))
        : buildFallbackItems('No current medications'),
    },
    {
      title: 'Allergies',
      icon: TriangleAlert,
      items: identity?.allergies?.length
        ? identity.allergies.map((item) => ({
            title: item.allergenName,
            subtitle: item.reactionDescription || 'No reaction description provided',
            note: `Verified by ${item.verifiedBy} - ${formatDate(item.verifiedDate)}`,
            meta: formatEnumLabel(item.severity),
            tone: getSeverityTone(item.severity),
          }))
        : buildFallbackItems('No allergies recorded'),
    },
    {
      title: 'Chronic Conditions',
      icon: ClipboardList,
      items: identity?.chronicConditions?.length
        ? identity.chronicConditions.map((item) => ({
            title: item.icd11Title,
            subtitle: `ICD-11 - ${item.icd11Code}`,
            note: `Diagnosed by ${item.diagnosedBy} - ${formatDateTime(item.diagnosedDate)}`,
            tone: 'teal',
          }))
        : buildFallbackItems('No chronic conditions recorded'),
    },
    {
      title: 'Emergency Contacts',
      icon: PhoneCall,
      items: identity?.emergencyContacts?.length
        ? identity.emergencyContacts.map((item) => ({
            title: item.contactName,
            subtitle: item.phoneNumber,
            note: formatEnumLabel(item.relationship),
            meta: item.isPrimary ? 'Primary' : undefined,
            tone: 'teal',
          }))
        : buildFallbackItems('No emergency contacts recorded'),
    },
  ];
}

function calculateBmi(weightKg, heightCm) {
  if (weightKg === null || weightKg === undefined || heightCm === null || heightCm === undefined) {
    return null;
  }

  const heightInMeters = Number(heightCm) / 100;
  if (!heightInMeters) {
    return null;
  }

  const bmi = Number(weightKg) / (heightInMeters * heightInMeters);
  if (Number.isNaN(bmi) || !Number.isFinite(bmi)) {
    return null;
  }

  return Math.round(bmi * 100) / 100;
}
