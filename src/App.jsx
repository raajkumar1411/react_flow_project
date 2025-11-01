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
    if (nodeData.nodeType === 'api') {
      const node = nodes.find(n => n.id === nodeData.id);
      setSelectedNode(node);
      setIsModalOpen(true);
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
          nodeType: data.nodeType,
          icon: data.icon,
          id: getId(),
          onNodeClick: handleNodeClick,
          apiDetails: null,
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

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedNode(null);
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="flow-container" ref={reactFlowWrapper}>
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
    </div>
  );
}

export default App;
