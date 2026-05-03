/* ─── Design tokens ──────────────────────────────────────────────────── */
export const TEAL_FILL = '#c8f5f7';
export const TEAL_PLACEHOLDER = '#5aacb4';
export const TEAL_ICON = '#2a9da8';
export const TEXT_DARK = '#1a2e32';
export const BORDER_SECTION = '#d0e8ea';
export const TOGGLE_OFF_KNOB = '#8dd6dc';
export const TOGGLE_ON_BG = '#2a9da8';

/* ─── Shared input style ─────────────────────────────────────────────── */
export const fieldStyle = {
  background: TEAL_FILL,
  border: 'none',
  borderRadius: '8px',
  padding: '11px 14px',
  fontSize: '0.875rem',
  color: TEXT_DARK,
  width: '100%',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

/* ─── Surface styles for layout components ───────────────────────────── */
export const surfaceStyles = {
  page: {
    minHeight: '100vh',
    minWidth: '100vw',
    background:
      'radial-gradient(circle at top, rgba(220, 245, 247, 0.55), transparent 22%), linear-gradient(180deg, #ffffff 0%, #fcfefe 100%)',
  },
  divider: {
    borderBottom: '1px solid rgba(22, 52, 55, 0.12)',
  },
  statCard: {
    background: '#ffffff',
    color: '#235e64',
    border: '1px solid rgba(41, 92, 98, 0.08)',
    boxShadow: '0 10px 24px rgba(38, 92, 99, 0.08)',
  },
};

/* ─── Card styles for MedicalHistory ─────────────────────────────────── */
export const cardStyles = {
  historyCard: {
    background: 'linear-gradient(180deg, #b4e6ee 0%, #f3fcfd 100%)',
    border: '1px solid rgba(41, 92, 98, 0.08)',
    boxShadow: '0 12px 24px rgba(38, 92, 99, 0.08)',
  },
  iconPanel: {
    width: '42px',
    height: '42px',
    background: '#f6ffff',
    color: '#5f8e93',
    border: '1px solid rgba(41, 92, 98, 0.12)',
    boxShadow: '0 8px 18px rgba(38, 92, 99, 0.08)',
  },
  emptyHalo: {
    width: '126px',
    height: '126px',
    background:
      'radial-gradient(circle, rgba(195, 244, 248, 0.9) 0%, rgba(225, 251, 253, 0.45) 42%, rgba(255, 255, 255, 0) 72%)',
  },
  emptyCircle: {
    width: '54px',
    height: '54px',
    background: '#ffffff',
    boxShadow: '0 12px 26px rgba(38, 92, 99, 0.14)',
  },
};

/* ─── Tone styles for MedicalInfoSection ─────────────────────────────── */
export const toneStyles = {
  teal: {
    background: 'linear-gradient(180deg, #bcf6f8 0%, #c9fbfb 100%)',
    title: '#143438',
    text: '#31575b',
    note: '#4e7175',
    meta: '#31575b',
    shadow: '0 12px 24px rgba(65, 219, 224, 0.16)',
  },
  danger: {
    background: 'linear-gradient(180deg, #cf6d6d 0%, #e08b8b 100%)',
    title: '#fff7f7',
    text: '#fff7f7',
    note: '#fff7f7',
    meta: '#fff7f7',
    shadow: '0 12px 24px rgba(176, 63, 63, 0.16)',
  },
  rose: {
    background: 'linear-gradient(180deg, #fff3f3 0%, #fff7f7 100%)',
    title: '#143438',
    text: '#31575b',
    note: '#4e7175',
    meta: '#b12b2b',
    shadow: '0 10px 20px rgba(188, 84, 84, 0.08)',
  },
  sand: {
    background: 'linear-gradient(180deg, #fff6df 0%, #fffaf0 100%)',
    title: '#143438',
    text: '#31575b',
    note: '#4e7175',
    meta: '#995d1d',
    shadow: '0 10px 20px rgba(181, 140, 64, 0.08)',
  },
  mint: {
    background: 'linear-gradient(180deg, #eefcf2 0%, #f6fff6 100%)',
    title: '#143438',
    text: '#31575b',
    note: '#4e7175',
    meta: '#389b50',
    shadow: '0 10px 20px rgba(68, 153, 90, 0.08)',
  },
};