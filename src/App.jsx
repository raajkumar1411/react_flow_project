/**
 * App Component - Main Application Router
 *
 * Purpose: Root component that handles routing between Dashboard and FlowEditor
 *
 * Routes:
 * - / : Dashboard (home page with all flows)
 * - /flow/:flowId : Flow Editor (create/edit specific flow)
 *
 * This component was refactored to support multiple flows
 * The original flow editor logic is now in FlowEditor.jsx
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import FlowEditor from './components/FlowEditor';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Route - Shows all flows */}
        <Route path="/" element={<Dashboard />} />

        {/* Flow Editor Route - Create/Edit flow */}
        <Route path="/flow/:flowId" element={<FlowEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
