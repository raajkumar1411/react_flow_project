# React Flow Application - Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Component Structure](#component-structure)
3. [Data Flow](#data-flow)
4. [Routing](#routing)
5. [State Management](#state-management)
6. [Component Details](#component-details)
7. [Logic Breakdown](#logic-breakdown)

---

## Overview

This is a comprehensive flow builder application that allows users to create, manage, and edit visual workflows with API integrations, database connections, and custom nodes.

### Key Features
- Multi-flow dashboard
- Visual flow editor with drag-and-drop
- API and database node configuration
- Custom node builder
- Dynamic custom fields
- Local storage persistence
- JSON export/import

---

## Component Structure

```
src/
├── App.jsx                          # Main router component
├── App.css                          # Global styles
├── components/
│   ├── Dashboard.jsx                # Home page with all flows
│   ├── FlowCard.jsx                 # Individual flow card component
│   ├── FlowEditor.jsx               # Main flow editing canvas
│   ├── Sidebar.jsx                  # Draggable node types sidebar
│   ├── CustomNode.jsx               # Node component renderer
│   ├── ApiModal.jsx                 # API configuration modal
│   ├── DatabaseModal.jsx            # Database configuration modal
│   ├── CustomNodeBuilder.jsx        # Create custom node types
│   └── CustomNodeFormModal.jsx      # Form for custom node instances
```

---

## Data Flow

### Flow Storage Structure (localStorage)

```javascript
{
  "reactFlows": [
    {
      "id": "flow_1699123456789",
      "name": "My API Flow",
      "nodes": [...],
      "edges": [...],
      "customNodeDefinitions": [...],
      "createdAt": "2024-11-04T12:00:00.000Z",
      "updatedAt": "2024-11-04T14:30:00.000Z"
    }
  ]
}
```

### Node Data Structure

```javascript
{
  "id": "node_1",
  "type": "custom",
  "position": { "x": 100, "y": 200 },
  "data": {
    "label": "User API",
    "nodeType": "api",
    "icon": "🔌",
    "dbType": null,
    "customNodeId": null,
    "color": null,
    "id": "node_1",
    "onNodeClick": Function,
    "apiDetails": {
      "name": "Get Users",
      "url": "https://api.example.com/users",
      "method": "GET",
      "headers": "{}",
      "body": "",
      "description": "Fetch all users",
      "customFields": [
        { "id": 1699123456789, "key": "timeout", "value": "5000" }
      ]
    },
    "dbDetails": null,
    "customData": null
  }
}
```

---

## Routing

### Routes
| Path | Component | Purpose |
|------|-----------|---------|
| `/` | Dashboard | Home page showing all flows |
| `/flow/:flowId` | FlowEditor | Create/edit specific flow |

### Navigation Flow
1. User lands on Dashboard (`/`)
2. Clicks "New Flow" → Navigates to `/flow/flow_1699123456789`
3. Edits flow in FlowEditor
4. Clicks "Save & Exit" → Saves to localStorage → Returns to Dashboard

---

## State Management

### Dashboard Component State
- `flows` - Array of all flows loaded from localStorage

### FlowEditor Component State
- `flowName` - Name of current flow
- `nodes` - ReactFlow nodes array
- `edges` - ReactFlow edges array
- `customNodeDefinitions` - Array of custom node type definitions
- `isModalOpen` - Boolean for API modal
- `isDbModalOpen` - Boolean for Database modal
- `isCustomBuilderOpen` - Boolean for Custom Node Builder
- `isCustomFormOpen` - Boolean for Custom Node Form
- `selectedNode` - Currently selected node object
- `reactFlowInstance` - ReactFlow instance reference

### Persistence Strategy
- **localStorage** used for all data persistence
- Key: `'reactFlows'`
- Auto-save on "Save & Exit" button
- Manual JSON export available

---

## Component Details

### 1. App.jsx
**Purpose:** Main application router

**Logic:**
- Sets up React Router with BrowserRouter
- Defines two routes: Dashboard and FlowEditor
- No state management (delegated to child components)

**Code Structure:**
```javascript
<Router>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/flow/:flowId" element={<FlowEditor />} />
  </Routes>
</Router>
```

---

### 2. Dashboard.jsx
**Purpose:** Display all flows and manage flow CRUD operations

**State:**
- `flows`: Array of flow objects

**Key Functions:**
| Function | Parameters | Purpose |
|----------|-----------|---------|
| `loadFlows()` | None | Load flows from localStorage |
| `handleNewFlow()` | None | Navigate to new flow editor |
| `handleEditFlow(flowId)` | flowId | Navigate to edit existing flow |
| `handleDeleteFlow(flowId)` | flowId | Delete flow with confirmation |

**Logic Flow:**
1. Component mounts → `useEffect` calls `loadFlows()`
2. Parse localStorage `'reactFlows'` → Set `flows` state
3. Render flow cards in grid
4. User clicks "New Flow" → Generate unique ID → Navigate to `/flow/{id}`
5. User clicks flow card → Navigate to `/flow/{id}`
6. User clicks delete → Confirm → Filter out flow → Update localStorage

**Rendering Logic:**
- If `flows.length === 0`: Show empty state
- Else: Show stats cards + flow grid

---

### 3. FlowCard.jsx
**Purpose:** Display individual flow information

**Props:**
- `flow` - Flow object (id, name, nodes, edges, createdAt, updatedAt)
- `onEdit(flowId)` - Callback for editing
- `onDelete(flowId)` - Callback for deleting

**Key Functions:**
| Function | Parameters | Purpose |
|----------|-----------|---------|
| `formatDate(dateString)` | dateString | Convert date to readable format |
| `handleDelete(e)` | event | Stop propagation and trigger delete |
| `handleEdit()` | None | Trigger edit callback |

**Computed Values:**
- `nodeCount` - Total number of nodes
- `edgeCount` - Total number of connections
- `nodeTypes` - Breakdown of node types (api, begin, end, etc.)

---

### 4. FlowEditor.jsx
**Purpose:** Main flow editing canvas with ReactFlow

**URL Parameter:**
- `flowId` - Unique flow identifier from route

**Key Functions:**

| Function | Parameters | Purpose |
|----------|-----------|---------|
| `loadFlow(id)` | flowId | Load flow data from localStorage |
| `saveFlow()` | None | Save current flow to localStorage |
| `handleSaveAndExit()` | None | Save and navigate to dashboard |
| `handleBackToDashboard()` | None | Navigate to dashboard (with confirmation) |
| `handleNodeClick(nodeData)` | nodeData | Open appropriate modal for node |
| `onDrop(event)` | DragEvent | Create new node from drag-drop |
| `handleExportFlow()` | None | Export flow as JSON file |

**Lifecycle:**
1. Component mounts → `useEffect` → `loadFlow(flowId)`
2. Check if flow exists in localStorage
   - If exists: Load nodes, edges, customNodeDefinitions
   - If not: Start with empty canvas
3. User edits flow → State updates
4. User clicks "Save & Exit" → `saveFlow()` → Navigate to dashboard

**Modal Management:**
- API nodes → `isModalOpen = true`
- Database nodes → `isDbModalOpen = true`
- Custom nodes → `isCustomFormOpen = true`
- Custom node builder → `isCustomBuilderOpen = true`

---

### 5. Sidebar.jsx
**Purpose:** Provide draggable node types

**Props:**
- `customNodes` - Array of custom node definitions
- `onCreateCustomNode()` - Callback to open custom node builder

**Node Types:**
- Begin, End, API
- MongoDB, PostgreSQL, MySQL, Redis, Neo4j, Snowflake, GraphQL
- Custom nodes (dynamic)

**Drag Logic:**
```javascript
onDragStart = (event, nodeData) => {
  event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
  event.dataTransfer.effectAllowed = 'move';
}
```

---

### 6. CustomNode.jsx
**Purpose:** Render individual nodes on canvas

**Props:**
- `data` - Node data object
- `isConnectable` - Boolean for connection ability
- `id` - Node unique ID

**Key Functions:**
| Function | Parameters | Purpose |
|----------|-----------|---------|
| `handleClick()` | None | Trigger `data.onNodeClick` |
| `handleDelete(e)` | event | Delete node (stop propagation) |
| `getNodeClass()` | None | Determine CSS class based on type |
| `getNodeStyle()` | None | Get inline styles (for custom nodes) |

**Visual Elements:**
- Delete button (✕) - Top right, visible on hover
- Status indicator (✓) - Shows if configured
- Icon - Node type icon
- Label - Node name
- Handles - Top (target) and bottom (source) connection points

---

### 7. ApiModal.jsx
**Purpose:** Configure API node details

**Props:**
- `isOpen` - Boolean for modal visibility
- `onClose()` - Callback to close modal
- `onSave(formData)` - Callback to save data
- `initialData` - Existing node data for editing

**Form Fields:**
- API Name (text, required)
- API URL (text, required)
- HTTP Method (radio: GET, POST, PUT, PATCH, DELETE)
- Headers (textarea, JSON format)
- Request Body (textarea, JSON format)
- Description (textarea)
- Custom Fields (dynamic key-value pairs)

**Custom Fields Logic:**
```javascript
addCustomField() {
  setFormData(prev => ({
    ...prev,
    customFields: [...prev.customFields, { id: Date.now(), key: '', value: '' }]
  }));
}

removeCustomField(id) {
  setFormData(prev => ({
    ...prev,
    customFields: prev.customFields.filter(field => field.id !== id)
  }));
}

updateCustomField(id, property, value) {
  setFormData(prev => ({
    ...prev,
    customFields: prev.customFields.map(field =>
      field.id === id ? { ...field, [property]: value } : field
    )
  }));
}
```

---

### 8. DatabaseModal.jsx
**Purpose:** Configure database node details

**Props:** Same as ApiModal

**Database-Specific Forms:**
Each database type has custom fields:

| Database | Fields |
|----------|--------|
| MongoDB | connectionString, database, collection |
| PostgreSQL | host, port, username, password, databaseName, table |
| MySQL | host, port, username, password, databaseName, table |
| Redis | redisHost, redisPort, redisPassword, redisDb |
| Neo4j | neo4jUri, neo4jUser, neo4jPassword, neo4jDatabase |
| Snowflake | account, username, password, warehouse, snowflakeDatabase, schema, role |
| GraphQL | endpoint, query, mutation, headers |

**Common Fields:**
- Name (text, required)
- Operation Type (radio: read, write, update, delete)
- Description (textarea)
- Custom Fields (dynamic)

**Form Rendering Logic:**
```javascript
const renderFormByType = () => {
  switch (dbType) {
    case 'mongodb': return renderMongoDBForm();
    case 'postgresql': return renderPostgreSQLForm();
    // ... other cases
  }
}
```

---

### 9. CustomNodeBuilder.jsx
**Purpose:** Create custom node type definitions

**Props:**
- `isOpen` - Boolean
- `onClose()` - Callback
- `onSave(definition)` - Callback with node definition

**Form Structure:**
1. **Node Configuration**
   - Node Name (text, required)
   - Icon (emoji picker)
   - Color (color picker)

2. **Field Builder**
   - Add/Remove fields
   - For each field:
     - Label (text)
     - Field Type (select)
     - Placeholder (text)
     - Required checkbox
     - Options (for select/radio)

**Field Types:**
- text, textarea, number, email, url, password
- date, time, select, radio, checkbox, file

**Save Logic:**
```javascript
handleSubmit(e) {
  e.preventDefault();

  const customNodeDefinition = {
    name: nodeName,
    icon: nodeIcon,
    color: nodeColor,
    fields: fields // Array of field definitions
  };

  onSave(customNodeDefinition);
}
```

---

### 10. CustomNodeFormModal.jsx
**Purpose:** Display form for custom node instances

**Props:**
- `isOpen` - Boolean
- `onClose()` - Callback
- `onSave(formData)` - Callback
- `initialData` - Existing custom data
- `nodeDefinition` - The custom node type definition

**Dynamic Form Rendering:**
```javascript
renderField(field) {
  switch (field.fieldType) {
    case 'text': return <input type="text" ... />;
    case 'textarea': return <textarea ... />;
    case 'select': return <select>...</select>;
    case 'radio': return <div className="radio-group">...</div>;
    // ... other cases
  }
}
```

**Validation:**
- Check required fields before submit
- Alert user if missing required fields
- No submit until all required fields filled

---

## Logic Breakdown

### Flow Creation Process
1. User clicks "New Flow" on Dashboard
2. Generate unique ID: `flow_${Date.now()}`
3. Navigate to `/flow/flow_123456789`
4. FlowEditor loads with empty canvas
5. User drags nodes, configures them
6. User clicks "Save & Exit"
7. `saveFlow()` creates flow object
8. Save to localStorage under `'reactFlows'` key
9. Navigate back to Dashboard
10. Dashboard reloads flows from localStorage
11. New flow card appears

### Flow Editing Process
1. User clicks existing flow card
2. Navigate to `/flow/existingFlowId`
3. FlowEditor `useEffect` calls `loadFlow(existingFlowId)`
4. Parse localStorage, find matching flow
5. Load nodes, edges, customNodeDefinitions into state
6. User makes changes
7. User clicks "Save & Exit"
8. `saveFlow()` updates existing flow in array
9. Update `updatedAt` timestamp
10. Save back to localStorage
11. Navigate to Dashboard

### Node Configuration Process
1. User clicks node on canvas
2. `handleClick()` in CustomNode calls `data.onNodeClick(data)`
3. FlowEditor's `handleNodeClick()` receives nodeData
4. Check node type:
   - If `nodeType === 'api'`: Open ApiModal
   - If `dbType` exists: Open DatabaseModal
   - If `customNodeId` exists: Open CustomNodeFormModal
5. User fills form
6. User clicks "Save"
7. Modal calls `onSave(formData)`
8. FlowEditor updates node in nodes array
9. ReactFlow re-renders with updated node

### Custom Field Addition
1. User opens ApiModal or DatabaseModal
2. Scrolls to "Custom Fields" section
3. Clicks "+ Add Field"
4. `addCustomField()` adds new object to customFields array:
   ```javascript
   { id: Date.now(), key: '', value: '' }
   ```
5. User enters key and value
6. Clicks "Save"
7. customFields array saved in node's apiDetails or dbDetails

### LocalStorage Structure
```javascript
localStorage.setItem('reactFlows', JSON.stringify([
  {
    id: 'flow_1699123456789',
    name: 'My Flow',
    nodes: [...],
    edges: [...],
    customNodeDefinitions: [...],
    createdAt: '2024-11-04T12:00:00.000Z',
    updatedAt: '2024-11-04T14:30:00.000Z'
  }
]));
```

---

## Error Handling

### Common Scenarios
1. **localStorage quota exceeded**
   - Try/catch blocks in save operations
   - Console.error logging
   - User alert on error

2. **Corrupt localStorage data**
   - JSON.parse wrapped in try/catch
   - Fall back to empty array on error

3. **Missing node definition**
   - CustomNodeFormModal shows error message
   - "Node type may have been deleted" message

4. **Navigation warnings**
   - Confirm dialog before leaving unsaved flow
   - "Unsaved changes will be lost" message

---

## Performance Considerations

1. **LocalStorage Limits**
   - ~5-10MB per domain
   - Large flows may hit limit
   - Consider IndexedDB for larger datasets

2. **ReactFlow Performance**
   - Use `useCallback` for handlers
   - Memoize expensive calculations
   - Limit number of nodes for smooth experience

3. **State Updates**
   - Batch state updates where possible
   - Use functional setState for dependent updates

---

## Future Enhancements

1. **Backend Integration**
   - Replace localStorage with API
   - User authentication
   - Cloud sync

2. **Collaboration**
   - Real-time multi-user editing
   - Comments and annotations
   - Version history

3. **Advanced Features**
   - Flow templates
   - Import/Export flows
   - Flow validation
   - Execution engine
   - Debugging tools

---

## Development Guide

### Adding a New Node Type
1. Add to `Sidebar.jsx` nodeTypes array
2. Add icon and dbType/nodeType
3. Create form section in `DatabaseModal.jsx` or create new modal
4. Add CSS styles for node color in `App.css`
5. Update documentation

### Adding a New Feature
1. Plan component structure
2. Add state management
3. Implement UI components
4. Add CSS styling
5. Test edge cases
6. Update documentation

### Debugging Tips
1. Check browser console for logs
2. Inspect localStorage in DevTools
3. Use React DevTools for state inspection
4. Check network tab if using APIs
5. Test with different flow sizes

---

**Last Updated:** November 2024
**Version:** 2.0.0
