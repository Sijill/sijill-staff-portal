import React from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import { TEAL_ICON } from './constants';
import { DateField, Field, Row, Section } from './FormPrimitives';

export default function AppointmentSection({ appointment, setAppointment }) {
  return (
    <Section icon={CalendarDays} title="Appointment Details">
      <Row mb="10px">
        <DateField placeholder="Next Appointment Date" value={appointment.nextAppointmentDate} onChange={(event) => setAppointment((current) => ({ ...current, nextAppointmentDate: event.target.value }))} style={{ flex: '0 0 260px' }} />
      </Row>
      <Field as="textarea" rows={4} placeholder="Appointment Notes..." value={appointment.appointmentNotes} onChange={(event) => setAppointment((current) => ({ ...current, appointmentNotes: event.target.value }))} style={{ marginBottom: '10px', resize: 'vertical' }} />
      <div style={{ position: 'relative', display: 'inline-flex', width: '260px' }}>
        <Field placeholder="Encounter Location..." value={appointment.locationAddress} onChange={(event) => setAppointment((current) => ({ ...current, locationAddress: event.target.value }))} style={{ paddingRight: '38px' }} />
        <MapPin size={15} strokeWidth={1.9} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: TEAL_ICON, pointerEvents: 'none' }} />
      </div>
    </Section>
  );
}
