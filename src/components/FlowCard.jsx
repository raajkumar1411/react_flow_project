/**
 * FlowCard Component
 *
 * Purpose: Display individual flow information in a card format
 *
 * Props:
 * - flow: Object containing flow data (id, name, nodes, edges, createdAt, updatedAt)
 * - onEdit: Function to call when user wants to edit the flow
 * - onDelete: Function to call when user wants to delete the flow
 *
 * Features:
 * - Shows flow name, description
 * - Displays creation and last modified dates
 * - Shows node and connection counts
 * - Edit button (entire card is clickable)
 * - Delete button with confirmation
 */

const FlowCard = ({ flow, onEdit, onDelete }) => {
  /**
   * Format date to readable string
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  /**
   * Handle delete button click
   * Stops event propagation to prevent card click
   */
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(flow.id);
  };

  /**
   * Handle card click to edit flow
   */
  const handleEdit = () => {
    onEdit(flow.id);
  };

  // Calculate stats
  const nodeCount = flow.nodes?.length || 0;
  const edgeCount = flow.edges?.length || 0;

  // Get node type breakdown
  const nodeTypes = flow.nodes?.reduce((acc, node) => {
    const type = node.data?.nodeType || 'custom';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {}) || {};

  return (
    <div className="flow-card" onClick={handleEdit}>
      {/* Card Header */}
      <div className="flow-card-header">
        <h3 className="flow-card-title">{flow.name || 'Untitled Flow'}</h3>
        <button
          className="flow-card-delete"
          onClick={handleDelete}
          title="Delete flow"
        >
          🗑️
        </button>
      </div>

      {/* Card Stats */}
      <div className="flow-card-stats">
        <div className="flow-stat">
          <span className="flow-stat-icon">📦</span>
          <span className="flow-stat-value">{nodeCount}</span>
          <span className="flow-stat-label">Nodes</span>
        </div>
        <div className="flow-stat">
          <span className="flow-stat-icon">🔗</span>
          <span className="flow-stat-value">{edgeCount}</span>
          <span className="flow-stat-label">Connections</span>
        </div>
      </div>

      {/* Node Types */}
      {Object.keys(nodeTypes).length > 0 && (
        <div className="flow-card-types">
          {Object.entries(nodeTypes).map(([type, count]) => (
            <span key={type} className={`flow-type-badge ${type}`}>
              {type}: {count}
            </span>
          ))}
        </div>
      )}

      {/* Card Footer */}
      <div className="flow-card-footer">
        <div className="flow-date">
          <span className="flow-date-label">Updated:</span>
          <span className="flow-date-value">{formatDate(flow.updatedAt)}</span>
        </div>
        <div className="flow-card-action">
          <span className="flow-edit-hint">Click to edit →</span>
        </div>
      </div>
    </div>
  );
};

export default FlowCard;
