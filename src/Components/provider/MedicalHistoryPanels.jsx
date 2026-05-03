import React from 'react';
import { CalendarDays, ChevronRight, ClipboardPlus, Hospital, Search } from 'lucide-react';
import { formatDateTime, formatEnumLabel } from '../../constants/medicalConstants';

const cardStyles = {
  historyCard: { background: 'linear-gradient(180deg, #b4e6ee 0%, #f3fcfd 100%)', border: '1px solid rgba(41, 92, 98, 0.08)', boxShadow: '0 12px 24px rgba(38, 92, 99, 0.08)' },
  iconPanel: { width: '42px', height: '42px', background: '#f6ffff', color: '#5f8e93', border: '1px solid rgba(41, 92, 98, 0.12)', boxShadow: '0 8px 18px rgba(38, 92, 99, 0.08)' },
  emptyHalo: { width: '126px', height: '126px', background: 'radial-gradient(circle, rgba(195, 244, 248, 0.9) 0%, rgba(225, 251, 253, 0.45) 42%, rgba(255, 255, 255, 0) 72%)' },
  emptyCircle: { width: '54px', height: '54px', background: '#ffffff', boxShadow: '0 12px 26px rgba(38, 92, 99, 0.14)' },
};

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

export function EncounterDetailPanel({ detail }) {
  if (!detail) {
    return null;
  }

  return (
    <div className="rounded-4 p-4 mb-4" style={{ background: '#ffffff', border: '1px solid rgba(41, 92, 98, 0.08)', boxShadow: '0 12px 24px rgba(38, 92, 99, 0.08)' }}>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
        <div>
          <h3 className="mb-1" style={{ color: '#21353b', fontSize: '1.1rem', fontWeight: 800 }}>Encounter Detail</h3>
          <div style={{ color: '#6d8085', fontSize: '0.82rem', fontWeight: 700 }}>{detail.hcpFullName} - {detail.hcpSpecialization}</div>
        </div>
        <div style={{ color: '#4c6469', fontSize: '0.82rem', fontWeight: 700 }}>{formatDateTime(detail.encounterDate)}</div>
      </div>

      <div className="mb-3" style={{ color: '#244047', fontSize: '0.88rem', fontWeight: 700 }}>{detail.locationAddress || 'Location not provided'}</div>

      <div className="row g-3">
        <DetailColumn title="Symptoms" items={detail.symptoms} emptyLabel="No symptoms recorded." renderItem={(item) => <><div style={{ fontWeight: 700, color: '#2b444a' }}>{item.title}</div><div style={{ color: '#61767b', fontSize: '0.84rem' }}>{item.description || 'No description provided'}</div></>} itemKey="symptomId" />
        <DetailColumn title="Diagnoses" items={detail.diagnoses} emptyLabel="No diagnoses recorded." renderItem={(item) => <><div style={{ fontWeight: 700, color: '#2b444a' }}>{item.icd11Title} ({item.icd11Code})</div><div style={{ color: '#61767b', fontSize: '0.84rem' }}>{item.clinicalDescription || 'No clinical description provided'}</div><div style={{ color: '#587177', fontSize: '0.78rem', fontWeight: 700 }}>{item.isChronic ? 'Chronic condition' : formatEnumLabel(item.status)}</div></>} itemKey="diagnosisId" />
        <div className="col-12">
          <div className="rounded-4 p-3" style={{ background: '#f6fcfd' }}>
            <div className="mb-2" style={{ color: '#1f3940', fontWeight: 800 }}>Orders</div>
            {detail.orders?.length ? detail.orders.map((item) => <div key={item.orderId} className="mb-2" style={{ color: '#2b444a', fontSize: '0.86rem' }}><strong>{formatEnumLabel(item.orderType)}</strong> - {formatEnumLabel(item.orderStatus)}</div>) : <div style={{ color: '#61767b', fontSize: '0.84rem' }}>No orders recorded.</div>}
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
            ICD-11 - {entry.primaryDiagnosis?.icd11Code || 'N/A'} - {entry.primaryDiagnosis?.icd11Title || 'No diagnosis title'}
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
      <Icon size={12} strokeWidth={2.2} />
      <span>{value}</span>
    </div>
  );
}
