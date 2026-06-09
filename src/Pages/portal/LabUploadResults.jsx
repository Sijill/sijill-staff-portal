import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, LoaderCircle, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MultiFileUpload from '../../Components/portal/MultiFileUpload';
import ProviderLoadingToast from '../../Components/provider/ProviderLoadingToast';
import ProviderSessionLayout from '../../Components/provider/ProviderSessionLayout';
import ProviderStatusMessage from '../../Components/provider/ProviderStatusMessage';
import {
  AddButton,
  Field,
  Panel,
  RemoveButton,
  Row,
  Section,
} from '../provider/document-session/FormPrimitives';
import usePortalSession, { getPortalSessionToken } from './usePortalSession';

const createResultRow = () => ({ id: crypto.randomUUID(), key: '', value: '' });

function buildResultData(rows) {
  return rows.reduce((accumulator, row) => {
    const key = row.key.trim();
    const value = row.value.trim();
    if (key && value) {
      accumulator[key] = value;
    }
    return accumulator;
  }, {});
}

export default function LabUploadResults({ config }) {
  const navigate = useNavigate();
  const { portalSession, patient } = usePortalSession(config);
  const [resultRows, setResultRows] = useState([createResultRow()]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateRow = (id, field, value) => {
    setResultRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
    setFieldError('');
  };

  const removeRow = (id) => {
    setResultRows((current) => (current.length > 1 ? current.filter((row) => row.id !== id) : current));
  };

  const handleSubmit = async () => {
    const resultData = buildResultData(resultRows);

    if (!Object.keys(resultData).length) {
      setFieldError('Add at least one result field with a name and value.');
      return;
    }

    if (!files.length) {
      setFieldError('Upload at least one result file.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    setFieldError('');

    try {
      const formData = new FormData();
      formData.append('resultData', JSON.stringify(resultData));

      if (additionalNotes.trim()) {
        formData.append('additionalNotes', additionalNotes.trim());
      }

      files.forEach((file) => {
        formData.append('labResult', file);
      });

      await config.submitResult(
        portalSession.sessionId,
        formData,
        getPortalSessionToken(portalSession)
      );

      navigate(config.successPath, {
        state: {
          portalSession,
          recordedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      setErrorMessage(error.message || 'Unable to submit lab results.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ProviderSessionLayout patient={patient} onBack={() => navigate(config.orderViewPath, { state: { portalSession } })}>
        <Section icon={UploadCloud} title="Upload Lab Results">
          <ProviderStatusMessage icon={AlertCircle} message={errorMessage} tone="danger" />
          <ProviderStatusMessage icon={CheckCircle2} message={successMessage} tone="success" />
          <ProviderStatusMessage icon={AlertCircle} message={fieldError} tone="danger" />

          {resultRows.map((row) => (
            <Panel key={row.id}>
              <Row>
                <Field
                  placeholder="Result name (e.g. Haemoglobin)"
                  value={row.key}
                  onChange={(event) => updateRow(row.id, 'key', event.target.value)}
                  style={{ flex: 1, minWidth: '220px' }}
                />
                <Field
                  placeholder="Value (e.g. 13.5 g/dL)"
                  value={row.value}
                  onChange={(event) => updateRow(row.id, 'value', event.target.value)}
                  style={{ flex: 1, minWidth: '220px' }}
                />
                <RemoveButton onClick={() => removeRow(row.id)} />
              </Row>
            </Panel>
          ))}

          <AddButton label="Add result field" onClick={() => setResultRows((current) => [...current, createResultRow()])} />

          <div className="mt-4">
            <label className="d-block mb-2 fw-semibold text-secondary">Additional Notes</label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Optional notes about the results"
              value={additionalNotes}
              onChange={(event) => setAdditionalNotes(event.target.value)}
            />
          </div>

          <MultiFileUpload
            label="Result Files"
            accept="image/png,image/jpeg,application/pdf"
            files={files}
            onChange={setFiles}
            helperText="Upload at least one PDF or image file (required)."
          />

          <div className="d-flex justify-content-end pt-3">
            <button
              type="button"
              className="provider-session-start-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoaderCircle size={18} /> : <UploadCloud size={18} />}
              <span>{isSubmitting ? 'Submitting Results...' : 'Submit Results'}</span>
            </button>
          </div>
        </Section>
      </ProviderSessionLayout>

      <ProviderLoadingToast message="Submitting lab results..." show={isSubmitting} />
    </>
  );
}
