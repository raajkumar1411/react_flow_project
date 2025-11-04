import { Handle, Position } from 'reactflow';

const CustomNode = ({ data, isConnectable }) => {
  const handleClick = () => {
    if (data.onNodeClick) {
      data.onNodeClick(data);
    }
  };

  const getNodeClass = () => {
    if (data.dbType) {
      return `custom-node database ${data.dbType}`;
    }
    return `custom-node ${data.nodeType}`;
  };

  const showDetails = data.apiDetails || data.dbDetails;

  return (
    <div className={getNodeClass()} onClick={handleClick}>
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
