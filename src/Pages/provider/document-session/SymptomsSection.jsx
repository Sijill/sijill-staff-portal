import React from 'react';
import { Stethoscope } from 'lucide-react';
import { AddButton, Field, Panel, RemoveButton, Row, Section } from './FormPrimitives';
import { createSymptom } from './helpers';

export default function SymptomsSection({ symptoms, setSymptoms, updateListItem, removeListItem }) {
  return (
    <Section icon={Stethoscope} title="Symptoms & Complaints">
      {symptoms.map((symptom) => (
        <Panel key={symptom.id}>
          <Row mb="10px">
            <div style={{ flex: 1 }}><Field placeholder="Symptom title..." value={symptom.title} onChange={(event) => updateListItem(setSymptoms, symptom.id, { title: event.target.value })} /></div>
            {symptoms.length > 1 ? <RemoveButton onClick={() => removeListItem(setSymptoms, symptom.id)} label={`Remove symptom ${symptom.title || ''}`} /> : null}
          </Row>
          <Field as="textarea" rows={4} placeholder="Description..." value={symptom.description} onChange={(event) => updateListItem(setSymptoms, symptom.id, { description: event.target.value })} style={{ resize: 'vertical' }} />
        </Panel>
      ))}
      <AddButton label="Add Another Symptom/Complaint" onClick={() => setSymptoms((current) => [...current, createSymptom()])} />
    </Section>
  );
}
