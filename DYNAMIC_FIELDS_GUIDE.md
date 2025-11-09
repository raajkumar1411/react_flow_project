# Dynamic Fields Feature - Guide

## Overview
The Dynamic Fields feature allows you to add custom key-value pairs to **API nodes** and **Database nodes** without having to create a custom node type. This is perfect for adding extra configuration options on-the-fly.

## What Are Dynamic Fields?

Dynamic fields are custom key-value pairs that you can add to any API or Database node configuration. They're useful for:
- Extra API parameters (timeout, retry count, rate limit)
- Database connection options (SSL, pool size, connection timeout)
- Custom headers or metadata
- Environment-specific settings
- Any configuration not covered by standard fields

## How to Use Dynamic Fields

### For API Nodes

1. **Create or Edit an API Node**
   - Drag an API node to the canvas
   - Click on it to open the configuration modal

2. **Fill Standard Fields**
   - API Name
   - API URL
   - HTTP Method (GET, POST, etc.)
   - Headers (JSON format)
   - Request Body (JSON format)
   - Description

3. **Add Custom Fields**
   - Scroll down to the "Custom Fields" section
   - Click the **"+ Add Field"** button
   - Enter the field name (e.g., "timeout", "maxRetries")
   - Enter the field value (e.g., "5000", "3")
   - Click "+ Add Field" again to add more fields

4. **Remove Fields**
   - Click the ✕ button next to any field to remove it

5. **Save**
   - Click "Save" to store all data including custom fields

### For Database Nodes

The process is identical for all database types:

1. **Create or Edit a Database Node**
   - Drag any database node (MongoDB, PostgreSQL, MySQL, etc.) to the canvas
   - Click on it to open the configuration modal

2. **Fill Database-Specific Fields**
   - Connection details (host, port, credentials, etc.)
   - Operation type (Read/Write/Update/Delete)
   - Description

3. **Add Custom Fields**
   - Same process as API nodes
   - Click "+ Add Field" in the Custom Fields section
   - Add configuration options specific to your database

4. **Save**
   - All custom fields are saved with the node

## Use Cases & Examples

### API Node Examples

#### Example 1: Timeout and Retry Configuration
```
Custom Fields:
1. timeout → 5000
2. maxRetries → 3
3. retryDelay → 1000
```

#### Example 2: Rate Limiting
```
Custom Fields:
1. rateLimit → 100
2. rateLimitWindow → 60000
3. rateLimitBurst → 10
```

#### Example 3: Authentication Options
```
Custom Fields:
1. authType → Bearer
2. tokenExpiry → 3600
3. refreshToken → true
```

#### Example 4: Cache Configuration
```
Custom Fields:
1. cacheEnabled → true
2. cacheTTL → 300
3. cacheStrategy → LRU
```

### Database Node Examples

#### Example 1: MongoDB with SSL
```
Standard Fields:
- Connection String: mongodb://localhost:27017
- Database: mydb
- Collection: users

Custom Fields:
1. ssl → true
2. sslValidate → false
3. poolSize → 10
```

#### Example 2: PostgreSQL Connection Pool
```
Standard Fields:
- Host: localhost
- Port: 5432
- Database: mydb

Custom Fields:
1. poolMin → 2
2. poolMax → 10
3. poolIdle → 10000
4. connectionTimeout → 5000
```

#### Example 3: Redis with Cluster
```
Standard Fields:
- Host: localhost
- Port: 6379

Custom Fields:
1. clusterMode → true
2. maxRetriesPerRequest → 3
3. enableReadyCheck → true
4. lazyConnect → false
```

#### Example 4: Neo4j with Encryption
```
Standard Fields:
- URI: bolt://localhost:7687
- Username: neo4j

Custom Fields:
1. encrypted → true
2. trustStrategy → TRUST_ALL_CERTIFICATES
3. maxConnectionPoolSize → 100
4. connectionAcquisitionTimeout → 60000
```

## Best Practices

### Naming Conventions
- Use **camelCase** for field names: `maxRetries`, `connectionTimeout`
- Or use **snake_case**: `max_retries`, `connection_timeout`
- Be consistent within your project
- Use descriptive names: ✅ `cacheEnabled` ❌ `ce`

