import { useState, useEffect } from 'react';

const ApiModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    method: 'GET',
    headers: '',
    body: '',
    description: ''
  });

  useEffect(() => {
    if (initialData && initialData.apiDetails) {
      setFormData(initialData.apiDetails);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>API Configuration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">API Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Get User Data"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">API URL</label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://api.example.com/users"
              required
            />
          </div>

          <div className="form-group">
            <label>HTTP Method</label>
            <div className="radio-group">
              {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(method => (
                <div key={method} className="radio-option">
                  <input
                    type="radio"
                    id={method}
                    name="method"
                    value={method}
                    checked={formData.method === method}
                    onChange={handleChange}
                  />
                  <label htmlFor={method}>{method}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="headers">Headers (JSON format)</label>
            <textarea
              id="headers"
              name="headers"
              value={formData.headers}
              onChange={handleChange}
              placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
            />
          </div>

          <div className="form-group">
            <label htmlFor="body">Request Body (JSON format)</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder='{"key": "value"}'
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of what this API does"
            />
          </div>

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

export default ApiModal;
