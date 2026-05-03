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

export default function buildMedicalIdentitySections(identity) {
  return [
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
            note: `Prescribed by ${item.prescribedBy} - ${formatDateTime(item.prescribedAt)}`,
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
