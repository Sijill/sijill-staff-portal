import React from 'react';
import { Calendar, ChevronDown, Trash2 } from 'lucide-react';
import { BORDER_SECTION, TEAL_FILL, TEAL_ICON, TEAL_PLACEHOLDER, TEXT_DARK, TOGGLE_OFF_KNOB, TOGGLE_ON_BG, fieldStyle } from './constants';

export const Field = ({ as: Tag = 'input', style, ...props }) => <Tag style={{ ...fieldStyle, ...style }} {...props} />;

export function SelectField({ options = [], placeholder, style, value, onChange, renderLabel = defaultLabel, ...props }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', ...style }}>
      <select value={value} onChange={onChange} style={{ ...fieldStyle, appearance: 'none', WebkitAppearance: 'none', paddingRight: '34px', cursor: 'pointer', width: '100%' }} {...props}>
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : String(option.id);
          return <option key={optionValue} value={optionValue}>{renderLabel(option)}</option>;
        })}
      </select>
      <ChevronDown size={14} strokeWidth={2.2} style={{ position: 'absolute', right: '10px', pointerEvents: 'none', color: TEAL_ICON }} />
    </div>
  );
}

export function DateField({ placeholder, value, onChange, style }) {
  return (
    <div style={{ position: 'relative', ...style }}>
      {!value ? <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.875rem', color: TEAL_PLACEHOLDER, pointerEvents: 'none', zIndex: 1 }}>{placeholder}</span> : null}
      <input type="date" value={value} onChange={onChange} style={{ ...fieldStyle, colorScheme: 'light', paddingRight: '38px', color: value ? TEXT_DARK : 'transparent', width: '100%' }} />
      <Calendar size={15} strokeWidth={1.9} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: TEAL_ICON, pointerEvents: 'none' }} />
    </div>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: TEAL_FILL, borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', userSelect: 'none', flex: 1, border: 'none' }}>
      <span style={{ fontSize: '0.875rem', color: TEAL_PLACEHOLDER, flex: 1, textAlign: 'left' }}>{label}</span>
      <div style={{ width: '38px', height: '22px', borderRadius: '999px', background: checked ? TOGGLE_ON_BG : TEAL_FILL, border: `1.5px solid ${checked ? TOGGLE_ON_BG : TOGGLE_OFF_KNOB}`, position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: '2px', left: checked ? '16px' : '2px', width: '16px', height: '16px', borderRadius: '50%', background: checked ? '#fff' : TOGGLE_OFF_KNOB, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
      </div>
    </button>
  );
}

export const AddButton = ({ label, onClick }) => <button type="button" onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0', marginTop: '4px' }}><div style={{ width: '30px', height: '30px', borderRadius: '6px', border: `2px solid ${TEAL_ICON}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke={TEAL_ICON} strokeWidth="2.2" strokeLinecap="round" /></svg></div><span style={{ fontSize: '0.875rem', color: TEXT_DARK, fontWeight: 500 }}>{label}</span></button>;

export const RemoveButton = ({ onClick, label = 'Remove item' }) => <button type="button" onClick={onClick} aria-label={label} style={{ width: '38px', height: '38px', borderRadius: '8px', border: 'none', background: '#eef8f9', color: '#50777d', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><Trash2 size={16} strokeWidth={2} /></button>;

export const Section = ({ icon: Icon, title, children }) => <section style={{ marginBottom: '36px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '10px', borderBottom: `1.5px solid ${BORDER_SECTION}`, marginBottom: '18px' }}><Icon size={19} strokeWidth={1.9} color={TEXT_DARK} /><h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: TEXT_DARK, letterSpacing: '-0.01em' }}>{title}</h2></div>{children}</section>;

export const Row = ({ children, gap = '10px', mb = '10px' }) => <div style={{ display: 'flex', gap, marginBottom: mb, flexWrap: 'wrap', alignItems: 'stretch' }}>{children}</div>;

export const Panel = ({ children }) => <div style={{ background: '#f8feff', border: '1px solid rgba(42, 157, 168, 0.14)', borderRadius: '14px', padding: '16px', marginBottom: '14px' }}>{children}</div>;

function defaultLabel(option) {
  return typeof option === 'string' ? option.replace(/_/g, ' ') : option.label.replace(/_/g, ' ');
}
