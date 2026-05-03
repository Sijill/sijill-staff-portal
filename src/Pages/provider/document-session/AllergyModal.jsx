import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ALLERGY_SEVERITY_OPTIONS } from '../../../constants/medicalConstants';
import { TEAL_FILL, TEAL_ICON, TEXT_DARK } from './constants';
import { Field, SelectField } from './FormPrimitives';
import { createAllergy, trimValue } from './helpers';

export default function AllergyModal({ onClose, onSave }) {
  const [allergy, setAllergy] = useState(createAllergy());
  const isValid = Boolean(trimValue(allergy.allergenName) && allergy.severity);

  const handleSave = () => {
    if (isValid) {
      onSave(allergy);
      onClose();
    }
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div onClick={(event) => event.stopPropagation()} style={{ background: '#fff', borderRadius: '14px', padding: '28px 28px 24px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: TEXT_DARK }}>Set New Allergy</h3>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: TEAL_ICON, padding: '4px' }}><X size={18} strokeWidth={2.2} /></button>
        </div>

        <Field placeholder="Allergen Name..." value={allergy.allergenName} onChange={(event) => setAllergy((current) => ({ ...current, allergenName: event.target.value }))} style={{ marginBottom: '10px' }} />
        <SelectField options={ALLERGY_SEVERITY_OPTIONS} placeholder="Allergy Severity" value={allergy.severity} onChange={(event) => setAllergy((current) => ({ ...current, severity: event.target.value }))} style={{ width: '100%', marginBottom: '10px' }} />
        <Field as="textarea" rows={4} placeholder="Reaction Description..." value={allergy.reactionDescription} onChange={(event) => setAllergy((current) => ({ ...current, reactionDescription: event.target.value }))} style={{ resize: 'vertical', marginBottom: '20px' }} />

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} style={{ padding: '9px 22px', borderRadius: '8px', background: TEAL_FILL, border: 'none', color: TEXT_DARK, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          <button type="button" onClick={handleSave} disabled={!isValid} style={{ padding: '9px 22px', borderRadius: '8px', background: TEXT_DARK, border: 'none', color: '#fff', fontSize: '0.875rem', fontWeight: 600, cursor: isValid ? 'pointer' : 'not-allowed', opacity: isValid ? 1 : 0.65 }}>Save Allergy</button>
        </div>
      </div>
    </div>
  );
}
