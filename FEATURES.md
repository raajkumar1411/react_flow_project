# React Flow API Builder - Features

## Overview
A comprehensive visual flow builder for creating API and database workflows with support for multiple database types and JSON export functionality.

## Supported Database Types

### 1. MongoDB
- Connection String
- Database Name
- Collection Name
- Operation Type (Read/Write/Update/Delete)

### 2. PostgreSQL
- Host & Port
- Username & Password
- Database Name
- Table Name
- Operation Type

### 3. MySQL
- Host & Port (default: 3306)
- Username & Password
- Database Name
- Table Name
- Operation Type

### 4. Redis
- Host & Port (default: 6379)
- Password (optional)
- Database Number
- Operation Type

### 5. Neo4j
- URI (bolt://...)
- Username & Password
- Database Name
- Operation Type

### 6. Snowflake
- Account Identifier
- Username & Password
- Warehouse
- Database & Schema
- Role (optional)
- Operation Type

### 7. GraphQL
- Endpoint URL
- Query
- Mutation
- Headers (JSON format)
- Operation Type

## Node Types

### Begin Node
- Green colored
- Marks the start of the workflow
- Icon: ▶️

### End Node
- Red colored
- Marks the end of the workflow
- Icon: ⏹️

### API Node
- Blue colored
- Configure REST API endpoints
- Supports: GET, POST, PUT, PATCH, DELETE
- Icon: 🔌

### Database Nodes
Each database type has its own color and icon:
- MongoDB 🍃 (Green)
- PostgreSQL 🐘 (Blue)
- MySQL 🐬 (Teal)
- Redis 📮 (Red)
- Neo4j 🔗 (Light Blue)
- Snowflake ❄️ (Sky Blue)
- GraphQL ◈ (Pink)

## Node Types (Continued)

### Custom Nodes
Create your own node types with:
- Custom name and icon
- Personalized color
- Dynamic form fields
- 12 field types (text, number, dropdown, radio, checkbox, etc.)
- See [CUSTOM_NODES_GUIDE.md](./CUSTOM_NODES_GUIDE.md) for complete documentation

## Features

### 1. Drag and Drop
- Drag any node type from the sidebar
- Drop onto the canvas to create a new node
- Automatically positions at drop location

### 2. Node Configuration
- Click on API nodes to configure endpoints
- Click on database nodes to set connection details
- **NEW**: Add dynamic custom fields to any API or Database node
- Visual indicator (✓) shows configured nodes

### 3. Visual Connections
- Connect nodes by dragging from one handle to another
- Create complex workflow sequences
- Visual flow representation

### 3.5 Node Management
- **Delete nodes**: Hover over any node to see the delete button (✕)
- **Keyboard shortcut**: Select a node and press Delete or Backspace
- Delete button appears on hover for all node types

### 4. Dynamic Custom Fields (NEW!)
- Add custom key-value pairs to API and Database nodes
- Perfect for timeouts, retry settings, SSL options, etc.
- Quick and flexible without creating custom nodes
- See [DYNAMIC_FIELDS_GUIDE.md](./DYNAMIC_FIELDS_GUIDE.md) for details

### 5. Custom Node Builder
- Click "+ Create Custom Node" in sidebar
- Design your own node types
- Add custom form fields with 12+ field types
- Choose icons and colors
- Build nodes for any integration or service

### 6. JSON Export
- Click "💾 Save Flow as JSON" button
- Exports complete flow including:
  - All nodes with positions
  - All connections (edges)
  - API details
  - Database connection details
  - Metadata (timestamp, version)

### 7. Flow Controls
- Zoom in/out
- Pan the canvas
- Fit view to see entire flow
- Mini-map for navigation

## JSON Structure

```json
{
  "nodes": [
    {
      "id": "node_0",
      "type": "custom",
      "position": { "x": 100, "y": 100 },
      "data": {
        "label": "Begin",
        "nodeType": "begin",
        "icon": "▶️",
        "dbType": null,
        "apiDetails": null,
        "dbDetails": null
      }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node_0",
      "target": "node_1"
    }
  ],
  "metadata": {
    "createdAt": "2025-11-04T12:00:00.000Z",
    "version": "1.0"
  }
}
```

## How to Use

1. **Start the Application**
   ```bash
   npm run dev
   ```

2. **Create a Flow**
   - Drag a "Begin" node to start
   - Add API or database nodes
   - Configure each node by clicking on it
   - Connect nodes to create workflow
   - Add an "End" node to finish

3. **Configure API Node**
   - Click the API node
   - Fill in:
     - API Name
     - URL
     - HTTP Method
     - Headers (JSON)
     - Request Body (JSON)
     - Description

4. **Configure Database Node**
   - Click the database node
   - Fill in connection details (varies by type)
   - Select operation type
   - Add description

5. **Save Flow**
   - Click "💾 Save Flow as JSON"
   - File downloads with timestamp
   - Can be used for documentation or implementation

## Development

- Built with React 19 + Vite
- Uses ReactFlow for visual flow editor
- Modular component architecture
- Extensible for additional database types

## Future Enhancements

- Load flow from JSON file
- Validate connections
- Execute flows
- Add more database types
- Connection testing
- Template library
