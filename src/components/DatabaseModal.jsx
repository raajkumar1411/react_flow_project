import { useState, useEffect } from 'react';

const DatabaseModal = ({ isOpen, onClose, onSave, initialData }) => {
  const dbType = initialData?.dbType || 'mongodb';

  const [formData, setFormData] = useState({
    name: '',
    // MongoDB
    connectionString: '',
    database: '',
    collection: '',
    // PostgreSQL / MySQL
    host: '',
    port: '',
    username: '',
    password: '',
    databaseName: '',
    table: '',
    // Redis
    redisHost: '',
    redisPort: '',
    redisPassword: '',
    redisDb: '',
    // Neo4j
    neo4jUri: '',
    neo4jUser: '',
    neo4jPassword: '',
    neo4jDatabase: '',
    // Snowflake
    account: '',
    warehouse: '',
    snowflakeDatabase: '',
    schema: '',
    role: '',
    // GraphQL
    endpoint: '',
    query: '',
    mutation: '',
    headers: '',
    // Common
    operation: 'read',
    description: '',
    customFields: []
  });

  useEffect(() => {
    if (isOpen) {
      console.log('=== DATABASE MODAL OPENED ===');
      console.log('Initial data received:', initialData);
      console.log('Database type:', dbType);
    }

    if (initialData?.dbDetails) {
      console.log('Loading existing DB details:', initialData.dbDetails);
      setFormData(prev => ({
        ...prev,
        ...initialData.dbDetails,
        customFields: initialData.dbDetails.customFields || []
      }));
    } else if (isOpen) {
      console.log('No existing DB details - starting with empty form');
    }
  }, [initialData, isOpen, dbType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addCustomField = () => {
    setFormData(prev => ({
      ...prev,
      customFields: [...prev.customFields, { id: Date.now(), key: '', value: '' }]
    }));
  };

  const removeCustomField = (id) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields.filter(field => field.id !== id)
    }));
  };

  const updateCustomField = (id, property, value) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields.map(field =>
        field.id === id ? { ...field, [property]: value } : field
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('=== DATABASE MODAL SUBMITTING ===');
    console.log('Database type:', dbType);
    console.log('Form data being saved:', formData);
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  const renderMongoDBForm = () => (
    <>
      <div className="form-group">
        <label>Connection String *</label>
        <input
          type="text"
          name="connectionString"
          value={formData.connectionString}
          onChange={handleChange}
          placeholder="mongodb://localhost:27017"
          required
        />
      </div>
      <div className="form-group">
        <label>Database *</label>
        <input
          type="text"
          name="database"
          value={formData.database}
          onChange={handleChange}
          placeholder="myDatabase"
          required
        />
      </div>
      <div className="form-group">
        <label>Collection *</label>
        <input
          type="text"
          name="collection"
          value={formData.collection}
          onChange={handleChange}
          placeholder="myCollection"
          required
        />
      </div>
    </>
  );

  const renderPostgreSQLForm = () => (
    <>
      <div className="form-group">
        <label>Host *</label>
        <input
          type="text"
          name="host"
          value={formData.host}
          onChange={handleChange}
          placeholder="localhost"
          required
        />
      </div>
      <div className="form-group">
        <label>Port *</label>
        <input
          type="text"
          name="port"
          value={formData.port}
          onChange={handleChange}
          placeholder="5432"
          required
        />
      </div>
      <div className="form-group">
        <label>Username *</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="postgres"
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
      </div>
      <div className="form-group">
        <label>Database Name *</label>
        <input
          type="text"
          name="databaseName"
          value={formData.databaseName}
          onChange={handleChange}
          placeholder="mydb"
          required
        />
      </div>
      <div className="form-group">
        <label>Table</label>
        <input
          type="text"
          name="table"
          value={formData.table}
          onChange={handleChange}
          placeholder="users"
        />
      </div>
    </>
  );

  const renderMySQLForm = () => (
    <>
      <div className="form-group">
        <label>Host *</label>
        <input
          type="text"
          name="host"
          value={formData.host}
          onChange={handleChange}
          placeholder="localhost"
          required
        />
      </div>
      <div className="form-group">
        <label>Port *</label>
        <input
          type="text"
          name="port"
          value={formData.port}
          onChange={handleChange}
          placeholder="3306"
          required
        />
      </div>
      <div className="form-group">
        <label>Username *</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="root"
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
      </div>
      <div className="form-group">
        <label>Database Name *</label>
        <input
          type="text"
          name="databaseName"
          value={formData.databaseName}
          onChange={handleChange}
          placeholder="mydb"
          required
        />
      </div>
      <div className="form-group">
        <label>Table</label>
        <input
          type="text"
          name="table"
          value={formData.table}
          onChange={handleChange}
          placeholder="users"
        />
      </div>
    </>
  );

  const renderRedisForm = () => (
    <>
      <div className="form-group">
        <label>Host *</label>
        <input
          type="text"
          name="redisHost"
          value={formData.redisHost}
          onChange={handleChange}
          placeholder="localhost"
          required
        />
      </div>
      <div className="form-group">
        <label>Port *</label>
        <input
          type="text"
          name="redisPort"
          value={formData.redisPort}
          onChange={handleChange}
          placeholder="6379"
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="redisPassword"
          value={formData.redisPassword}
          onChange={handleChange}
          placeholder="••••••••"
        />
      </div>
      <div className="form-group">
        <label>Database Number</label>
        <input
          type="text"
          name="redisDb"
          value={formData.redisDb}
          onChange={handleChange}
          placeholder="0"
        />
      </div>
    </>
  );

  const renderNeo4jForm = () => (
    <>
      <div className="form-group">
        <label>URI *</label>
        <input
          type="text"
          name="neo4jUri"
          value={formData.neo4jUri}
          onChange={handleChange}
          placeholder="bolt://localhost:7687"
          required
        />
      </div>
      <div className="form-group">
        <label>Username *</label>
        <input
          type="text"
          name="neo4jUser"
          value={formData.neo4jUser}
          onChange={handleChange}
          placeholder="neo4j"
          required
        />
      </div>
      <div className="form-group">
        <label>Password *</label>
        <input
          type="password"
          name="neo4jPassword"
          value={formData.neo4jPassword}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />
      </div>
      <div className="form-group">
        <label>Database</label>
        <input
          type="text"
          name="neo4jDatabase"
          value={formData.neo4jDatabase}
          onChange={handleChange}
          placeholder="neo4j"
        />
      </div>
    </>
  );

  const renderSnowflakeForm = () => (
    <>
      <div className="form-group">
        <label>Account *</label>
        <input
          type="text"
          name="account"
          value={formData.account}
          onChange={handleChange}
          placeholder="xy12345.us-east-1"
          required
        />
      </div>
      <div className="form-group">
        <label>Username *</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="username"
          required
        />
      </div>
      <div className="form-group">
        <label>Password *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />
      </div>
      <div className="form-group">
        <label>Warehouse *</label>
        <input
          type="text"
          name="warehouse"
          value={formData.warehouse}
          onChange={handleChange}
          placeholder="COMPUTE_WH"
          required
        />
      </div>
      <div className="form-group">
        <label>Database *</label>
        <input
          type="text"
          name="snowflakeDatabase"
          value={formData.snowflakeDatabase}
          onChange={handleChange}
          placeholder="MY_DATABASE"
          required
        />
      </div>
      <div className="form-group">
        <label>Schema</label>
        <input
          type="text"
          name="schema"
          value={formData.schema}
          onChange={handleChange}
          placeholder="PUBLIC"
        />
      </div>
      <div className="form-group">
        <label>Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="ACCOUNTADMIN"
        />
      </div>
    </>
  );

  const renderGraphQLForm = () => (
    <>
      <div className="form-group">
        <label>Endpoint *</label>
        <input
          type="text"
          name="endpoint"
          value={formData.endpoint}
          onChange={handleChange}
          placeholder="https://api.example.com/graphql"
          required
        />
      </div>
      <div className="form-group">
        <label>Query</label>
        <textarea
          name="query"
          value={formData.query}
          onChange={handleChange}
          placeholder="query { users { id name email } }"
          rows="4"
        />
      </div>
      <div className="form-group">
        <label>Mutation</label>
        <textarea
          name="mutation"
          value={formData.mutation}
          onChange={handleChange}
          placeholder="mutation { createUser(name: $name) { id } }"
          rows="4"
        />
      </div>
      <div className="form-group">
        <label>Headers (JSON)</label>
        <textarea
          name="headers"
          value={formData.headers}
          onChange={handleChange}
          placeholder='{"Authorization": "Bearer token"}'
          rows="3"
        />
      </div>
    </>
  );

  const renderFormByType = () => {
    switch (dbType) {
      case 'mongodb':
        return renderMongoDBForm();
      case 'postgresql':
        return renderPostgreSQLForm();
      case 'mysql':
        return renderMySQLForm();
      case 'redis':
        return renderRedisForm();
      case 'neo4j':
        return renderNeo4jForm();
      case 'snowflake':
        return renderSnowflakeForm();
      case 'graphql':
        return renderGraphQLForm();
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Configure {initialData?.label || 'Database'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Connection Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="My Database Connection"
              required
            />
          </div>

          {renderFormByType()}

          <div className="form-group">
            <label>Operation Type</label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id="read"
                  name="operation"
                  value="read"
                  checked={formData.operation === 'read'}
                  onChange={handleChange}
                />
                <label htmlFor="read">Read</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="write"
                  name="operation"
                  value="write"
                  checked={formData.operation === 'write'}
                  onChange={handleChange}
                />
                <label htmlFor="write">Write</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="update"
                  name="operation"
                  value="update"
                  checked={formData.operation === 'update'}
                  onChange={handleChange}
                />
                <label htmlFor="update">Update</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="delete"
                  name="operation"
                  value="delete"
                  checked={formData.operation === 'delete'}
                  onChange={handleChange}
                />
                <label htmlFor="delete">Delete</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what this connection does..."
              rows="3"
            />
          </div>

          {/* Custom Fields Section */}
          <div className="custom-fields-section">
            <div className="section-header">
              <label>Custom Fields</label>
              <button type="button" className="btn btn-small btn-primary" onClick={addCustomField}>
                + Add Field
              </button>
            </div>

            {formData.customFields.length > 0 && (
              <div className="custom-fields-list">
                {formData.customFields.map((field, index) => (
                  <div key={field.id} className="custom-field-item">
                    <span className="field-index">{index + 1}.</span>
                    <input
                      type="text"
                      value={field.key}
                      onChange={(e) => updateCustomField(field.id, 'key', e.target.value)}
                      placeholder="Field name (e.g., ssl, poolSize)"
                      className="field-key-input"
                    />
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => updateCustomField(field.id, 'value', e.target.value)}
                      placeholder="Value"
                      className="field-value-input"
                    />
                    <button
                      type="button"
                      className="btn-icon btn-danger"
                      onClick={() => removeCustomField(field.id)}
                      title="Remove field"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {formData.customFields.length === 0 && (
              <div className="empty-state-small">
                No custom fields added. Click "+ Add Field" to add extra configuration.
              </div>
            )}
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

export default DatabaseModal;