### Value Types
- **Numbers**: Enter as plain numbers: `5000`, `3`, `100`
- **Booleans**: Use lowercase: `true`, `false`
- **Strings**: Enter as plain text: `Bearer`, `LRU`
- **Complex values**: Use JSON format: `{"key": "value"}`

### Organization
- Group related fields together
- Add common fields first (timeout, retry)
- Add environment-specific fields last
- Keep field count reasonable (5-10 max for readability)

### Documentation
- Use the Description field to explain what custom fields do
- Document custom fields in your team's wiki or README
- Keep a standard template for common configurations

## JSON Export

When you save your flow as JSON, custom fields are included:

```json
{
  "nodes": [{
    "data": {
      "label": "User API",
      "apiDetails": {
        "name": "Get Users",
        "url": "https://api.example.com/users",
        "method": "GET",
        "customFields": [
          { "id": 1699123456789, "key": "timeout", "value": "5000" },
          { "id": 1699123456790, "key": "maxRetries", "value": "3" }
        ]
      }
    }
  }]
}
```

## Comparison: Dynamic Fields vs Custom Nodes

### When to Use Dynamic Fields
✅ Quick one-off configurations
✅ Extra parameters for existing node types
✅ Environment-specific settings
✅ Simple key-value pairs
✅ Rapid prototyping

### When to Use Custom Nodes
✅ Reusable node templates
✅ Complex form layouts
✅ Multiple instances of the same integration
✅ Different field types (dropdowns, radio, checkboxes)
✅ Field validation and requirements

## Tips & Tricks

### Tip 1: Quick Copy-Paste
- Add common configurations once
- Export the flow as JSON
- Copy custom fields to reuse in other nodes

### Tip 2: Environment Variables
```
Custom Fields:
1. envName → production
2. region → us-east-1
3. stage → live
```

### Tip 3: Feature Flags
```
Custom Fields:
1. featureFlag_newUI → true
2. featureFlag_betaAPI → false
3. featureFlag_analytics → true
```

### Tip 4: Monitoring & Logging
```
Custom Fields:
1. logLevel → debug
2. metricsEnabled → true
3. tracingEnabled → true
4. samplingRate → 0.1
```

## Limitations

- No field type enforcement (all values stored as strings)
- No dropdown or predefined options
- No field validation
- No conditional fields
- Fields are not required (all optional)

For advanced features, consider using the Custom Node Builder instead.

## FAQ

**Q: Can I edit custom fields after saving?**
A: Yes! Click on the node again to reopen the modal and edit or remove fields.

**Q: Are custom fields required?**
A: No, all custom fields are optional. The standard fields may have their own requirements.

**Q: Can I have duplicate field names?**
A: Yes, but it's not recommended. Use unique names for clarity.

**Q: How many custom fields can I add?**
A: There's no hard limit, but for UX keep it under 10 fields.

**Q: Are custom fields validated?**
A: No, dynamic fields have no validation. All values are stored as text.

**Q: Can I use special characters in field names?**
A: Yes, but stick to alphanumeric characters and underscores for best compatibility.

**Q: Do custom fields work with the JSON export?**
A: Yes! All custom fields are included in the exported JSON.

**Q: Can I add custom fields to Begin/End nodes?**
A: Currently no, only API and Database nodes support custom fields.

**Q: Can I add custom fields to Custom Nodes?**
A: Custom nodes have their own field system. Use the Custom Node Builder to define fields.

## Troubleshooting

**Issue: Custom fields not saving**
Solution: Make sure you clicked "Save" not "Cancel"

**Issue: Fields disappeared after reopening**
Solution: Check that you saved the node before closing the modal

**Issue: Can't add more fields**
Solution: Make sure you're clicking the "+ Add Field" button in the Custom Fields section

**Issue: Value not showing correctly**
Solution: Check for special characters. Use JSON format for complex values.

## Related Documentation

- [CUSTOM_NODES_GUIDE.md](./CUSTOM_NODES_GUIDE.md) - For creating custom node types
- [FEATURES.md](./FEATURES.md) - Overview of all features
- [QUICK_START.md](./QUICK_START.md) - Getting started guide

---

**Ready to add custom fields?** Try it now at http://localhost:5173/ 🚀
