/**
 * Dashboard Component
 *
 * Purpose: Main landing page that displays all saved flows as cards
 *
 * Features:
 * - Displays all flows in a card grid layout
 * - "New Flow" button to create a new flow
 * - Each card shows: flow name, creation date, last modified, node count
 * - Click a card to edit that flow
 * - Delete button on each card
 *
 * State Management:
 * - Flows are stored in localStorage under 'reactFlows' key
 * - Each flow has: id, name, nodes, edges, createdAt, updatedAt
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FlowCard from './FlowCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [flows, setFlows] = useState([]);

  // Load flows from localStorage on component mount
  useEffect(() => {
    loadFlows();
  }, []);

  /**
   * Load all flows from localStorage
   * Parses the JSON and sets the flows state
   */
  const loadFlows = () => {
    try {
      const savedFlows = localStorage.getItem('reactFlows');
      if (savedFlows) {
        setFlows(JSON.parse(savedFlows));
      }
    } catch (error) {
      console.error('Error loading flows:', error);
    }
  };

  /**
   * Navigate to flow editor with a new flow
   * Creates a unique ID using timestamp
   */
  const handleNewFlow = () => {
    const newFlowId = `flow_${Date.now()}`;
    navigate(`/flow/${newFlowId}`);
  };

  /**
   * Navigate to flow editor to edit existing flow
   * @param {string} flowId - The ID of the flow to edit
   */
  const handleEditFlow = (flowId) => {
    navigate(`/flow/${flowId}`);
  };

  /**
   * Delete a flow from localStorage
   * @param {string} flowId - The ID of the flow to delete
   */
  const handleDeleteFlow = (flowId) => {
    // Confirm deletion
    if (window.confirm('Are you sure you want to delete this flow?')) {
      const updatedFlows = flows.filter(flow => flow.id !== flowId);
      localStorage.setItem('reactFlows', JSON.stringify(updatedFlows));
      setFlows(updatedFlows);
    }
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>🚀 Flow Dashboard</h1>
          <p>Manage all your API and database workflows</p>
        </div>
        <button className="btn btn-primary btn-new-flow" onClick={handleNewFlow}>
          + New Flow
        </button>
      </div>

      {/* Stats Section */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{flows.length}</div>
          <div className="stat-label">Total Flows</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {flows.reduce((sum, flow) => sum + (flow.nodes?.length || 0), 0)}
          </div>
          <div className="stat-label">Total Nodes</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {flows.filter(flow => {
              const lastModified = new Date(flow.updatedAt);
              const today = new Date();
              return lastModified.toDateString() === today.toDateString();
            }).length}
          </div>
          <div className="stat-label">Updated Today</div>
        </div>
      </div>

      {/* Flows Grid Section */}
      <div className="flows-container">
        {flows.length === 0 ? (
          // Empty State
          <div className="empty-dashboard">
            <div className="empty-icon">📊</div>
            <h2>No flows yet</h2>
            <p>Create your first flow to get started with building workflows</p>
            <button className="btn btn-primary" onClick={handleNewFlow}>
              Create Your First Flow
            </button>
          </div>
        ) : (
          // Flows Grid
          <div className="flows-grid">
            {flows.map(flow => (
              <FlowCard
                key={flow.id}
                flow={flow}
                onEdit={handleEditFlow}
                onDelete={handleDeleteFlow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
