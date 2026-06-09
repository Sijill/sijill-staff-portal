import React, { useRef } from 'react';
import { FileUp, Trash2 } from 'lucide-react';

export default function MultiFileUpload({
  label,
  accept = 'image/png,image/jpeg,application/pdf',
  files = [],
  onChange,
  error,
  helperText = 'Upload one or more files.',
}) {
  const fileRef = useRef(null);

  const handleSelect = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) {
      return;
    }

    onChange([...files, ...selectedFiles]);
    event.target.value = '';
  };

  const removeFile = (index) => {
    onChange(files.filter((_, fileIndex) => fileIndex !== index));
  };

  return (
    <div className="mb-4">
      <label className="d-flex align-items-center mb-2 fw-semibold text-secondary">{label}</label>

      <div
        className="border-2 border-dashed rounded-3 p-4 text-center"
        style={{ borderColor: '#d1d1d1', minHeight: '150px', backgroundColor: '#f9f9f9', cursor: 'pointer' }}
        onClick={() => fileRef.current?.click()}
      >
        <div className="d-flex align-items-center justify-content-center flex-column" style={{ height: '100%' }}>
          <FileUp size={24} className="mb-2 text-secondary" />
          <p className="mb-1">Click to upload files</p>
          <p className="text-muted small mb-0">{helperText}</p>
        </div>
        <input
          type="file"
          ref={fileRef}
          className="d-none"
          accept={accept}
          multiple
          onChange={handleSelect}
        />
      </div>

      {files.length ? (
        <ul className="list-unstyled mt-3 mb-0">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="d-flex align-items-center justify-content-between gap-3 rounded-3 px-3 py-2 mb-2"
              style={{ background: '#eef8f9' }}
            >
              <span className="small fw-semibold text-truncate">{file.name}</span>
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none"
                aria-label={`Remove ${file.name}`}
                onClick={() => removeFile(index)}
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {error ? <div className="text-danger mt-2 small">{error}</div> : null}
    </div>
  );
}
