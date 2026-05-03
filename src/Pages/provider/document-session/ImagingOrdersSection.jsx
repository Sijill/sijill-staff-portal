import React from 'react';
import { ScanLine } from 'lucide-react';
import { BODY_PART_OPTIONS, IMAGING_TYPE_OPTIONS, ORDER_PRIORITY_OPTIONS } from '../../../constants/medicalConstants';
import { AddButton, Field, Panel, RemoveButton, Row, Section, SelectField, Toggle } from './FormPrimitives';
import { createImagingOrder } from './helpers';

export default function ImagingOrdersSection({ imagingOrders, setImagingOrders, updateListItem, removeListItem }) {
  return (
    <Section icon={ScanLine} title="Imaging Orders">
      {imagingOrders.map((order) => (
        <Panel key={order.id}>
          <Row mb="10px">
            <SelectField options={IMAGING_TYPE_OPTIONS} placeholder="Imaging Type" value={order.imagingTypeId} onChange={(event) => updateListItem(setImagingOrders, order.id, { imagingTypeId: event.target.value })} style={{ flex: 1 }} renderLabel={(option) => option.label} />
            <SelectField options={BODY_PART_OPTIONS} placeholder="Body Part" value={order.bodyPartId} onChange={(event) => updateListItem(setImagingOrders, order.id, { bodyPartId: event.target.value })} style={{ flex: 1 }} renderLabel={(option) => option.label} />
            <Toggle checked={order.contrastUsed} onChange={(value) => updateListItem(setImagingOrders, order.id, { contrastUsed: value })} label="Use Contrast" />
            {imagingOrders.length > 1 ? <RemoveButton onClick={() => removeListItem(setImagingOrders, order.id)} label="Remove imaging order" /> : null}
          </Row>
          <Row mb="10px"><SelectField options={ORDER_PRIORITY_OPTIONS} placeholder="Priority" value={order.priority} onChange={(event) => updateListItem(setImagingOrders, order.id, { priority: event.target.value })} style={{ flex: '0 0 180px' }} /></Row>
          <Field as="textarea" rows={4} placeholder="Clinical Indication..." value={order.clinicalIndication} onChange={(event) => updateListItem(setImagingOrders, order.id, { clinicalIndication: event.target.value })} style={{ resize: 'vertical' }} />
        </Panel>
      ))}
      <AddButton label="Add Another Imaging Order" onClick={() => setImagingOrders((current) => [...current, createImagingOrder()])} />
    </Section>
  );
}
