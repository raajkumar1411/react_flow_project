import { Handle, Position, useReactFlow } from 'reactflow';

const CustomNode = ({ data, isConnectable, id }) => {
  const { deleteElements } = useReactFlow();

  const handleClick = () => {
    console.log('=== NODE CLICKED ===');
    console.log('Node ID:', id);
    console.log('Node data:', data);
    console.log('Has onNodeClick?', !!data.onNodeClick);

    if (data.onNodeClick) {
      // Pass both id and data to ensure we have the node ID
      data.onNodeClick({ ...data, id });
    } else {
      console.error('❌ No onNodeClick handler found!');
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering the node click
    deleteElements({ nodes: [{ id }] });
  };

  const getNodeClass = () => {
    if (data.customNodeId) {
      return `custom-node custom-type`;
    }
    if (data.dbType) {
      return `custom-node database ${data.dbType}`;
    }
    return `custom-node ${data.nodeType}`;
  };

  const getNodeStyle = () => {
    if (data.customNodeId && data.color) {
      return {
        borderColor: data.color,
        color: data.color
      };
    }
    return {};
  };

  const showDetails = data.apiDetails || data.dbDetails || data.customData;

  return (
    <div className={getNodeClass()} onClick={handleClick} style={getNodeStyle()}>
      <button className="node-delete-btn" onClick={handleDelete} title="Delete node">
        ✕
      </button>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="node-content">
        <div className="node-icon">{data.icon}</div>
        <div className="node-label">{data.label}</div>
        {showDetails && (
          <div className="node-status">✓</div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default CustomNode;
