import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const fieldStyles = {
  backgroundColor: '#bff7fa',
  borderColor: '#bff7fa',
  color: '#2b5c61',
};

const saveButtonStyles = {
  background: 'linear-gradient(180deg, #95f0f4 0%, #7de4ea 100%)',
  borderColor: '#7de4ea',
  color: '#17343a',
};

const EditableStatModal = ({
  show,
  onHide,
  title,
  icon,
  controlId,
  fieldType = 'text',
  value,
  onChange,
  placeholder,
  options,
  min,
  step,
  onSave,
}) => {
  const IconComponent = icon;

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Body className="p-4">
        <div className="d-flex align-items-center gap-2 mb-3" style={{ color: '#173d43' }}>
          <IconComponent size={18} strokeWidth={2} />
          <strong>{title}</strong>
        </div>

        <Form.Group controlId={controlId}>
          {fieldType === 'select' ? (
            <Form.Select
              value={value}
              onChange={(event) => onChange(event.target.value)}
              style={fieldStyles}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          ) : (
            <Form.Control
              type={fieldType}
              min={min}
              step={step}
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder={placeholder}
              style={fieldStyles}
            />
          )}
        </Form.Group>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="light" onClick={onHide}>
            Cancel
          </Button>
          <Button onClick={onSave} style={saveButtonStyles}>
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditableStatModal;
