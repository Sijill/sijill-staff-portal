import React from 'react';
import { HandMetal, Syringe } from 'lucide-react';
import { formatEnumLabel } from '../../../constants/medicalConstants';
import { TEXT_DARK, TEAL_FILL, TEAL_PLACEHOLDER } from './constants';
import AllergyModal from './AllergyModal';
import DiagnosisSearchField from './DiagnosisSearchField';
import { AddButton, Field, Panel, RemoveButton, Row, Section, Toggle } from './FormPrimitives';
import { createDiagnosis } from './helpers';

export default function DiagnosisSection(props) {
  const { diagnoses, setDiagnoses, allergies, setAllergies, showAllergyModal, setShowAllergyModal, updateListItem, removeListItem, canDocumentEncounter } = props;

  return (
    <>
      <Section icon={Syringe} title="Diagnosis">
        {diagnoses.map((diagnosis) => (
          <Panel key={diagnosis.id}>
            <Row mb="10px">
              <DiagnosisSearchField diagnosis={diagnosis} disabled={!canDocumentEncounter} onChange={(patch) => updateListItem(setDiagnoses, diagnosis.id, patch)} />
              <Toggle checked={diagnosis.isChronic} onChange={(value) => updateListItem(setDiagnoses, diagnosis.id, { isChronic: value })} label="Chronic Condition" />
              {diagnoses.length > 1 ? <RemoveButton onClick={() => removeListItem(setDiagnoses, diagnosis.id)} label={`Remove diagnosis ${diagnosis.icd11Title || ''}`} /> : null}
            </Row>
            <Field as="textarea" rows={4} placeholder="Clinical description..." value={diagnosis.clinicalDescription} onChange={(event) => updateListItem(setDiagnoses, diagnosis.id, { clinicalDescription: event.target.value })} style={{ resize: 'vertical' }} />
          </Panel>
        ))}

        {allergies.length ? allergies.map((allergy) => <SavedAllergy key={allergy.id} allergy={allergy} onRemove={() => setAllergies((current) => current.filter((item) => item.id !== allergy.id))} />) : null}

        <Row mb="0">
          <AddButton label="Add Another Diagnosis" onClick={() => setDiagnoses((current) => [...current, createDiagnosis()])} />
          <div style={{ flex: 1 }} />
          <button type="button" onClick={() => setShowAllergyModal(true)} disabled={!canDocumentEncounter} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: TEXT_DARK, border: 'none', borderRadius: '9px', color: '#fff', fontSize: '0.875rem', fontWeight: 600, cursor: canDocumentEncounter ? 'pointer' : 'not-allowed', opacity: canDocumentEncounter ? 1 : 0.6 }}>
            <HandMetal size={15} strokeWidth={2} />
            <span>Set a New Allergy</span>
          </button>
        </Row>
      </Section>

      {showAllergyModal ? <AllergyModal onClose={() => setShowAllergyModal(false)} onSave={(allergy) => setAllergies((current) => [...current, allergy])} /> : null}
    </>
  );
}

function SavedAllergy({ allergy, onRemove }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: TEAL_FILL, borderRadius: '8px', padding: '8px 12px', marginBottom: '6px', fontSize: '0.875rem', color: TEXT_DARK }}>
      <span style={{ fontWeight: 600 }}>{allergy.allergenName}</span>
      {allergy.severity ? <span style={{ background: TEXT_DARK, color: '#fff', borderRadius: '4px', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 600 }}>{formatEnumLabel(allergy.severity)}</span> : null}
      {allergy.reactionDescription ? <span style={{ color: TEAL_PLACEHOLDER, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{allergy.reactionDescription}</span> : null}
      <RemoveButton onClick={onRemove} label={`Remove allergy ${allergy.allergenName}`} />
    </div>
  );
}
