import React from 'react';
import { Pill } from 'lucide-react';
import { DOSAGE_UNIT_OPTIONS, MEDICATION_FORM_OPTIONS, MEDICATION_FREQUENCY_OPTIONS } from '../../../constants/medicalConstants';
import { AddButton, DateField, Field, Panel, RemoveButton, Row, Section, SelectField } from './FormPrimitives';
import { createMedication } from './helpers';

export default function MedicationsSection({ medications, diagnoses, setMedications, updateListItem, removeListItem }) {
  const diagnosisOptions = diagnoses.map((item, index) => (item.icd11Code && item.icd11Title ? { id: index, label: `${item.icd11Code} - ${item.icd11Title}` } : null)).filter(Boolean);

  return (
    <Section icon={Pill} title="Prescribed Medications">
      {medications.map((medication) => (
        <Panel key={medication.id}>
          <Row mb="10px">
            <div style={{ flex: 1 }}><Field placeholder="Medication Name..." value={medication.medicationName} onChange={(event) => updateListItem(setMedications, medication.id, { medicationName: event.target.value })} /></div>
            {medications.length > 1 ? <RemoveButton onClick={() => removeListItem(setMedications, medication.id)} label={`Remove medication ${medication.medicationName || ''}`} /> : null}
          </Row>
          <Row><DateField placeholder="Start Date" value={medication.startDate} onChange={(event) => updateListItem(setMedications, medication.id, { startDate: event.target.value })} style={{ flex: 1 }} /><DateField placeholder="End Date" value={medication.endDate} onChange={(event) => updateListItem(setMedications, medication.id, { endDate: event.target.value })} style={{ flex: 1 }} /></Row>
          <Row><Field type="number" min="0" step="0.01" placeholder="Dosage Amount" value={medication.dosageAmount} onChange={(event) => updateListItem(setMedications, medication.id, { dosageAmount: event.target.value })} style={{ flex: 1 }} /><SelectField options={DOSAGE_UNIT_OPTIONS} placeholder="Dosage Unit" value={medication.dosageUnit} onChange={(event) => updateListItem(setMedications, medication.id, { dosageUnit: event.target.value })} style={{ flex: 1 }} /><SelectField options={MEDICATION_FORM_OPTIONS} placeholder="Form" value={medication.form} onChange={(event) => updateListItem(setMedications, medication.id, { form: event.target.value })} style={{ flex: 1 }} /></Row>
          <Row mb="10px"><SelectField options={MEDICATION_FREQUENCY_OPTIONS} placeholder="Frequency" value={medication.frequency} onChange={(event) => updateListItem(setMedications, medication.id, { frequency: event.target.value })} style={{ flex: 1 }} /><SelectField options={diagnosisOptions} placeholder="Link to Diagnosis" value={medication.diagnosisIndex} onChange={(event) => updateListItem(setMedications, medication.id, { diagnosisIndex: event.target.value })} style={{ flex: 1 }} renderLabel={(option) => option.label} /></Row>
          <Field as="textarea" rows={4} placeholder="Instructions..." value={medication.instructions} onChange={(event) => updateListItem(setMedications, medication.id, { instructions: event.target.value })} style={{ resize: 'vertical' }} />
        </Panel>
      ))}
      <AddButton label="Add Another Prescription" onClick={() => setMedications((current) => [...current, createMedication()])} />
    </Section>
  );
}
