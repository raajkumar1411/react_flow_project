# Quick Start Guide - Custom Node Builder

## 🚀 Get Started in 5 Minutes

### What You'll Learn
- How to create a custom node type
- How to use it in your flow
- How to save your work

---

## Step-by-Step Tutorial

### Example: Creating a "Slack Notification" Node

#### Step 1: Open Custom Node Builder
1. Look at the sidebar on the left
2. Scroll to the bottom
3. Click the **"+ Create Custom Node"** button

#### Step 2: Name Your Node
```
Node Name: Slack Notification
```

#### Step 3: Choose Icon and Color
- **Icon**: Click on 📢 or type any emoji you like
- **Color**: Pick a nice color (try #4A154B for Slack purple)

#### Step 4: Add Your First Field
1. Click **"+ Add Field"**
2. Fill in:
   - **Field Label**: `Webhook URL`
   - **Field Type**: Select `URL`
   - **Placeholder**: `https://hooks.slack.com/services/...`
   - **✓ Required field**: Check this box

#### Step 5: Add More Fields
Repeat for each field:

**Field 2:**
- Label: `Channel`
- Type: `Text Input`
- Placeholder: `#general`
- Required: ✓

**Field 3:**
- Label: `Message`
- Type: `Text Area`
- Placeholder: `Your notification message...`
- Required: ✓

**Field 4:**
- Label: `Priority`
- Type: `Radio Buttons`
- Options:
  - Click "+ Add Option" three times
  - Enter: `High`, `Normal`, `Low`
- Required: ✗

**Field 5:**
- Label: `Include Timestamp`
- Type: `Checkbox`
- Placeholder: `Add timestamp to message`
- Required: ✗

#### Step 6: Create the Node
1. Review all your fields
2. Click **"Create Node Type"**
3. The modal closes

#### Step 7: Use Your Custom Node
1. Look in the sidebar under **"Custom Nodes"**
2. You'll see your "Slack Notification" node with the 📢 icon
3. **Drag** it onto the canvas
4. **Click** on the node to configure it

#### Step 8: Fill in the Form
The form will show all the fields you created:
```
Webhook URL: https://hooks.slack.com/services/YOUR/WEBHOOK/HERE
Channel: #alerts
Message: Deployment completed successfully!
Priority: ○ High  ● Normal  ○ Low
☑ Include Timestamp
```

Click **"Save"** - Done! ✓

#### Step 9: Build Your Flow
1. Add a **Begin** node
2. Connect it to your **Slack Notification** node
3. Add more nodes as needed
4. Connect them together

#### Step 10: Save Everything
Click **"💾 Save Flow as JSON"** at the top right to download your complete flow!

---

## More Examples

### Email Node
```
Name: Email Service
Icon: ✉️
Color: #1A82E2

Fields:
1. From Email (Email, required)
2. To Email (Email, required)
3. Subject (Text, required)
4. Body (Text Area, required)
5. Priority (Dropdown: High, Normal, Low)
```

### Payment Node
```
Name: Payment Gateway
Icon: 💳
Color: #00A86B

Fields:
1. API Key (Password, required)
2. Amount (Number, required)
3. Currency (Dropdown: USD, EUR, GBP)
4. Description (Text Area)
5. Test Mode (Checkbox)
```

### Webhook Node
```
Name: Webhook
Icon: 🔔
Color: #FF6B6B

Fields:
1. URL (URL, required)
2. Method (Radio: POST, PUT, PATCH)
3. Headers (Text Area)
4. Timeout (Number)
```

---

## Tips for Success

### ✅ Do's
- Use clear, descriptive field names
- Mark important fields as required
- Add helpful placeholder text
- Choose recognizable icons
- Use brand colors when possible

### ❌ Don'ts
- Don't make too many fields required (overwhelming)
- Don't use confusing abbreviations
- Don't skip placeholders (they help users)
- Don't use similar colors for different node types

---

## Troubleshooting

**Q: I don't see my custom node in the sidebar**
A: Make sure you clicked "Create Node Type" at the end

**Q: The form won't save**
A: Check that all required fields (marked with *) are filled in

**Q: Can I edit a custom node type after creating it?**
A: Currently no, but you can create a new one. This feature is coming soon!

**Q: Where is my data stored?**
A: Custom node definitions are stored in memory. Export your flow as JSON to save everything!

---

## Next Steps

1. ✅ Create your first custom node
2. ✅ Use it in a flow
3. ✅ Save your flow as JSON
4. 📖 Read [CUSTOM_NODES_GUIDE.md](./CUSTOM_NODES_GUIDE.md) for advanced features
5. 🚀 Build amazing workflows!

---

**Need Help?** Check out the full documentation in CUSTOM_NODES_GUIDE.md

**Happy Building!** 🎉
