# Testing Guide - Debug Empty API Details

## Problem
You're exporting JSON but `apiDetails` is `null` even after configuring nodes.

## Step-by-Step Debug Process

### Step 1: Open Browser Console
1. Open http://localhost:5173/
2. Press **F12** (or Right-click → Inspect)
3. Go to **Console** tab
4. Keep this open while testing

### Step 2: Create New Flow
1. Click "New Flow" button
2. You should land on the flow editor
3. Check console - should be no errors

### Step 3: Add API Node
1. Drag the **API** node from sidebar to canvas
2. Release to drop it
3. Check console - should see node created

### Step 4: Click the API Node
1. Click on the API node you just added
2. **Watch the console** - You should see:
   ```
   Node clicked: {id: "node_1", label: "API", nodeType: "api", ...}
   Found node: {id: "node_1", type: "custom", ...}
   ```
3. **The API Modal should open**
   - If modal doesn't open → **STOP HERE** - See "Modal Not Opening" section below
   - If modal opens → Continue to Step 5

### Step 5: Fill in API Details
1. In the opened modal, fill in:
   - **API Name**: `Test API`
   - **API URL**: `https://api.example.com/test`
   - **Method**: Select `GET`
   - **Description**: `This is a test`
2. Optional: Add a custom field
   - Click "+ Add Field"
   - Key: `timeout`
   - Value: `5000`

### Step 6: Save the Data
1. Click the **"Save"** button (blue button, bottom right)
2. Modal should close
3. Check console for any errors
4. The node label should change to "Test API"

### Step 7: Verify Data in State
1. Click the API node again
2. Modal should reopen
3. **Verify all your data is still there**:
   - API Name: `Test API`
   - URL: `https://api.example.com/test`
   - Method: `GET`
   - Description: `This is a test`
   - Custom field: `timeout → 5000`
4. If data is there → Good! Continue
5. If data is missing → See "Data Not Persisting" section

### Step 8: Export JSON
1. Close the modal
2. Click "💾 Export JSON" button (top right)
3. JSON file downloads
4. Open the JSON file
5. Find the API node (it will have `"nodeType": "api"`)
6. Check the `apiDetails` field

**Expected Result**:
```json
{
  "id": "node_1",
  "data": {
    "label": "Test API",
    "nodeType": "api",
    "apiDetails": {
      "name": "Test API",
      "url": "https://api.example.com/test",
      "method": "GET",
      "headers": "",
      "body": "",
      "description": "This is a test",
      "customFields": [
        {
          "id": 1699123456789,
          "key": "timeout",
          "value": "5000"
        }
      ]
    }
  }
}
```

**Actual Result** (what you're getting):
```json
{
  "id": "node_1",
  "data": {
    "label": "API",
    "apiDetails": null
  }
}
```

---

## Troubleshooting

### Issue: Modal Not Opening

#### Symptoms:
- Click node, nothing happens
- No modal appears
- Console shows "Node clicked" but modal doesn't open

#### Debug Steps:
1. **Check console logs**:
   ```
   Node clicked: {nodeType: "api", ...}  ← Should see this
   Found node: {...}                      ← Should see this
   ```

2. **If you DON'T see these logs**:
   - The `onNodeClick` handler is missing
   - Go to browser console and type:
     ```javascript
     // This should show your nodes
     console.log('Checking nodes...');
     ```
   - Refresh the page (Cmd+R or Ctrl+R)
   - Try again

3. **If you see the logs but modal doesn't open**:
   - Check for React errors in console (red text)
   - Look for errors mentioning "Modal" or "useState"
   - Take a screenshot of console and share

### Issue: Data Not Persisting

#### Symptoms:
- You fill in the form
- Click Save
- Reopen modal
- Data is gone

#### Debug Steps:
1. Open browser console
2. Click API node → Modal opens
3. Fill in data
4. **Before clicking Save**, type in console:
   ```javascript
   console.log('Before save');
   ```
5. Click **Save** button
6. In console, type:
   ```javascript
   console.log('After save');
   ```
7. Look for any errors between "Before save" and "After save"

#### Possible Causes:
- `handleSaveApiDetails` not being called
- `selectedNode` is null
- React state not updating

### Issue: Export Shows Old Data

#### Symptoms:
- Modal shows correct data
- But exported JSON shows null

#### Test:
1. Fill in API node data
2. Save and close modal
3. Open browser console
4. Type this command:
   ```javascript
   // This shows the current state
   localStorage.getItem('reactFlows')
   ```
5. Check if your data is in the output

---

## Console Commands for Debugging

### Check Current Nodes
```javascript
// Open console and type:
console.log('Current nodes:', window.reactFlowNodes);
```

### Check localStorage
```javascript
// See what's saved
const flows = JSON.parse(localStorage.getItem('reactFlows') || '[]');
console.log('Saved flows:', flows);
```

### Clear All Data
```javascript
// Start fresh (WARNING: Deletes all flows!)
localStorage.clear();
location.reload();
```

### Check if Modal Components Exist
```javascript
// Should return true
console.log('ApiModal exists:', !!document.querySelector('.modal'));
```

---

## Expected Console Output (Working Correctly)

When everything works, you should see:

```
# When clicking API node:
Node clicked: {id: "node_1", nodeType: "api", icon: "🔌", ...}
Found node: {id: "node_1", type: "custom", position: {...}, data: {...}}

# When saving:
(Modal closes, no errors)

# When exporting:
(File downloads, no errors)
```

---

## What to Share if Still Broken

If it's still not working after these steps, please share:

1. **Screenshot of browser console** (with any red errors)
2. **What you see** when you click the API node
3. **Whether modal opens** or not
4. **Console output** after typing:
   ```javascript
   const flows = JSON.parse(localStorage.getItem('reactFlows') || '[]');
   console.log('Flows:', flows);
   console.log('First flow nodes:', flows[0]?.nodes);
   ```

---

## Quick Fix: Clear and Restart

If you're completely stuck:

1. Open browser console (F12)
2. Type:
   ```javascript
   localStorage.clear();
   ```
3. Press Enter
4. Refresh page (Cmd+R or Ctrl+R)
5. Try creating a new flow from scratch
6. Follow the steps above again

---

## Video Walkthrough

**Record yourself doing this** (if possible):

1. Open http://localhost:5173/
2. Click "New Flow"
3. Drag API node to canvas
4. Click the node
5. Show if modal opens
6. Fill in form
7. Click Save
8. Export JSON
9. Show the JSON file content

This will help me see exactly where it's breaking!

---

## Expected Behavior Summary

✅ Click node → Console logs appear
✅ Click node → Modal opens
✅ Fill form → Data saves to state
✅ Reopen modal → Data still there
✅ Export JSON → Data in JSON file
✅ Save flow → Data persists in localStorage
✅ Reload page → Data still there after load

❌ Your current behavior → API details is null in export

---

**Next Step**: Follow the Step-by-Step Debug Process above and let me know at which step it fails!
