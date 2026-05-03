import { useState } from 'react';
import { createDiagnosis, createImagingOrder, createLabOrder, createMedication, createSymptom } from './helpers';

export default function useEncounterForm() {
  const [symptoms, setSymptoms] = useState([createSymptom()]);
  const [diagnoses, setDiagnoses] = useState([createDiagnosis()]);
  const [medications, setMedications] = useState([createMedication()]);
  const [imagingOrders, setImagingOrders] = useState([createImagingOrder()]);
  const [labOrders, setLabOrders] = useState([createLabOrder()]);
  const [allergies, setAllergies] = useState([]);
  const [appointment, setAppointment] = useState({ nextAppointmentDate: '', appointmentNotes: '', locationAddress: '' });

  const updateListItem = (setter, id, patch) => {
    setter((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const removeListItem = (setter, id) => {
    setter((current) => (current.length === 1 ? current : current.filter((item) => item.id !== id)));
  };

  return {
    symptoms,
    diagnoses,
    medications,
    imagingOrders,
    labOrders,
    allergies,
    appointment,
    setSymptoms,
    setDiagnoses,
    setMedications,
    setImagingOrders,
    setLabOrders,
    setAllergies,
    setAppointment,
    updateListItem,
    removeListItem,
  };
}
