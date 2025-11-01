import { Handle, Position } from 'reactflow';

const CustomNode = ({ data, isConnectable }) => {
  const handleClick = () => {
    if (data.onNodeClick) {
      data.onNodeClick(data);
    }
  };

  return (
    <div className={`custom-node ${data.nodeType}`} onClick={handleClick}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <div>{data.icon}</div>
        <div>{data.label}</div>
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
