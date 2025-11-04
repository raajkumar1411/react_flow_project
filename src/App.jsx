import { useState, useCallback, useRef } from 'react';
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

import CustomNode from './components/CustomNode';
import Sidebar from './components/Sidebar';
import ApiModal from './components/ApiModal';
import DatabaseModal from './components/DatabaseModal';
import './App.css';

const nodeTypes = {
  custom: CustomNode,
};

let id = 0;
const getId = () => `node_${id++}`;

function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleNodeClick = useCallback((nodeData) => {
    const node = nodes.find(n => n.id === nodeData.id);
    setSelectedNode(node);

    if (nodeData.nodeType === 'api') {
      setIsModalOpen(true);
    } else if (nodeData.dbType) {
      setIsDbModalOpen(true);
    }
  }, [nodes]);

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

      const newNode = {
        id: getId(),
        type: 'custom',
        position,
        data: {
          label: data.label,
          nodeType: data.type || data.nodeType,
          icon: data.icon,
          dbType: data.dbType,
          id: getId(),
          onNodeClick: handleNodeClick,
          apiDetails: null,
          dbDetails: null,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, handleNodeClick]
  );

  const handleSaveApiDetails = useCallback((apiDetails) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
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
        )
      );
    }
    setSelectedNode(null);
  }, [selectedNode, setNodes]);

  const handleSaveDbDetails = useCallback((dbDetails) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
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
        )
      );
    }
    setSelectedNode(null);
  }, [selectedNode, setNodes]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedNode(null);
  }, []);

  const handleCloseDbModal = useCallback(() => {
    setIsDbModalOpen(false);
    setSelectedNode(null);
  }, []);

  const handleSaveFlow = useCallback(() => {
    const flowData = {
      nodes: nodes.map(node => ({
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
        }
      })),
      edges: edges,
      metadata: {
        createdAt: new Date().toISOString(),
        version: '1.0'
      }
    };

    const jsonString = JSON.stringify(flowData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flow-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="flow-container" ref={reactFlowWrapper}>
        <div className="flow-header">
          <button className="btn btn-success" onClick={handleSaveFlow}>
            💾 Save Flow as JSON
          </button>
        </div>
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
    </div>
  );
}

export default App;
