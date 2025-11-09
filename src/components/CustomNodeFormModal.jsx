import { useState, useEffect } from 'react';

const CustomNodeFormModal = ({ isOpen, onClose, onSave, initialData, nodeDefinition }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData?.customData) {
      setFormData(initialData.customData);
    } else {
      // Initialize with empty values
      const emptyData = {};
      nodeDefinition?.fields?.forEach(field => {
        emptyData[field.id] = field.fieldType === 'checkbox' ? false : '';
      });
      setFormData(emptyData);
    }
  }, [initialData, nodeDefinition]);

  const handleChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    const missingFields = nodeDefinition.fields
      .filter(field => field.required && !formData[field.id])
      .map(field => field.label);

    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.join(', ')}`);
      return;
    }

    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  if (!nodeDefinition) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Error</h2>
          <p>Could not find the custom node definition. The node type may have been deleted.</p>
          <div className="modal-actions">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderField = (field) => {
    switch (field.fieldType) {
      case 'text':
      case 'email':
      case 'url':
      case 'password':
      case 'number':
        return (
          <input
            type={field.fieldType}
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows="4"
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
          />
        );

      case 'time':
        return (
          <input
            type="time"
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
          />
        );

      case 'select':
        return (
          <select
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
          >
            <option value="">Select...</option>
            {field.options.map(option => (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="radio-group">
            {field.options.map(option => (
              <div key={option.id} className="radio-option">
                <input
                  type="radio"
                  id={`${field.id}_${option.id}`}
                  name={field.id}
                  value={option.value}
                  checked={formData[field.id] === option.value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  required={field.required}
                />
                <label htmlFor={`${field.id}_${option.id}`}>{option.value}</label>
              </div>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData[field.id] || false}
              onChange={(e) => handleChange(field.id, e.target.checked)}
            />
            {field.placeholder || 'Check this option'}
          </label>
        );

      case 'file':
        return (
          <input
            type="file"
            onChange={(e) => handleChange(field.id, e.target.files[0]?.name || '')}
            required={field.required}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Configure {nodeDefinition.name}</h2>
        <form onSubmit={handleSubmit}>
          {nodeDefinition.fields.map(field => (
            <div key={field.id} className="form-group">
              <label>
                {field.label} {field.required && <span className="required">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomNodeFormModal;
