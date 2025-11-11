# Dashboard Feature - User Guide

## Overview

The Dashboard is your central hub for managing all your workflow creations. Think of it as your project home where you can create, view, edit, and delete flows.

---

## Getting Started

### Accessing the Dashboard

When you open the application, you'll land on the Dashboard at `http://localhost:5173/`

### Dashboard Components

#### 1. Header Section
- **Title**: "🚀 Flow Dashboard"
- **Subtitle**: Brief description
- **New Flow Button**: Green button to create a new flow

#### 2. Statistics Cards
Three cards showing:
- **Total Flows**: Number of flows you've created
- **Total Nodes**: Sum of all nodes across all flows
- **Updated Today**: Flows modified today

#### 3. Flows Grid
- Displays all your flows as cards
- Grid layout (responsive)
- Empty state if no flows exist

---

## Creating a New Flow

### Method 1: From Empty Dashboard
1. Click **"Create Your First Flow"** button
2. Automatically navigates to flow editor
3. Start building your workflow

### Method 2: From Dashboard with Existing Flows
1. Click **"+ New Flow"** button (top right)
2. Opens flow editor with blank canvas
3. Unique ID automatically generated

---

## Understanding Flow Cards

Each flow card displays:

### Header
- **Flow Name**: Clickable title (default: "Untitled Flow")
- **Delete Button**: 🗑️ icon (top right)

### Statistics
- 📦 **Nodes**: Number of nodes in the flow
- 🔗 **Connections**: Number of edges/connections

### Node Type Badges
Small colored badges showing breakdown:
- `api: 3` - 3 API nodes
- `begin: 1` - 1 Begin node
- `mongodb: 2` - 2 MongoDB nodes

### Footer
- **Updated**: Relative time ("Today", "2 days ago", etc.)
- **Edit Hint**: "Click to edit →"

---

## Editing an Existing Flow

### To Edit:
1. Click anywhere on the flow card
2. Navigates to flow editor
3. Make your changes
4. Click **"Save & Exit"** to return to dashboard

### What You Can Edit:
- Flow name
- Add/remove nodes
- Configure node details
- Add/remove connections
- Create custom nodes

---

## Deleting a Flow

### Steps:
1. Click the **🗑️** delete button on flow card
2. Confirmation dialog appears
3. Confirm deletion
4. Flow removed from dashboard and localStorage

### Important Notes:
- ⚠️ **Deletion is permanent**
- No undo functionality
- Exported JSON files are not affected
- Consider exporting before deleting

---

## Flow Editor Features

### Top Navigation Bar

#### Left Side
- **← Dashboard**: Return to dashboard
  - Shows confirmation if unsaved changes

#### Center
- **Flow Name Input**: Edit flow name inline
  - Click to type new name
  - Updates automatically

#### Right Side
- **💾 Export JSON**: Download flow as JSON file
- **✓ Save & Exit**: Save to localStorage and return to dashboard

### Working in the Editor

1. **Drag nodes** from left sidebar
2. **Drop onto canvas** to create
3. **Click nodes** to configure
4. **Connect nodes** by dragging from handles
5. **Delete nodes** by hovering and clicking ✕ or pressing Delete key

---

## Data Persistence

### How Flows Are Saved

#### localStorage Key: `'reactFlows'`
```javascript
{
  "reactFlows": [
    {
      "id": "flow_1699123456789",
      "name": "My API Workflow",
      "nodes": [...],
      "edges": [...],
      "customNodeDefinitions": [...],
      "createdAt": "2024-11-04T12:00:00.000Z",
      "updatedAt": "2024-11-04T14:30:00.000Z"
    }
  ]
}
```

### When Data Is Saved
- **Automatically**: When you click "Save & Exit"
- **Manually**: When you click "Export JSON"

### When Data Is Loaded
- **On Dashboard Mount**: All flows loaded from localStorage
- **On Flow Editor Mount**: Specific flow loaded by ID

---

## Best Practices

### Naming Flows
✅ **Do:**
- Use descriptive names: "User Registration Flow"
- Include project name: "Acme Corp - Payment API"
- Add date for versions: "Blog System v2"

❌ **Don't:**
- Leave as "Untitled Flow"
- Use generic names: "Flow 1", "Test"
- Use special characters that break filenames

### Organizing Flows
1. **Create separate flows for different features**
   - One flow per major feature
   - Keep related APIs together

2. **Use consistent naming conventions**
   - Prefix by project: "ProjectX - "
   - Suffix by environment: " - Production"

3. **Regular exports**
   - Export important flows as JSON backups
   - Keep versions in version control

### Performance Tips
1. **Limit flow size**
   - Keep under 50 nodes per flow
   - Split large workflows into multiple flows

