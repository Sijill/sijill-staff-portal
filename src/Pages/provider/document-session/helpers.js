export function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const createSymptom = () => ({ id: createId(), title: '', description: '' });
export const createDiagnosis = () => ({ id: createId(), searchText: '', icd11Code: '', icd11Title: '', clinicalDescription: '', isChronic: false });
export const createMedication = () => ({ id: createId(), medicationName: '', dosageAmount: '', dosageUnit: '', form: '', frequency: '', startDate: '', endDate: '', instructions: '', diagnosisIndex: '' });
export const createImagingOrder = () => ({ id: createId(), imagingTypeId: '', bodyPartId: '', priority: '', contrastUsed: false, clinicalIndication: '' });
export const createLabOrder = () => ({ id: createId(), testTypeId: '', specimenTypeId: '', priority: '', fastingRequired: false, clinicalIndication: '' });
export const createAllergy = () => ({ id: createId(), allergenName: '', severity: '', reactionDescription: '' });

export function trimValue(value) {
  return typeof value === 'string' ? value.trim() : value;
}

export function hasAnyMedicationValue(item) {
  return Boolean(item.medicationName || item.dosageAmount || item.dosageUnit || item.form || item.frequency || item.startDate || item.endDate || item.instructions || item.diagnosisIndex !== '');
}

export function hasAnyImagingValue(item) {
  return Boolean(item.imagingTypeId || item.bodyPartId || item.priority || item.clinicalIndication || item.contrastUsed);
}

export function hasAnyLabValue(item) {
  return Boolean(item.testTypeId || item.specimenTypeId || item.priority || item.clinicalIndication || item.fastingRequired);
}

export function hasAnyAllergyValue(item) {
  return Boolean(item.allergenName || item.severity || item.reactionDescription);
}

function toIsoDateTime(dateValue) {
  return dateValue ? new Date(`${dateValue}T00:00:00`).toISOString() : undefined;
}

export function buildEncounterPayload({ symptoms, diagnoses, medications, imagingOrders, labOrders, allergies, appointment }) {
  return {
    locationAddress: trimValue(appointment.locationAddress) || undefined,
    symptoms: symptoms.map((item) => ({ title: trimValue(item.title), description: trimValue(item.description) || undefined })).filter((item) => item.title),
    diagnoses: diagnoses.map((item) => ({ icd11Code: trimValue(item.icd11Code), icd11Title: trimValue(item.icd11Title), clinicalDescription: trimValue(item.clinicalDescription) || undefined, isChronic: Boolean(item.isChronic) })).filter((item) => item.icd11Code && item.icd11Title),
    medications: medications.filter(hasAnyMedicationValue).map((item) => ({ medicationName: trimValue(item.medicationName), dosageAmount: Number(item.dosageAmount), dosageUnit: item.dosageUnit, form: item.form, frequency: item.frequency, startDate: item.startDate, endDate: item.endDate || undefined, instructions: trimValue(item.instructions) || undefined, diagnosisIndex: item.diagnosisIndex === '' ? undefined : Number(item.diagnosisIndex) })),
    labOrders: labOrders.filter(hasAnyLabValue).map((item) => ({ testTypeId: Number(item.testTypeId), specimenTypeId: item.specimenTypeId ? Number(item.specimenTypeId) : undefined, priority: item.priority, fastingRequired: Boolean(item.fastingRequired), clinicalIndication: trimValue(item.clinicalIndication) || undefined })),
    imagingOrders: imagingOrders.filter(hasAnyImagingValue).map((item) => ({ imagingTypeId: Number(item.imagingTypeId), bodyPartId: Number(item.bodyPartId), priority: item.priority, contrastUsed: Boolean(item.contrastUsed), clinicalIndication: trimValue(item.clinicalIndication) || undefined })),
    allergies: allergies.filter(hasAnyAllergyValue).map((item) => ({ allergenName: trimValue(item.allergenName), severity: item.severity, reactionDescription: trimValue(item.reactionDescription) || undefined })),
    nextAppointmentDate: toIsoDateTime(appointment.nextAppointmentDate),
    appointmentNotes: trimValue(appointment.appointmentNotes) || undefined,
  };
}

export function validateEncounterDraft(formState) {
  const payload = buildEncounterPayload(formState);
  if (!payload.symptoms.length) return 'Add at least one symptom or complaint.';
  if (!payload.diagnoses.length) return 'Select at least one ICD-11 diagnosis.';
  if (formState.diagnoses.some((item) => trimValue(item.searchText) && !(item.icd11Code && item.icd11Title))) return 'Choose ICD-11 diagnoses from the suggestions list before submitting.';

  for (const item of formState.medications.filter(hasAnyMedicationValue)) {
    if (!item.medicationName || !item.dosageAmount || !item.dosageUnit || !item.form || !item.frequency || !item.startDate) return 'Each medication row needs name, dosage, unit, form, frequency, and start date.';
    if (item.endDate && item.endDate < item.startDate) return 'Medication end date cannot be earlier than the start date.';
  }

  for (const item of formState.imagingOrders.filter(hasAnyImagingValue)) {
    if (!item.imagingTypeId || !item.bodyPartId || !item.priority) return 'Each imaging order needs imaging type, body part, and priority.';
  }

  for (const item of formState.labOrders.filter(hasAnyLabValue)) {
    if (!item.testTypeId || !item.priority) return 'Each lab order needs test type and priority.';
  }

  for (const item of formState.allergies.filter(hasAnyAllergyValue)) {
    if (!item.allergenName || !item.severity) return 'Each allergy needs an allergen name and severity.';
  }

  return null;
}
