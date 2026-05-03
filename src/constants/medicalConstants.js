export const BLOOD_TYPE_OPTIONS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN'];

export const DOSAGE_UNIT_OPTIONS = [
  'MG',
  'MCG',
  'G',
  'ML',
  'IU',
  'UNITS',
  'DROPS',
  'PUFFS',
  'TABLETS',
  'CAPSULES',
  'TEASPOONS',
];

export const MEDICATION_FORM_OPTIONS = [
  'TABLET',
  'CAPSULE',
  'LIQUID',
  'INJECTION',
  'TOPICAL',
  'INHALER',
  'DROPS',
  'PATCH',
  'OTHER',
];

export const MEDICATION_FREQUENCY_OPTIONS = [
  'ONCE_DAILY',
  'TWICE_DAILY',
  'THREE_TIMES_DAILY',
  'FOUR_TIMES_DAILY',
  'EVERY_6_HOURS',
  'EVERY_8_HOURS',
  'EVERY_12_HOURS',
  'ONCE_WEEKLY',
  'TWICE_WEEKLY',
  'ONCE_MONTHLY',
  'AS_NEEDED',
];

export const ORDER_PRIORITY_OPTIONS = ['ROUTINE', 'URGENT', 'STAT'];

export const ALLERGY_SEVERITY_OPTIONS = ['MILD', 'MODERATE', 'SEVERE', 'LIFE_THREATENING'];

export const IMAGING_TYPE_OPTIONS = [
  { id: 1, label: 'X-RAY' },
  { id: 2, label: 'CT SCAN' },
  { id: 3, label: 'MRI' },
  { id: 4, label: 'ULTRASOUND' },
  { id: 5, label: 'PET SCAN' },
  { id: 6, label: 'MAMMOGRAPHY' },
  { id: 7, label: 'FLUOROSCOPY' },
  { id: 8, label: 'ECHOCARDIOGRAPHY' },
  { id: 9, label: 'DEXA SCAN' },
  { id: 10, label: 'ANGIOGRAPHY' },
];

export const BODY_PART_OPTIONS = [
  { id: 1, label: 'HEAD' },
  { id: 2, label: 'NECK' },
  { id: 3, label: 'CHEST' },
  { id: 4, label: 'ABDOMEN' },
  { id: 5, label: 'PELVIS' },
  { id: 6, label: 'SPINE' },
  { id: 7, label: 'SHOULDER' },
  { id: 8, label: 'ELBOW' },
  { id: 9, label: 'WRIST' },
  { id: 10, label: 'HAND' },
  { id: 11, label: 'HIP' },
  { id: 12, label: 'KNEE' },
  { id: 13, label: 'ANKLE' },
  { id: 14, label: 'FOOT' },
  { id: 15, label: 'FULL BODY' },
  { id: 16, label: 'UPPER EXTREMITY' },
  { id: 17, label: 'LOWER EXTREMITY' },
];

export const TEST_TYPE_OPTIONS = [
  { id: 1, label: 'COMPLETE BLOOD COUNT' },
  { id: 2, label: 'BASIC METABOLIC PANEL' },
  { id: 3, label: 'COMPREHENSIVE METABOLIC PANEL' },
  { id: 4, label: 'LIPID PANEL' },
  { id: 5, label: 'THYROID FUNCTION' },
  { id: 6, label: 'LIVER FUNCTION' },
  { id: 7, label: 'KIDNEY FUNCTION' },
  { id: 8, label: 'URINALYSIS' },
  { id: 9, label: 'BLOOD GLUCOSE' },
  { id: 10, label: 'HBA1C' },
  { id: 11, label: 'COAGULATION PANEL' },
  { id: 12, label: 'BLOOD CULTURE' },
  { id: 13, label: 'URINE CULTURE' },
  { id: 14, label: 'STI PANEL' },
  { id: 15, label: 'HEPATITIS PANEL' },
  { id: 16, label: 'HIV TEST' },
  { id: 17, label: 'PREGNANCY TEST' },
  { id: 18, label: 'VITAMIN D' },
  { id: 19, label: 'IRON PANEL' },
  { id: 20, label: 'CARDIAC ENZYMES' },
];

export const SPECIMEN_TYPE_OPTIONS = [
  { id: 1, label: 'BLOOD' },
  { id: 2, label: 'URINE' },
  { id: 3, label: 'STOOL' },
  { id: 4, label: 'SALIVA' },
  { id: 5, label: 'SWAB' },
  { id: 6, label: 'TISSUE BIOPSY' },
  { id: 7, label: 'SPUTUM' },
  { id: 8, label: 'CEREBROSPINAL FLUID' },
  { id: 9, label: 'PLEURAL FLUID' },
  { id: 10, label: 'BONE MARROW' },
];

export function formatEnumLabel(value) {
  if (!value) {
    return 'Not provided';
  }

  return value.replace(/_/g, ' ');
}

export function formatDate(value) {
  if (!value) {
    return 'Not provided';
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(value) {
  if (!value) {
    return 'Not provided';
  }

  return new Date(value).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatPatientMeta(patient = {}) {
  const parts = [];

  if (patient.age !== undefined && patient.age !== null) {
    parts.push(`${patient.age} Years`);
  }

  if (patient.gender) {
    parts.push(formatEnumLabel(patient.gender));
  }

  return parts.join(' - ') || 'No additional details';
}

export function getSeverityTone(severity) {
  switch (severity) {
    case 'LIFE_THREATENING':
      return 'danger';
    case 'SEVERE':
      return 'rose';
    case 'MODERATE':
      return 'sand';
    case 'MILD':
      return 'mint';
    default:
      return 'teal';
  }
}
