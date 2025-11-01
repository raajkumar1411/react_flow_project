const Sidebar = () => {
  const nodeTypes = [
    { type: 'begin', label: 'Begin', icon: '▶️' },
    { type: 'end', label: 'End', icon: '⏹️' },
    { type: 'api', label: 'API', icon: '🔌' },
    { type: 'database', label: 'Database', icon: '🗄️' }
  ];

  const onDragStart = (event, nodeType, label, icon) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType, label, icon }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="sidebar">
      <h3>Components</h3>
      <div>
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="node-item"
            draggable
            onDragStart={(e) => onDragStart(e, node.type, node.label, node.icon)}
          >
            <span className="node-icon">{node.icon}</span>
            <span>{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
