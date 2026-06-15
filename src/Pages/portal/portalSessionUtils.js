import { ClipboardList, FlaskConical, ScanLine } from 'lucide-react';
import {
  formatEnumLabel,
  IMAGING_TYPE_OPTIONS,
  TEST_TYPE_OPTIONS,
  SPECIMEN_TYPE_OPTIONS,
  BODY_PART_OPTIONS,
} from '../../constants/medicalConstants';

function findOptionLabel(options, value) {
  if (value === null || value === undefined || value === '') {
    return 'Not provided';
  }

  const match = options.find(
    (option) =>
      option.id === value ||
      option.id === Number(value) ||
      option.label === value ||
      String(option.id) === String(value)
  );

  return match?.label ? formatEnumLabel(match.label) : formatEnumLabel(String(value));
}

function buildDetailItem(label, value) {
  return {
    title: label,
    subtitle: value || 'Not provided',
    note: '',
    tone: 'teal',
  };
}

export function buildLabOrderSection(order) {
  const safeOrder = order ?? {};

  return {
    title: 'Lab Order Details',
    icon: FlaskConical,
    items: [
      buildDetailItem('Test Type', findOptionLabel(TEST_TYPE_OPTIONS, safeOrder.testType ?? safeOrder.testTypeId)),
      buildDetailItem('Specimen Type', findOptionLabel(SPECIMEN_TYPE_OPTIONS, safeOrder.specimenType ?? safeOrder.specimenTypeId)),
      buildDetailItem('Priority', formatEnumLabel(safeOrder.priority)),
      buildDetailItem('Fasting Required', safeOrder.fastingRequired ? 'Yes' : 'No'),
      buildDetailItem('Clinical Indication', safeOrder.clinicalIndication || safeOrder.indication),
      buildDetailItem('Ordered By', safeOrder.orderedBy),
    ],
  };
}

export function buildImagingOrderSection(order) {
  const safeOrder = order ?? {};

  return {
    title: 'Imaging Order Details',
    icon: ScanLine,
    items: [
      buildDetailItem('Imaging Type', findOptionLabel(IMAGING_TYPE_OPTIONS, safeOrder.imagingType ?? safeOrder.imagingTypeId)),
      buildDetailItem('Body Part', findOptionLabel(BODY_PART_OPTIONS, safeOrder.bodyPart ?? safeOrder.bodyPartId)),
      buildDetailItem('Priority', formatEnumLabel(safeOrder.priority)),
      buildDetailItem('Contrast Used', safeOrder.contrastUsed ? 'Yes' : 'No'),
      buildDetailItem('Clinical Indication', safeOrder.clinicalIndication || safeOrder.indication),
      buildDetailItem('Ordered By', safeOrder.orderedBy),
    ],
  };
}

export function buildPatientIdentitySection(identity) {
  const basicInfo = identity?.basicInfo ?? identity ?? {};

  return {
    title: 'Patient Medical Identity',
    icon: ClipboardList,
    items: [
      buildDetailItem('Name', basicInfo.fullName || basicInfo.name),
      buildDetailItem('Age', basicInfo.age !== undefined && basicInfo.age !== null ? `${basicInfo.age} years` : null),
      buildDetailItem('Gender', formatEnumLabel(basicInfo.gender)),
      buildDetailItem('Blood Type', basicInfo.bloodType),
      buildDetailItem('Weight', basicInfo.weightKg ? `${basicInfo.weightKg} kg` : null),
      buildDetailItem('Height', basicInfo.heightCm ? `${basicInfo.heightCm} cm` : null),
    ],
  };
}

export function buildCompactMedicalSections(identity) {
  const allergies = identity?.allergies ?? [];
  const medications = identity?.currentMedications ?? [];
  const diagnoses = identity?.activeDiagnoses ?? [];

  return [
    {
      title: 'Allergies',
      icon: ClipboardList,
      items: allergies.length
        ? allergies.map((item) => ({
            title: item.allergenName,
            subtitle: item.reactionDescription || 'No reaction description provided',
            note: `Severity: ${formatEnumLabel(item.severity)}`,
            tone: 'teal',
          }))
        : [{ title: 'No allergies recorded', subtitle: 'No records available', note: '', tone: 'mint' }],
    },
    {
      title: 'Current Medications',
      icon: ClipboardList,
      items: medications.length
        ? medications.map((item) => ({
            title: item.medicationName,
            subtitle: `${item.dosageAmount ?? ''} ${item.dosageUnit ?? ''}`.trim(),
            note: `${formatEnumLabel(item.form)} - ${formatEnumLabel(item.frequency)}`,
            tone: 'teal',
          }))
        : [{ title: 'No current medications', subtitle: 'No records available', note: '', tone: 'mint' }],
    },
    {
      title: 'Active Diagnoses',
      icon: ClipboardList,
      items: diagnoses.length
        ? diagnoses.map((item) => ({
            title: item.icd11Title,
            subtitle: `ICD-11 - ${item.icd11Code}`,
            note: item.diagnosedBy ? `Diagnosed by ${item.diagnosedBy}` : '',
            tone: 'teal',
          }))
        : [{ title: 'No active diagnoses', subtitle: 'No records available', note: '', tone: 'mint' }],
    },
  ];
}