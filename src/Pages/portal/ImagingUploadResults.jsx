import React, { useState } from 'react';
import { AlertCircle, LoaderCircle, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MultiFileUpload from '../../Components/portal/MultiFileUpload';
import ProviderLoadingToast from '../../Components/provider/ProviderLoadingToast';
import ProviderSessionLayout from '../../Components/provider/ProviderSessionLayout';
import ProviderStatusMessage from '../../Components/provider/ProviderStatusMessage';
import { Field, Section } from '../provider/document-session/FormPrimitives';
import usePortalSession, { getPortalSessionToken } from './usePortalSession';

export default function ImagingUploadResults({ config }) {
  const navigate = useNavigate();
  const { portalSession, patient } = usePortalSession(config);
  const [studyDescription, setStudyDescription] = useState('');
  const [findings, setFindings] = useState('');
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!files.length) {
      setFieldError('Upload at least one result file.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setFieldError('');

    try {
      const formData = new FormData();

      if (studyDescription.trim()) {
        formData.append('studyDescription', studyDescription.trim());
      }

      if (findings.trim()) {
        formData.append('findings', findings.trim());
      }

      files.forEach((file) => {
        formData.append('imagingResult', file);
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
      setErrorMessage(error.message || 'Unable to submit imaging results.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ProviderSessionLayout patient={patient} onBack={() => navigate(config.orderViewPath, { state: { portalSession } })}>
        <Section icon={UploadCloud} title="Upload Imaging Results">
          <ProviderStatusMessage icon={AlertCircle} message={errorMessage} tone="danger" />
          <ProviderStatusMessage icon={AlertCircle} message={fieldError} tone="danger" />

          <div className="mb-4">
            <label className="d-block mb-2 fw-semibold text-secondary">Study Description</label>
            <Field
              placeholder="Brief description of the imaging study"
              value={studyDescription}
              onChange={(event) => setStudyDescription(event.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div className="mb-4">
            <label className="d-block mb-2 fw-semibold text-secondary">Findings</label>
            <textarea
              className="form-control"
              rows={5}
              placeholder="Describe the imaging findings"
              value={findings}
              onChange={(event) => setFindings(event.target.value)}
            />
          </div>

          <MultiFileUpload
            label="Result Files"
            accept=".dcm,application/dicom,application/dicom+json,image/png,image/jpeg,application/pdf"
            files={files}
            onChange={setFiles}
            helperText="Upload at least one DICOM, PDF, or image file (required, max 50 MB each)."
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

      <ProviderLoadingToast message="Submitting imaging results..." show={isSubmitting} />
    </>
  );
}
