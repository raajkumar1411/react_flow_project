import { useState } from 'react';

const CustomNodeBuilder = ({ isOpen, onClose, onSave }) => {
  const [nodeName, setNodeName] = useState('');
  const [nodeIcon, setNodeIcon] = useState('📄');
  const [nodeColor, setNodeColor] = useState('#9b59b6');
  const [fields, setFields] = useState([]);

  const fieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'number', label: 'Number' },
    { value: 'email', label: 'Email' },
    { value: 'url', label: 'URL' },
    { value: 'password', label: 'Password' },
    { value: 'date', label: 'Date' },
    { value: 'time', label: 'Time' },
    { value: 'select', label: 'Dropdown' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'file', label: 'File Upload' }
  ];

  const addField = () => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        label: '',
        fieldType: 'text',
        placeholder: '',
        required: false,
        options: [] // For select/radio
      }
    ]);
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const updateField = (id, property, value) => {
    setFields(fields.map(field =>
      field.id === id ? { ...field, [property]: value } : field
    ));
  };

  const addOption = (fieldId) => {
    setFields(fields.map(field => {
      if (field.id === fieldId) {
        return {
          ...field,
          options: [...field.options, { id: Date.now(), value: '' }]
        };
      }
      return field;
    }));
  };

  const removeOption = (fieldId, optionId) => {
    setFields(fields.map(field => {
      if (field.id === fieldId) {
        return {
          ...field,
          options: field.options.filter(opt => opt.id !== optionId)
        };
      }
      return field;
    }));
  };

  const updateOption = (fieldId, optionId, value) => {
    setFields(fields.map(field => {
      if (field.id === fieldId) {
        return {
          ...field,
          options: field.options.map(opt =>
            opt.id === optionId ? { ...opt, value } : opt
          )
        };
      }
      return field;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nodeName.trim()) {
      alert('Please enter a node name');
      return;
    }
    if (fields.length === 0) {
      alert('Please add at least one field');
      return;
    }

    const customNodeDefinition = {
      name: nodeName,
      icon: nodeIcon,
      color: nodeColor,
      fields: fields
    };

    onSave(customNodeDefinition);

    // Reset form
    setNodeName('');
    setNodeIcon('📄');
    setNodeColor('#9b59b6');
    setFields([]);
    onClose();
  };

  if (!isOpen) return null;

  const commonIcons = ['📄', '📊', '📈', '🔧', '⚙️', '🎯', '💡', '🔔', '📝', '✨', '🚀', '💻', '🌐', '📦', '🎨', '🔥'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal custom-node-builder-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Create Custom Node</h2>
        <form onSubmit={handleSubmit}>
          {/* Node Configuration */}
          <div className="node-config-section">
            <div className="form-group">
              <label>Node Name *</label>
              <input
                type="text"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                placeholder="e.g., Payment Gateway, Email Service"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Icon</label>
                <div className="icon-selector">
                  <input
                    type="text"
                    value={nodeIcon}
                    onChange={(e) => setNodeIcon(e.target.value)}
                    placeholder="📄"
                    maxLength="2"
                    className="icon-input"
                  />
                  <div className="icon-grid">
                    {commonIcons.map(icon => (
                      <button
                        key={icon}
                        type="button"
                        className={`icon-option ${nodeIcon === icon ? 'selected' : ''}`}
                        onClick={() => setNodeIcon(icon)}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Color</label>
                <input
                  type="color"
                  value={nodeColor}
                  onChange={(e) => setNodeColor(e.target.value)}
                  className="color-input"
                />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="fields-section">
            <div className="section-header">
              <h3>Form Fields</h3>
              <button type="button" className="btn btn-small btn-primary" onClick={addField}>
                + Add Field
              </button>
            </div>

            {fields.length === 0 && (
              <div className="empty-state">
                No fields added yet. Click "Add Field" to create your custom form.
              </div>
            )}

            <div className="fields-list">
              {fields.map((field, index) => (
                <div key={field.id} className="field-config">
                  <div className="field-header">
                    <span className="field-number">Field {index + 1}</span>
                    <button
                      type="button"
                      className="btn-icon btn-danger"
                      onClick={() => removeField(field.id)}
                      title="Remove field"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="form-row">
                    <div className="form-group flex-2">
                      <label>Field Label *</label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(field.id, 'label', e.target.value)}
                        placeholder="e.g., API Key, Username"
                        required
                      />
                    </div>

                    <div className="form-group flex-1">
                      <label>Field Type *</label>
                      <select
                        value={field.fieldType}
                        onChange={(e) => updateField(field.id, 'fieldType', e.target.value)}
                      >
                        {fieldTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Placeholder</label>
                    <input
                      type="text"
                      value={field.placeholder}
                      onChange={(e) => updateField(field.id, 'placeholder', e.target.value)}
                      placeholder="Placeholder text..."
                    />
                  </div>

                  {(field.fieldType === 'select' || field.fieldType === 'radio') && (
                    <div className="form-group">
                      <label>Options</label>
                      <div className="options-list">
                        {field.options.map((option, optIndex) => (
                          <div key={option.id} className="option-item">
                            <input
                              type="text"
                              value={option.value}
                              onChange={(e) => updateOption(field.id, option.id, e.target.value)}
                              placeholder={`Option ${optIndex + 1}`}
                            />
                            <button
                              type="button"
                              className="btn-icon btn-small"
                              onClick={() => removeOption(field.id, option.id)}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn-small btn-secondary"
                          onClick={() => addOption(field.id)}
                        >
                          + Add Option
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(field.id, 'required', e.target.checked)}
                      />
                      Required field
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Node Type
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomNodeBuilder;
