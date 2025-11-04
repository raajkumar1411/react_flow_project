const Sidebar = () => {
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
    </div>
  );
};

export default Sidebar;
