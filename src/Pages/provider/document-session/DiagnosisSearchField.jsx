import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { searchIcd11Diagnoses } from '../../../api/icdApi';
import { TEAL_ICON } from './constants';
import { Field } from './FormPrimitives';
import { trimValue } from './helpers';

export default function DiagnosisSearchField({ diagnosis, onChange, disabled }) {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const query = trimValue(diagnosis.searchText);
    const selectedLabel = diagnosis.icd11Code && diagnosis.icd11Title ? `${diagnosis.icd11Code} - ${diagnosis.icd11Title}` : '';
    if (query.length < 2 || query === selectedLabel) {
      setResults([]);
      setSearchError('');
      setIsSearching(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(async () => {
      setIsSearching(true);
      setSearchError('');
      try {
        const response = await searchIcd11Diagnoses(query);
        setResults(Array.isArray(response) ? response : []);
        setIsOpen(true);
      } catch (error) {
        setResults([]);
        setSearchError(error.message || 'Unable to search ICD-11 diagnoses.');
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [diagnosis.icd11Code, diagnosis.icd11Title, diagnosis.searchText]);

  const handleSelect = (item) => {
    onChange({ searchText: `${item.code} - ${item.title}`, icd11Code: item.code, icd11Title: item.title });
    setResults([]);
    setSearchError('');
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', flex: 2, minWidth: '280px' }}>
      <div style={{ position: 'relative' }}>
        <Field placeholder="Search ICD-11 diagnosis..." value={diagnosis.searchText} disabled={disabled} onFocus={() => results.length && setIsOpen(true)} onChange={(event) => onChange({ searchText: event.target.value, icd11Code: '', icd11Title: '' })} style={{ paddingRight: '42px' }} />
        <Search size={16} strokeWidth={2} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: TEAL_ICON, pointerEvents: 'none' }} />
      </div>

      {diagnosis.icd11Code && diagnosis.icd11Title ? <SelectedDiagnosis diagnosis={diagnosis} /> : null}
      {isOpen && (results.length || isSearching || searchError) ? <SearchResults isSearching={isSearching} searchError={searchError} results={results} onSelect={handleSelect} /> : null}
    </div>
  );
}

function SelectedDiagnosis({ diagnosis }) {
  return <div style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#eefafb', borderRadius: '999px', padding: '6px 10px', color: '#24525a', fontSize: '0.78rem', fontWeight: 700 }}><span>{diagnosis.icd11Code}</span><span>{diagnosis.icd11Title}</span></div>;
}

function SearchResults({ isSearching, searchError, results, onSelect }) {
  return (
    <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 20, background: '#ffffff', borderRadius: '12px', border: '1px solid rgba(42, 157, 168, 0.16)', overflow: 'hidden', boxShadow: '0 18px 38px rgba(19, 63, 68, 0.12)' }}>
      {isSearching ? <div style={{ padding: '12px 14px', color: '#527176', fontSize: '0.84rem', fontWeight: 600 }}>Searching ICD-11...</div> : null}
      {!isSearching && searchError ? <div style={{ padding: '12px 14px', color: '#b23b3b', fontSize: '0.84rem', fontWeight: 600 }}>{searchError}</div> : null}
      {!isSearching && !searchError ? results.map((item) => <button key={`${item.code}-${item.title}`} type="button" onClick={() => onSelect(item)} style={{ width: '100%', padding: '12px 14px', border: 'none', background: '#ffffff', borderBottom: '1px solid rgba(42, 157, 168, 0.08)', textAlign: 'left', cursor: 'pointer' }}><div style={{ color: '#18363b', fontWeight: 700, fontSize: '0.86rem' }}>{item.title}</div><div style={{ color: '#5b7a80', fontSize: '0.78rem', fontWeight: 600 }}>{item.code}</div></button>) : null}
    </div>
  );
}