2. **Clean up old flows**
   - Delete unused flows regularly
   - Export before deleting for backup

---

## Keyboard Shortcuts

### In Dashboard
| Key | Action |
|-----|--------|
| N | New Flow (if implemented) |

### In Flow Editor
| Key | Action |
|-----|--------|
| Delete / Backspace | Delete selected node |
| Ctrl/Cmd + S | Save flow (if implemented) |
| Esc | Close open modal |

---

## Troubleshooting

### Issue: "Dashboard is blank"
**Solution**: Check browser console for errors. Clear localStorage if corrupt.

### Issue: "Can't create new flow"
**Solution**: Check localStorage quota. Try deleting old flows.

### Issue: "Flow not saving"
**Solution**:
1. Check browser console
2. Verify localStorage is enabled
3. Check storage quota

### Issue: "Lost flow after browser close"
**Solution**: Flows save to localStorage automatically. Check:
1. Did you click "Save & Exit"?
2. Browser localStorage enabled?
3. Private browsing mode? (localStorage clears on close)

### Issue: "Dashboard loads slowly"
**Solution**:
1. Too many flows? Delete unused ones
2. Flows too large? Split into smaller flows
3. Clear browser cache

---

## Advanced Features

### Exporting Flows

#### Individual Flow Export
1. Open flow in editor
2. Click "💾 Export JSON"
3. JSON file downloads automatically

#### Bulk Export (Manual)
1. Open browser DevTools
2. Go to Application → Local Storage
3. Copy `reactFlows` value
4. Save to file manually

### Importing Flows (Future Feature)
Currently not supported. Coming soon!

### Sharing Flows
1. Export flow as JSON
2. Share JSON file with team
3. They can import (when feature available)

---

## Dashboard Statistics

### Understanding Stats

#### Total Flows
- Count of all flows in localStorage
- Includes empty flows

#### Total Nodes
- Sum of nodes across all flows
- All node types counted

#### Updated Today
- Flows modified on current date
- Based on `updatedAt` timestamp

---

## Mobile Experience

### Responsive Design
- Dashboard adapts to screen size
- Cards stack vertically on mobile
- Touch-friendly buttons

### Recommendations
- Desktop/tablet recommended for editing
- Mobile good for viewing flows
- Use landscape mode for better experience

---

## Data Management

### localStorage Limits
- **Typical limit**: 5-10MB
- **Recommendation**: Keep under 5MB
- **Check usage**: Browser DevTools → Application → Storage

### Clearing Data
```javascript
// Clear all flows (caution!)
localStorage.removeItem('reactFlows');

// Or clear everything
localStorage.clear();
```

### Backup Strategy
1. **Weekly exports** of important flows
2. Save JSON files to cloud storage
3. Version control for team flows
4. Test imports regularly

---

## FAQ

**Q: Can I have multiple flows open at once?**
A: No, one flow at a time. Use browser tabs for multiple flows.

**Q: Are flows synced across devices?**
A: No, localStorage is browser-specific. Use Export/Import for sync.

**Q: What happens if I clear browser data?**
A: All flows are deleted. Export regularly!

**Q: Can I rename a flow?**
A: Yes! Click the flow name input in the editor header.

**Q: How many flows can I create?**
A: Limited by localStorage (typically ~100 small flows).

**Q: Can I recover a deleted flow?**
A: No, deletion is permanent. Export before deleting!

**Q: Do flows auto-save?**
A: No, click "Save & Exit" to save changes.

**Q: Can I duplicate a flow?**
A: Export as JSON, then import (when available). Manual for now.

---

## Tips & Tricks

### Productivity Tips
1. **Template flows**: Create empty template flows for common patterns
2. **Naming convention**: Prefix flows by project for easy sorting
3. **Regular cleanup**: Delete test/old flows weekly
4. **Export backups**: Before major changes, export as backup

### Organization Tips
1. **Use descriptive names**: Include purpose in name
2. **Date versioning**: "Feature X - 2024-11-04"
3. **Environment tags**: " - Dev", " - Prod"
4. **Feature grouping**: Keep related flows together

### Performance Tips
1. **Small flows**: Better performance than one huge flow
2. **Delete unused nodes**: Keep flows clean
3. **Export regularly**: Don't rely on localStorage alone
4. **Monitor size**: Check localStorage usage

---

## Next Steps

Now that you understand the Dashboard:

1. ✅ **Create your first flow**
2. ✅ **Explore node types** (API, Database, Custom)
3. ✅ **Save and return** to see your flow card
4. ✅ **Try editing** an existing flow
5. ✅ **Export a flow** as JSON backup

---

**Need Help?** Check [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details or [FEATURES.md](./FEATURES.md) for feature list.

**Happy Flow Building!** 🚀
