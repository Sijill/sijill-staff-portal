import React from 'react';
import { ChevronRight, UserRound } from 'lucide-react';
import { formatDateTime, formatEnumLabel, formatPatientMeta } from '../../constants/medicalConstants';

export default function RecentClinicalSessions({ sessions, onOpen }) {
  return (
    <section className="provider-session-encounters">
      <div className="provider-session-encounters__header">
        <h2>Recent Sessions</h2>
      </div>

      <div className="provider-session-encounters__list">
        {sessions.length ? (
          sessions.map((session) => (
            <button
              key={session.sessionId}
              className="provider-session-encounter-card"
              type="button"
              onClick={() => onOpen(session)}
              aria-label={`Open clinical session for ${session.patient?.fullName || 'patient'}`}
            >
              <div className="provider-session-encounter-card__patient">
                <div className="provider-session-encounter-card__icon" aria-hidden="true">
                  <UserRound size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h3>{session.patient?.fullName || 'Unknown Patient'}</h3>
                  <p>{formatPatientMeta(session.patient)}</p>
                </div>
              </div>

              <SessionMeta label="Started" value={formatDateTime(session.startedAt)} />
              <SessionMeta label="Access" value={formatEnumLabel(session.accessType)} />

              <span className="provider-session-encounter-card__action" aria-hidden="true">
                <ChevronRight size={26} strokeWidth={1.9} />
              </span>
            </button>
          ))
        ) : (
          <div
            className="rounded-4 px-4 py-5 text-center"
            style={{
              background: 'linear-gradient(180deg, rgba(234, 251, 253, 0.9) 0%, #ffffff 100%)',
              border: '1px solid rgba(41, 92, 98, 0.08)',
              color: '#587177',
              fontWeight: 600,
            }}
          >
            Start a session with a valid 6-digit patient token to see recent session shortcuts here.
          </div>
        )}
      </div>
    </section>
  );
}

function SessionMeta({ label, value }) {
  return (
    <div className="provider-session-encounter-card__meta">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
