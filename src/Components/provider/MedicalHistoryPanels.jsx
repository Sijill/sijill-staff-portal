import React, { useState, useEffect } from 'react';
import { CalendarDays, CalendarClock, ChevronRight, ClipboardPlus, FileText, Download, Hospital, Pill, Search, Image, LoaderCircle } from 'lucide-react';
import { formatDateTime, formatEnumLabel, formatDate } from '../../constants/medicalConstants';
import api from '../../api/httpClient';
import { normalizeClinicalDocumentUrl } from '../../api/clinicalApi';

const cardStyles = {
  historyCard: { background: 'linear-gradient(180deg, #b4e6ee 0%, #f3fcfd 100%)', border: '1px solid rgba(41, 92, 98, 0.08)', boxShadow: '0 12px 24px rgba(38, 92, 99, 0.08)' },
  iconPanel: { width: '42px', height: '42px', background: '#f6ffff', color: '#5f8e93', border: '1px solid rgba(41, 92, 98, 0.12)', boxShadow: '0 8px 18px rgba(38, 92, 99, 0.08)' },
  emptyHalo: { width: '126px', height: '126px', background: 'radial-gradient(circle, rgba(195, 244, 248, 0.9) 0%, rgba(225, 251, 253, 0.45) 42%, rgba(255, 255, 255, 0) 72%)' },
  emptyCircle: { width: '54px', height: '54px', background: '#ffffff', boxShadow: '0 12px 26px rgba(38, 92, 99, 0.14)' },
};

function formatFileSize(bytes) {
  if (!bytes) return null;
  const num = Number(bytes);
  if (isNaN(num)) return null;
  if (num < 1024) return `${num} B`;
  if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
  return `${(num / (1024 * 1024)).toFixed(1)} MB`;
}

const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'image/gif'];
const PDF_MIME_TYPE = 'application/pdf';

function InlineDocumentViewer({ doc, clinicalSessionToken }) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isImage = IMAGE_MIME_TYPES.includes(doc.mimeType);
  const isPdf = doc.mimeType === PDF_MIME_TYPE;
  const documentUrl = normalizeClinicalDocumentUrl(doc.url);

  useEffect(() => {
    let cancelled = false;
    let activeBlobUrl = null;

    async function fetchDocument() {
      try {
        if (!documentUrl) {
          throw new Error('Missing document url');
        }

        const response = await api.get(documentUrl, {
          headers: { Authorization: `Bearer ${clinicalSessionToken}` },
          responseType: 'blob',
        });
        if (cancelled) return;
        activeBlobUrl = URL.createObjectURL(response);
        setBlobUrl(activeBlobUrl);
      } catch {
        if (!cancelled) setError('Failed to load document');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDocument();

    return () => {
      cancelled = true;
      if (activeBlobUrl) URL.revokeObjectURL(activeBlobUrl);
    };
  }, [clinicalSessionToken, documentUrl]);

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2 py-2" style={{ color: '#6d8085', fontSize: '0.82rem' }}>
        <LoaderCircle size={14} className="spinner-border spinner-border-sm" />
        Loading document...
      </div>
    );
  }

  if (error || !blobUrl) {
    return (
      <div className="d-flex align-items-center gap-2 py-2" style={{ color: '#b34a4a', fontSize: '0.82rem' }}>
        <span>{error || 'Unavailable'}</span>
      </div>
    );
  }

  if (isImage) {
    return (
      <div className="mb-2">
        <div style={{ fontWeight: 600, color: '#1f3940', fontSize: '0.8rem', marginBottom: '4px' }}>{doc.fileName}</div>
        <a href={blobUrl} download={doc.fileName} target="_blank" rel="noopener noreferrer">
          <img
            src={blobUrl}
            alt={doc.fileName}
            className="rounded-3 w-100"
            style={{ maxHeight: '300px', objectFit: 'contain', background: '#f0f4f5', cursor: 'pointer' }}
          />
        </a>
        <div style={{ color: '#6d8085', fontSize: '0.72rem', fontWeight: 500, marginTop: '2px' }}>
          {doc.mimeType?.split('/')[1]?.toUpperCase() || ''} {formatFileSize(doc.fileSizeBytes) ? `· ${formatFileSize(doc.fileSizeBytes)}` : ''} · Click to download
        </div>
      </div>
    );
  }

  if (isPdf) {
    return (
      <div className="mb-2">
        <div style={{ fontWeight: 600, color: '#1f3940', fontSize: '0.8rem', marginBottom: '4px' }}>{doc.fileName}</div>
        <iframe
          src={blobUrl}
          title={doc.fileName}
          className="rounded-3 w-100"
          style={{ height: '400px', border: '1px solid rgba(41, 92, 98, 0.12)' }}
        />
        <div style={{ color: '#6d8085', fontSize: '0.72rem', fontWeight: 500, marginTop: '2px' }}>
          PDF {formatFileSize(doc.fileSizeBytes) ? `· ${formatFileSize(doc.fileSizeBytes)}` : ''}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-2">
      <div className="d-inline-flex align-items-center gap-2 rounded-3 px-3 py-2" style={{ background: '#ffffff', border: '1px solid rgba(41, 92, 98, 0.12)', color: '#1f3940', fontSize: '0.82rem', fontWeight: 600 }}>
        <FileText size={14} strokeWidth={2} />
        <span className="text-truncate" style={{ maxWidth: '160px' }}>{doc.fileName}</span>
        <span style={{ color: '#6d8085', fontSize: '0.72rem', fontWeight: 500 }}>
          {doc.mimeType?.split('/')[1]?.toUpperCase() || ''} {formatFileSize(doc.fileSizeBytes) ? `· ${formatFileSize(doc.fileSizeBytes)}` : ''}
        </span>
        <a href={blobUrl} download={doc.fileName} style={{ display: 'inline-flex', color: '#295c62' }}>
          <Download size={13} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}

export function MedicalHistoryEmptyState() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5" style={{ minHeight: '340px' }}>
      <div className="d-flex align-items-center justify-content-center rounded-circle mb-4" style={cardStyles.emptyHalo}>
        <div className="d-inline-flex align-items-center justify-content-center rounded-circle position-relative" style={cardStyles.emptyCircle}>
          <Search size={26} strokeWidth={2.1} color="#1e2d33" />
          <span className="position-absolute" style={{ bottom: '10px', left: '50%', transform: 'translateX(-50%)', width: '18px', height: '4px', borderRadius: '999px', background: '#6feff5' }} />
        </div>
      </div>
      <div style={{ color: '#1f2c32', fontSize: '0.85rem', fontWeight: 700 }}>Patient has no recorded medical history</div>
    </div>
  );
}

