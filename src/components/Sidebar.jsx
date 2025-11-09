const Sidebar = ({ customNodes = [], onCreateCustomNode }) => {
  const nodeTypes = [
    { type: 'begin', label: 'Begin', icon: '▶️' },
    { type: 'end', label: 'End', icon: '⏹️' },
    { type: 'api', label: 'API', icon: '🔌' },
    { type: 'mongodb', label: 'MongoDB', icon: '🍃', dbType: 'mongodb' },
    { type: 'postgresql', label: 'PostgreSQL', icon: '🐘', dbType: 'postgresql' },
    { type: 'mysql', label: 'MySQL', icon: '🐬', dbType: 'mysql' },
    { type: 'redis', label: 'Redis', icon: '📮', dbType: 'redis' },
    { type: 'neo4j', label: 'Neo4j', icon: '🔗', dbType: 'neo4j' },
    { type: 'snowflake', label: 'Snowflake', icon: '❄️', dbType: 'snowflake' },
    { type: 'graphql', label: 'GraphQL', icon: '◈', dbType: 'graphql' }
  ];

  const onDragStart = (event, nodeData) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
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
            onDragStart={(e) => onDragStart(e, node)}
          >
            <span className="node-icon">{node.icon}</span>
            <span>{node.label}</span>
          </div>
        ))}
      </div>

      {customNodes.length > 0 && (
        <>
          <h3 className="section-title">Custom Nodes</h3>
          <div>
            {customNodes.map((node) => (
              <div
                key={node.id}
                className="node-item custom-node-item"
                draggable
                onDragStart={(e) => onDragStart(e, {
                  type: 'custom-type',
                  label: node.name,
                  icon: node.icon,
                  customNodeId: node.id,
                  color: node.color
                })}
                style={{ borderLeft: `4px solid ${node.color}` }}
              >
                <span className="node-icon">{node.icon}</span>
                <span>{node.name}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <button className="btn btn-primary btn-create-custom" onClick={onCreateCustomNode}>
        + Create Custom Node
      </button>
    </div>
  );
};

export default Sidebar;
