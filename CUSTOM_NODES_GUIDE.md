# Custom Node Builder - Complete Guide

## Overview
The Custom Node Builder allows you to create your own node types with personalized forms and fields. This feature gives you complete flexibility to design nodes for any use case - payment gateways, email services, webhooks, or any custom integration.

## Features

### 1. Visual Node Designer
- **Custom Name**: Give your node a meaningful name
- **Icon Picker**: Choose from 16 built-in icons or enter your own emoji
- **Color Selector**: Pick a unique color for your node type
- **Unlimited Fields**: Add as many form fields as you need

### 2. Supported Field Types

#### Input Fields
- **Text Input**: Single-line text (e.g., API Key, Username)
- **Text Area**: Multi-line text (e.g., Description, Notes)
- **Number**: Numeric values (e.g., Port, Timeout)
- **Email**: Email addresses with validation
- **URL**: Web addresses with validation
- **Password**: Sensitive data (hidden input)

#### Date & Time
- **Date**: Date picker
- **Time**: Time picker

#### Selection Fields
- **Dropdown (Select)**: Choose one option from a list
- **Radio Buttons**: Single choice with visible options
- **Checkbox**: Boolean yes/no option

#### Other
- **File Upload**: File selection field

### 3. Field Configuration
For each field, you can configure:
- **Label**: Display name for the field
- **Field Type**: Type of input control
- **Placeholder**: Helper text shown in empty fields
- **Required**: Make the field mandatory
- **Options**: (For dropdown/radio) Define available choices

## How to Use

### Step 1: Create a Custom Node Type

1. Click the **"+ Create Custom Node"** button at the bottom of the sidebar
2. The Custom Node Builder modal will open

### Step 2: Configure Node Appearance

1. **Enter Node Name**: e.g., "Payment Gateway", "Email Service"
2. **Select Icon**:
   - Click any icon from the grid
   - Or type your own emoji in the input field
3. **Choose Color**: Use the color picker to select a brand color

### Step 3: Add Form Fields

1. Click **"+ Add Field"** to create a new field
2. For each field:
   - Enter a **Field Label** (e.g., "API Key", "Merchant ID")
   - Choose a **Field Type** from the dropdown
   - Add a **Placeholder** text (optional)
   - Check **"Required field"** if needed

3. **For Dropdown/Radio fields**:
   - Click "+ Add Option" to add choices
   - Enter option values
   - Remove options with the × button

4. **Remove unwanted fields** using the × button in the field header

### Step 4: Save Your Custom Node

1. Review all fields
2. Click **"Create Node Type"**
3. Your new node type appears in the sidebar under "Custom Nodes"

### Step 5: Use Your Custom Node

1. **Drag** the custom node from the sidebar to the canvas
2. **Click** the node to open the configuration form
3. **Fill in** all the fields you defined
4. Click **"Save"** to store the data
5. A green checkmark (✓) appears on configured nodes

## Example Use Cases

### Example 1: Payment Gateway Node

**Node Configuration:**
- Name: "Stripe Payment"
- Icon: 💳
- Color: #635BFF (Stripe purple)

**Fields:**
1. API Key (Text, Required)
2. Secret Key (Password, Required)
3. Currency (Dropdown: USD, EUR, GBP)
4. Amount (Number, Required)
5. Description (Text Area)
6. Test Mode (Checkbox)

### Example 2: Email Service Node

**Node Configuration:**
- Name: "SendGrid Email"
- Icon: ✉️
- Color: #1A82E2

**Fields:**
1. API Key (Text, Required)
2. From Email (Email, Required)
3. To Email (Email, Required)
4. Subject (Text, Required)
5. Body (Text Area, Required)
6. Template ID (Text)
7. Priority (Radio: High, Normal, Low)

### Example 3: Webhook Node

**Node Configuration:**
- Name: "Webhook Trigger"
- Icon: 🔔
- Color: #FF6B6B

**Fields:**
1. Webhook URL (URL, Required)
2. Method (Dropdown: POST, PUT, PATCH)
3. Headers (Text Area)
4. Payload (Text Area)
5. Timeout (Number)
6. Retry Count (Number)

