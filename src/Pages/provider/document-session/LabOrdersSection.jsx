import React from 'react';
import { FlaskConical } from 'lucide-react';
import { ORDER_PRIORITY_OPTIONS, SPECIMEN_TYPE_OPTIONS, TEST_TYPE_OPTIONS } from '../../../constants/medicalConstants';
import { AddButton, Field, Panel, RemoveButton, Row, Section, SelectField, Toggle } from './FormPrimitives';
import { createLabOrder } from './helpers';

export default function LabOrdersSection({ labOrders, setLabOrders, updateListItem, removeListItem }) {
  return (
    <Section icon={FlaskConical} title="Laboratory Test Orders">
      {labOrders.map((order) => (
        <Panel key={order.id}>
          <Row mb="10px">
            <SelectField options={TEST_TYPE_OPTIONS} placeholder="Test Type" value={order.testTypeId} onChange={(event) => updateListItem(setLabOrders, order.id, { testTypeId: event.target.value })} style={{ flex: 1 }} renderLabel={(option) => option.label} />
            <SelectField options={SPECIMEN_TYPE_OPTIONS} placeholder="Specimen Type" value={order.specimenTypeId} onChange={(event) => updateListItem(setLabOrders, order.id, { specimenTypeId: event.target.value })} style={{ flex: 1 }} renderLabel={(option) => option.label} />
            <Toggle checked={order.fastingRequired} onChange={(value) => updateListItem(setLabOrders, order.id, { fastingRequired: value })} label="Fasting Required" />
            {labOrders.length > 1 ? <RemoveButton onClick={() => removeListItem(setLabOrders, order.id)} label="Remove lab order" /> : null}
          </Row>
          <Row mb="10px"><SelectField options={ORDER_PRIORITY_OPTIONS} placeholder="Priority" value={order.priority} onChange={(event) => updateListItem(setLabOrders, order.id, { priority: event.target.value })} style={{ flex: '0 0 180px' }} /></Row>
          <Field as="textarea" rows={4} placeholder="Clinical Indication..." value={order.clinicalIndication} onChange={(event) => updateListItem(setLabOrders, order.id, { clinicalIndication: event.target.value })} style={{ resize: 'vertical' }} />
        </Panel>
      ))}
      <AddButton label="Add Another Lab Order" onClick={() => setLabOrders((current) => [...current, createLabOrder()])} />
    </Section>
  );
}