function LabResultView({ result, sessionId, clinicalSessionToken }) {
  if (!result) return <div style={{ color: '#61767b', fontSize: '0.84rem' }}>No results yet.</div>;

  const structuredResults = Array.isArray(result.resultData?.results) ? result.resultData.results : [];

  return (
    <div>
      {(result.resultData || structuredResults.length > 0) && (
        <div className="mb-2">
          <div className="d-flex flex-wrap gap-2 mb-2">
            {result.resultData?.testType ? <DataChip label="Test" value={formatEnumLabel(result.resultData.testType)} /> : null}
            {result.resultData?.specimenType ? <DataChip label="Specimen" value={formatEnumLabel(result.resultData.specimenType)} /> : null}
            {result.resultData?.clinicalIndication ? <DataChip label="Indication" value={result.resultData.clinicalIndication} /> : null}
            {result.resultData?.overallImpression ? <DataChip label="Impression" value={result.resultData.overallImpression} /> : null}
          </div>

          {structuredResults.length > 0 ? (
            <div className="mb-2 rounded-3 overflow-hidden" style={{ border: '1px solid rgba(41, 92, 98, 0.12)' }}>
              {structuredResults.map((item, index) => (
                <div
                  key={`${item.name || 'result'}-${index}`}
                  className="d-flex flex-wrap justify-content-between gap-2 px-3 py-2"
                  style={{ background: index % 2 === 0 ? '#f7fcfd' : '#eef7f9', borderBottom: index === structuredResults.length - 1 ? 'none' : '1px solid rgba(41, 92, 98, 0.08)' }}
                >
                  <div style={{ fontWeight: 700, color: '#244047', fontSize: '0.82rem' }}>{item.name || 'Result'}</div>
                  <div style={{ color: '#3a555b', fontSize: '0.82rem', fontWeight: 600 }}>
                    <span>{item.value ?? 'N/A'}</span>
                    {item.unit ? <span>{` ${item.unit}`}</span> : null}
                    {item.referenceRange ? <span style={{ color: '#6d8085' }}>{` · Ref: ${item.referenceRange}`}</span> : null}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {typeof result.resultData === 'object' && !structuredResults.length && !result.resultData?.testType ? (
            <div className="mb-2 rounded-3 overflow-hidden" style={{ border: '1px solid rgba(41, 92, 98, 0.12)' }}>
              {Object.entries(result.resultData).map(([key, value], index) => (
                <div
                  key={key}
                  className="d-flex flex-wrap justify-content-between gap-2 px-3 py-2"
                  style={{ background: index % 2 === 0 ? '#f7fcfd' : '#eef7f9', borderBottom: index === Object.entries(result.resultData).length - 1 ? 'none' : '1px solid rgba(41, 92, 98, 0.08)' }}
                >
                  <div style={{ fontWeight: 700, color: '#244047', fontSize: '0.82rem' }}>{key}</div>
                  <div style={{ color: '#3a555b', fontSize: '0.82rem', fontWeight: 600 }}>{value ?? 'N/A'}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
      {result.additionalNotes && (
        <div className="mb-2" style={{ color: '#3a555b', fontSize: '0.84rem' }}>
          <span style={{ fontWeight: 700 }}>Notes:</span> {result.additionalNotes}
        </div>
      )}
      {result.uploadedAt && (
        <div style={{ color: '#6d8085', fontSize: '0.78rem', fontWeight: 600 }}>Uploaded: {formatDateTime(result.uploadedAt)}</div>
      )}
      {result.documents?.length > 0 && (
        <div className="mt-2">
          <div style={{ fontWeight: 700, color: '#2b444a', fontSize: '0.84rem', marginBottom: '4px' }}>Documents</div>
          {result.documents.map((doc) => (
            <InlineDocumentViewer key={doc.documentId} doc={doc} sessionId={sessionId} clinicalSessionToken={clinicalSessionToken} />
          ))}
        </div>
      )}
    </div>
  );
}

function ImagingResultView({ result, sessionId, clinicalSessionToken }) {
  if (!result) return <div style={{ color: '#61767b', fontSize: '0.84rem' }}>No results yet.</div>;

  return (
    <div>
      {result.studyDescription && (
        <div className="mb-2" style={{ color: '#3a555b', fontSize: '0.84rem' }}>
          <span style={{ fontWeight: 700 }}>Study:</span> {result.studyDescription}
        </div>
      )}
      {result.findings && (
        <div className="mb-2">
          <div style={{ fontWeight: 700, color: '#2b444a', fontSize: '0.84rem', marginBottom: '4px' }}>Findings</div>
          <div style={{ fontSize: '0.82rem', color: '#3a555b', background: '#edf7f9', padding: '8px', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>{result.findings}</div>
        </div>
      )}
      {result.uploadedAt && (
        <div style={{ color: '#6d8085', fontSize: '0.78rem', fontWeight: 600 }}>Uploaded: {formatDateTime(result.uploadedAt)}</div>
      )}
      {result.documents?.length > 0 && (
        <div className="mt-2">
          <div style={{ fontWeight: 700, color: '#2b444a', fontSize: '0.84rem', marginBottom: '4px' }}>Images</div>
          {result.documents.map((doc) => (
            <InlineDocumentViewer key={doc.documentId} doc={doc} sessionId={sessionId} clinicalSessionToken={clinicalSessionToken} />
          ))}
        </div>
      )}
    </div>
  );
}

function DataChip({ label, value }) {
  return (
    <div className="rounded-pill px-2 py-1" style={{ background: '#edf7f9', color: '#244047', fontSize: '0.72rem', fontWeight: 700 }}>
      <span style={{ color: '#6d8085' }}>{label}:</span> {value}
    </div>
  );
}

function LabOrderCard({ order, sessionId, clinicalSessionToken }) {
  if (!order.labOrder) return null;
  const lo = order.labOrder;

  return (
    <div className="rounded-4 p-3 mb-2" style={{ background: '#edf7f9' }}>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
        <div style={{ fontWeight: 800, color: '#1f3940', fontSize: '0.9rem' }}>{lo.testType}</div>
        <span className="badge rounded-pill" style={{ background: order.orderStatus === 'COMPLETED' ? '#1a7a5a' : order.orderStatus === 'IN_PROGRESS' ? '#8a6d3b' : '#5f8e93', fontSize: '0.7rem', fontWeight: 700 }}>{formatEnumLabel(order.orderStatus)}</span>
      </div>
      <div style={{ color: '#3a555b', fontSize: '0.8rem' }}>
        {lo.specimenType && <span className="me-3"><strong>Specimen:</strong> {lo.specimenType}</span>}
        <span className="me-3"><strong>Priority:</strong> {formatEnumLabel(lo.priority)}</span>
        {lo.fastingRequired && <span className="me-3"><strong>Fasting required</strong></span>}
      </div>
      {lo.clinicalIndication && <div style={{ color: '#3a555b', fontSize: '0.8rem', marginTop: '4px' }}><strong>Indication:</strong> {lo.clinicalIndication}</div>}
      {lo.result && (
        <div className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(41, 92, 98, 0.1)' }}>
          <LabResultView result={lo.result} sessionId={sessionId} clinicalSessionToken={clinicalSessionToken} />
        </div>
      )}
    </div>
  );
}

function ImagingOrderCard({ order, sessionId, clinicalSessionToken }) {
  if (!order.imagingOrder) return null;
  const io = order.imagingOrder;

  return (
    <div className="rounded-4 p-3 mb-2" style={{ background: '#edf7f9' }}>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
        <div style={{ fontWeight: 800, color: '#1f3940', fontSize: '0.9rem' }}>{io.imagingType} — {io.bodyPart}</div>
        <span className="badge rounded-pill" style={{ background: order.orderStatus === 'COMPLETED' ? '#1a7a5a' : order.orderStatus === 'IN_PROGRESS' ? '#8a6d3b' : '#5f8e93', fontSize: '0.7rem', fontWeight: 700 }}>{formatEnumLabel(order.orderStatus)}</span>
      </div>
      <div style={{ color: '#3a555b', fontSize: '0.8rem' }}>
        <span className="me-3"><strong>Priority:</strong> {formatEnumLabel(io.priority)}</span>
        {io.contrastUsed && <span className="me-3"><strong>Contrast used</strong></span>}
      </div>
      {io.clinicalIndication && <div style={{ color: '#3a555b', fontSize: '0.8rem', marginTop: '4px' }}><strong>Indication:</strong> {io.clinicalIndication}</div>}
      {io.result && (
        <div className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(41, 92, 98, 0.1)' }}>
          <ImagingResultView result={io.result} sessionId={sessionId} clinicalSessionToken={clinicalSessionToken} />
        </div>
      )}
    </div>
  );
}

export function EncounterDetailPanel({ detail, sessionId, clinicalSessionToken }) {
  if (!detail) return null;

  return (
    <div className="rounded-4 p-4 mb-4" style={{ background: '#ffffff', border: '1px solid rgba(41, 92, 98, 0.08)', boxShadow: '0 12px 24px rgba(38, 92, 99, 0.08)' }}>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
        <div>
          <h3 className="mb-1" style={{ color: '#21353b', fontSize: '1.1rem', fontWeight: 800 }}>Encounter Detail</h3>
          <div style={{ color: '#6d8085', fontSize: '0.82rem', fontWeight: 700 }}>{detail.hcpFullName} — {detail.hcpSpecialization}</div>
        </div>
        <div style={{ color: '#4c6469', fontSize: '0.82rem', fontWeight: 700 }}>{formatDateTime(detail.encounterDate)}</div>
      </div>

      <div className="mb-3" style={{ color: '#244047', fontSize: '0.88rem', fontWeight: 700 }}>{detail.locationAddress || 'Location not provided'}</div>

      <div className="row g-3">
        <DetailColumn title="Symptoms" items={detail.symptoms} emptyLabel="No symptoms recorded." renderItem={(item) => <><div style={{ fontWeight: 700, color: '#2b444a' }}>{item.title}</div><div style={{ color: '#61767b', fontSize: '0.84rem' }}>{item.description || 'No description provided'}</div></>} itemKey="symptomId" />

        <DetailColumn title="Diagnoses" items={detail.diagnoses} emptyLabel="No diagnoses recorded." renderItem={(item) => <><div style={{ fontWeight: 700, color: '#2b444a' }}>{item.icd11Title} ({item.icd11Code})</div><div style={{ color: '#61767b', fontSize: '0.84rem' }}>{item.clinicalDescription || 'No clinical description provided'}</div><div style={{ color: '#587177', fontSize: '0.78rem', fontWeight: 700 }}>{item.isChronic ? 'Chronic condition' : formatEnumLabel(item.status)}</div></>} itemKey="diagnosisId" />

        {detail.medications?.length > 0 && (
          <DetailColumn title={`Medications (${detail.medications.length})`} items={detail.medications} emptyLabel="No medications prescribed." renderItem={(item) => (
            <div className="d-flex align-items-start gap-2">
              <Pill size={14} strokeWidth={2.2} color="#295c62" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, color: '#2b444a' }}>{item.medicationName}</div>
                <div style={{ color: '#61767b', fontSize: '0.82rem' }}>
                  {(item.dosageAmount != null) && <span>{item.dosageAmount} {formatEnumLabel(item.dosageUnit)} — </span>}
                  {formatEnumLabel(item.form)} — {item.frequency}
                </div>
                <div style={{ color: '#6d8085', fontSize: '0.76rem' }}>
                  {formatDate(item.startDate)}{item.endDate ? ` — ${formatDate(item.endDate)}` : ''}
                  {item.prescribedBy ? ` · by ${item.prescribedBy}` : ''}
                </div>
              </div>
            </div>
          )} itemKey="medicationId" />
        )}

        {detail.nextAppointmentDate && (
          <div className="col-12">
            <div className="rounded-4 p-3" style={{ background: '#f6fcfd', border: '1px solid rgba(41, 92, 98, 0.08)' }}>
              <div className="d-flex align-items-center gap-2 mb-1">
                <CalendarClock size={16} strokeWidth={2.2} color="#295c62" />
                <span style={{ color: '#1f3940', fontWeight: 800 }}>Next Appointment</span>
              </div>
              <div style={{ color: '#2b444a', fontWeight: 600 }}>{formatDateTime(detail.nextAppointmentDate)}</div>
              {detail.appointmentNotes && <div style={{ color: '#61767b', fontSize: '0.84rem' }}>{detail.appointmentNotes}</div>}
            </div>
          </div>
        )}

        <div className="col-12">
          <div className="rounded-4 p-3" style={{ background: '#f6fcfd' }}>
            <div className="mb-2" style={{ color: '#1f3940', fontWeight: 800 }}>
              Orders {detail.orders?.length ? `(${detail.orders.length})` : ''}
            </div>
            {detail.orders?.length ? (
              detail.orders.map((item) => (
                item.orderType === 'LABORATORY'
                  ? <LabOrderCard key={item.orderId} order={item} sessionId={sessionId} clinicalSessionToken={clinicalSessionToken} />
                  : <ImagingOrderCard key={item.orderId} order={item} sessionId={sessionId} clinicalSessionToken={clinicalSessionToken} />
              ))
            ) : (
              <div style={{ color: '#61767b', fontSize: '0.84rem' }}>No orders recorded.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HistoryCard({ entry, onOpen, isActive }) {
  return (
    <button type="button" className="rounded-3 p-3 mb-3 w-100 text-start border-0" style={{ ...cardStyles.historyCard, outline: isActive ? '2px solid rgba(42, 157, 168, 0.35)' : 'none' }} onClick={() => onOpen(entry)}>
      <div className="d-flex align-items-start justify-content-between gap-3">
        <div className="flex-grow-1">
          <div style={{ color: '#24333a', fontSize: '0.98rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{entry.hcpFullName} ({entry.hcpSpecialization})</div>
          <div className="d-flex flex-wrap align-items-center gap-3 mt-2 mb-3">
            <MetaChip icon={CalendarDays} value={formatDateTime(entry.encounterDate)} />
            <MetaChip icon={Hospital} value={entry.locationAddress || 'Location not provided'} />
          </div>
          <div style={{ color: '#27353b', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '-0.01em' }}>
            ICD-11 — {entry.primaryDiagnosis?.icd11Code || 'N/A'} — {entry.primaryDiagnosis?.icd11Title || 'No diagnosis title'}
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={cardStyles.iconPanel} aria-hidden="true">
            <ClipboardPlus size={19} strokeWidth={1.9} />
          </div>
          <ChevronRight size={18} color="#5f8e93" />
        </div>
      </div>
    </button>
  );
}

function DetailColumn({ title, items, emptyLabel, renderItem, itemKey }) {
  return (
    <div className="col-12 col-lg-6">
      <div className="rounded-4 h-100 p-3" style={{ background: '#f6fcfd' }}>
        <div className="mb-2" style={{ color: '#1f3940', fontWeight: 800 }}>{title}</div>
        {items?.length ? items.map((item) => <div key={item[itemKey]} className="mb-2">{renderItem(item)}</div>) : <div style={{ color: '#61767b', fontSize: '0.84rem' }}>{emptyLabel}</div>}
      </div>
    </div>
  );
}

function MetaChip({ icon: Icon, value }) {
  return (
    <div className="d-inline-flex align-items-center gap-2" style={{ color: '#7b8c92', fontSize: '0.72rem', fontWeight: 700 }}>
      {React.createElement(Icon, { size: 12, strokeWidth: 2.2 })}
      <span>{value}</span>
    </div>
  );
}