### Example 4: File Processing Node

**Node Configuration:**
- Name: "File Processor"
- Icon: 📁
- Color: #4ECDC4

**Fields:**
1. Input File (File, Required)
2. Processing Type (Radio: Resize, Compress, Convert)
3. Output Format (Dropdown: PNG, JPEG, PDF)
4. Quality (Number)
5. Delete Original (Checkbox)

## Tips & Best Practices

### Naming Convention
- Use clear, descriptive names
- Include the service/integration name
- Example: "Slack Notification", "AWS S3 Upload"

### Icon Selection
- Choose icons that represent the function
- Payment: 💳, 💰
- Email: ✉️, 📧
- Database: 💾, 🗄️
- API: 🔌, 🌐
- Notification: 🔔, 📢

### Color Coding
- Use brand colors for specific services
- Group related nodes with similar colors
- Maintain contrast for readability

### Field Organization
- Put required fields first
- Group related fields together
- Use descriptive labels
- Add helpful placeholders

### Field Types
- Use **Password** for sensitive data (API keys, tokens)
- Use **Dropdown** when options are fixed (3-10 choices)
- Use **Radio** when showing all options is helpful
- Use **Text Area** for long text (JSON, descriptions)
- Use **Number** with validation for numeric values

## Advanced Features

### Validation
- Required fields are validated before saving
- Email and URL fields have built-in validation
- Number fields only accept numeric values

### Data Storage
- All custom node data is stored in the node's `customData` property
- Data persists when saving flow as JSON
- Each node instance can have different values

### JSON Export
When you save your flow as JSON, custom nodes include:
```json
{
  "nodes": [{
    "data": {
      "label": "Stripe Payment",
      "customNodeId": "custom_1699123456789",
      "color": "#635BFF",
      "icon": "💳",
      "customData": {
        "apiKey": "sk_test_...",
        "currency": "USD",
        "amount": "100"
      }
    }
  }]
}
```

## Troubleshooting

### Issue: Can't see custom nodes in sidebar
**Solution**: Make sure you clicked "Create Node Type" after designing your node

### Issue: Form doesn't save
**Solution**: Check if all required fields are filled in

### Issue: Options not showing in dropdown
**Solution**: Make sure you added options and each has a value

### Issue: Node color not applying
**Solution**: The color is stored when you create the node definition. Existing nodes won't change color.

## Keyboard Shortcuts

- **Enter**: Submit form (when in text inputs)
- **Escape**: Close modal
- **Tab**: Navigate between fields

## Limitations

- Maximum recommended fields per node: 20 (for UX)
- File upload stores filename only (not actual file)
- Custom nodes are session-based (clear on page refresh)*

*Future enhancement: Save custom node definitions to localStorage

## Future Enhancements

Planned features:
- [ ] Save custom node definitions to browser storage
- [ ] Export/Import custom node templates
- [ ] Field validation rules (regex, min/max)
- [ ] Conditional fields (show/hide based on other fields)
- [ ] Field dependencies
- [ ] Custom field types
- [ ] Node templates library
- [ ] Duplicate existing custom nodes

## Technical Details

### Components
- **CustomNodeBuilder.jsx**: Modal for creating node definitions
- **CustomNodeFormModal.jsx**: Modal for filling node data
- **CustomNode.jsx**: Renders nodes with custom styling
- **Sidebar.jsx**: Displays custom nodes list

### Data Structure

**Custom Node Definition:**
```javascript
{
  id: "custom_1699123456789",
  name: "Payment Gateway",
  icon: "💳",
  color: "#635BFF",
  fields: [
    {
      id: 1699123456790,
      label: "API Key",
      fieldType: "text",
      placeholder: "Enter your API key",
      required: true
    }
  ]
}
```

**Node Instance Data:**
```javascript
{
  customNodeId: "custom_1699123456789",
  customData: {
    1699123456790: "sk_test_abc123"
  }
}
```

## Support

For issues or feature requests, please refer to the main project documentation or create an issue in the repository.

---

**Happy Building!** 🚀
