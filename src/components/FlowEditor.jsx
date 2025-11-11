/**
 * FlowEditor Component
 *
 * Purpose: The main flow editing canvas where users create and edit workflows
 *
 * This component was refactored from App.jsx to support multiple flows
 *
 * Props:
 * - flowId: The ID of the flow being edited
 * - onSave: Callback function when flow is saved
 * - onBack: Callback function to return to dashboard
 *
 * Features:
 * - ReactFlow canvas for visual workflow building
 * - Drag and drop nodes from sidebar
 * - Node configuration modals (API, Database, Custom)
 * - Custom node builder
 * - Dynamic custom fields
 * - Node deletion
 * - JSON export
 * - Auto-save to localStorage
 *
 * State Management:
 * - nodes: Array of all nodes in the flow
 * - edges: Array of all connections between nodes
 * - customNodeDefinitions: Array of custom node type definitions
 * - Modal states: isModalOpen, isDbModalOpen, isCustomBuilderOpen, isCustomFormOpen
 * - selectedNode: Currently selected node for editing
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './CustomNode';
import Sidebar from './Sidebar';
import ApiModal from './ApiModal';
import DatabaseModal from './DatabaseModal';
import CustomNodeBuilder from './CustomNodeBuilder';
import CustomNodeFormModal from './CustomNodeFormModal';

// Define custom node types for ReactFlow
const nodeTypes = {
  custom: CustomNode,
};

// Counter for generating unique node IDs
let id = 0;
const getId = () => `node_${id++}`;

const FlowEditor = () => {
  const navigate = useNavigate();
  const { flowId } = useParams(); // Get flowId from URL
  const reactFlowWrapper = useRef(null);

  // State for flow name
  const [flowName, setFlowName] = useState('Untitled Flow');

  // ReactFlow state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);
  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState(false);
  const [isCustomFormOpen, setIsCustomFormOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  // Custom node definitions
  const [customNodeDefinitions, setCustomNodeDefinitions] = useState([]);

  /**
   * Handle node click to open appropriate modal
   * @param {Object} nodeData - Data from the clicked node
   */
  const handleNodeClick = useCallback((nodeData) => {
    console.log('Node clicked:', nodeData);
    // Use setNodes to find the node with latest data instead of depending on nodes
    setNodes((currentNodes) => {
      const node = currentNodes.find(n => n.id === nodeData.id);
      console.log('Found node:', node);
      setSelectedNode(node);
      return currentNodes; // Don't modify nodes, just use for reading
    });

    if (nodeData.nodeType === 'api') {
      setIsModalOpen(true);
    } else if (nodeData.dbType) {
      setIsDbModalOpen(true);
    } else if (nodeData.customNodeId) {
      console.log('Opening custom form for customNodeId:', nodeData.customNodeId);
      setIsCustomFormOpen(true);
    }
  }, []); // Empty dependencies - this function never needs to change

  /**
   * Load flow data from localStorage on component mount
   * If flowId exists, load that flow's data
   * Otherwise, start with empty canvas
   */
  useEffect(() => {
    if (!flowId) return;

    try {
      const savedFlows = localStorage.getItem('reactFlows');
      if (savedFlows) {
        const flows = JSON.parse(savedFlows);
        const flow = flows.find(f => f.id === flowId);
        if (flow) {
          setFlowName(flow.name);

          // IMPORTANT: Restore onNodeClick handler to each node
          const nodesWithHandlers = (flow.nodes || []).map(node => ({
            ...node,
            data: {
              ...node.data,
              onNodeClick: handleNodeClick
            }
          }));

          setNodes(nodesWithHandlers);
          setEdges(flow.edges || []);
          setCustomNodeDefinitions(flow.customNodeDefinitions || []);
        }
      }
    } catch (error) {
      console.error('Error loading flow:', error);
    }
  }, [flowId]); // Only depend on flowId, run once when flowId changes

  /**
   * Save current flow to localStorage
   * Updates existing flow or creates new one
   */
  const saveFlow = useCallback(() => {
    try {
      const savedFlows = localStorage.getItem('reactFlows');
      const flows = savedFlows ? JSON.parse(savedFlows) : [];

      const flowData = {
        id: flowId,
        name: flowName,
        nodes: nodes,
        edges: edges,
        customNodeDefinitions: customNodeDefinitions,
        createdAt: flows.find(f => f.id === flowId)?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const existingIndex = flows.findIndex(f => f.id === flowId);
      if (existingIndex >= 0) {
        flows[existingIndex] = flowData;
      } else {
        flows.push(flowData);
      }

      localStorage.setItem('reactFlows', JSON.stringify(flows));
      alert('Flow saved successfully!');
    } catch (error) {
      console.error('Error saving flow:', error);
      alert('Error saving flow');
    }
  }, [flowId, flowName, nodes, edges, customNodeDefinitions]);

  /**
   * Save and return to dashboard
   */
  const handleSaveAndExit = () => {
    saveFlow();
    navigate('/');
  };

  /**
   * Return to dashboard without saving
   */
  const handleBackToDashboard = () => {
    if (window.confirm('Return to dashboard? Unsaved changes will be lost.')) {
      navigate('/');
    }
  };

  // ReactFlow connection handler
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Drag over handler
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Handle drop event to create new node
   * @param {DragEvent} event - The drop event
   */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));

      if (typeof data === 'undefined' || !data) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nodeId = getId();
      const newNode = {
        id: nodeId,
        type: 'custom',
        position,
        data: {
          label: data.label,
          nodeType: data.type || data.nodeType,
          icon: data.icon,
          dbType: data.dbType,
          customNodeId: data.customNodeId,
          color: data.color,
          id: nodeId,
          onNodeClick: handleNodeClick,
          apiDetails: null,
          dbDetails: null,
          customData: null,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, handleNodeClick]
  );

  // API Modal handlers
  const handleSaveApiDetails = useCallback((apiDetails) => {
    console.log('=== SAVING API DETAILS ===');
    console.log('Selected Node:', selectedNode);
    console.log('API Details to save:', apiDetails);

    if (selectedNode) {
      setNodes((nds) => {
        const updatedNodes = nds.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  apiDetails: apiDetails,
                  label: apiDetails.name || node.data.label,
                },
              }
            : node
        );
        console.log('Updated nodes:', updatedNodes);
        return updatedNodes;
      });
      console.log('✅ API details saved successfully');
    } else {
      console.error('❌ No selected node - cannot save!');
    }
    setSelectedNode(null);
  }, [selectedNode, setNodes]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedNode(null);
  }, []);

  // Database Modal handlers
  const handleSaveDbDetails = useCallback((dbDetails) => {
    console.log('=== SAVING DB DETAILS ===');
    console.log('Selected Node:', selectedNode);
    console.log('DB Details to save:', dbDetails);

    if (selectedNode) {
      setNodes((nds) => {
        const updatedNodes = nds.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  dbDetails: dbDetails,
                  label: dbDetails.name || node.data.label,
                },
              }
            : node
        );
        console.log('Updated nodes:', updatedNodes);
        return updatedNodes;
      });
      console.log('✅ DB details saved successfully');
    } else {
      console.error('❌ No selected node - cannot save!');
    }
    setSelectedNode(null);
  }, [selectedNode, setNodes]);

  const handleCloseDbModal = useCallback(() => {
    setIsDbModalOpen(false);
    setSelectedNode(null);
  }, []);

  // Custom Node Builder handlers
  const handleCreateCustomNode = useCallback(() => {
    setIsCustomBuilderOpen(true);
  }, []);

  const handleSaveCustomNodeDefinition = useCallback((definition) => {
    const newDefinition = {
      ...definition,
      id: `custom_${Date.now()}`
    };
    setCustomNodeDefinitions(prev => [...prev, newDefinition]);
  }, []);

  const handleCloseCustomBuilder = useCallback(() => {
    setIsCustomBuilderOpen(false);
  }, []);

  // Custom Node Form handlers
  const handleSaveCustomData = useCallback((customData) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  customData: customData,
                },
              }
            : node
        )
      );
    }
    setSelectedNode(null);
  }, [selectedNode, setNodes]);

  const handleCloseCustomForm = useCallback(() => {
    setIsCustomFormOpen(false);
    setSelectedNode(null);
  }, []);

  /**
   * Export flow as JSON file
   */
  const handleExportFlow = useCallback(() => {
    console.log('=== EXPORTING FLOW ===');
    console.log('Current nodes state:', nodes);

    const flowData = {
      nodes: nodes.map(node => {
        console.log(`Exporting node ${node.id}:`, node.data);
        return {
          id: node.id,
          type: node.type,
          position: node.position,
          data: {
            label: node.data.label,
            nodeType: node.data.nodeType,
            icon: node.data.icon,
            dbType: node.data.dbType,
            apiDetails: node.data.apiDetails,
            dbDetails: node.data.dbDetails,
            customData: node.data.customData,
          }
        };
      }),
      edges: edges,
      metadata: {
        name: flowName,
        createdAt: new Date().toISOString(),
        version: '1.0'
      }
    };

    console.log('Flow data to export:', flowData);

    const jsonString = JSON.stringify(flowData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${flowName.replace(/\s+/g, '_')}_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('✅ Export complete');
  }, [nodes, edges, flowName]);

  /**
   * Get custom node definition by ID
   * @param {string} customNodeId - The custom node ID
   * @returns {Object} The node definition
   */
  const getCustomNodeDefinition = useCallback((customNodeId) => {
    if (!customNodeId) return undefined;
    return customNodeDefinitions.find(def => def.id === customNodeId);
  }, [customNodeDefinitions]);

  return (
    <div className="app-container">
      {/* Sidebar with node types */}
      <Sidebar
        customNodes={customNodeDefinitions}
        onCreateCustomNode={handleCreateCustomNode}
      />

      {/* Main flow canvas */}
      <div className="flow-container" ref={reactFlowWrapper}>
        {/* Top header with controls */}
        <div className="flow-header">
          <button className="btn btn-secondary" onClick={handleBackToDashboard}>
            ← Dashboard
          </button>
          <input
            type="text"
            className="flow-name-input"
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
            placeholder="Flow Name"
          />
          <div className="flow-header-actions">
            <button className="btn btn-secondary" onClick={handleExportFlow}>
              💾 Export JSON
            </button>
            <button className="btn btn-success" onClick={handleSaveAndExit}>
              ✓ Save & Exit
            </button>
          </div>
        </div>

        {/* ReactFlow Canvas */}
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {/* Modals */}
      <ApiModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveApiDetails}
        initialData={selectedNode?.data}
      />
      <DatabaseModal
        isOpen={isDbModalOpen}
        onClose={handleCloseDbModal}
        onSave={handleSaveDbDetails}
        initialData={selectedNode?.data}
      />
      <CustomNodeBuilder
        isOpen={isCustomBuilderOpen}
        onClose={handleCloseCustomBuilder}
        onSave={handleSaveCustomNodeDefinition}
      />
      <CustomNodeFormModal
        isOpen={isCustomFormOpen}
        onClose={handleCloseCustomForm}
        onSave={handleSaveCustomData}
        initialData={selectedNode?.data}
        nodeDefinition={getCustomNodeDefinition(selectedNode?.data?.customNodeId)}
      />
    </div>
  );
};

export default FlowEditor;
