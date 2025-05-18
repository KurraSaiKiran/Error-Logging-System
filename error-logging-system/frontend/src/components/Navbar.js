 import React from 'react';
import { createTestError } from '../services/api';

function Navbar({ onCreateLog }) {
  const handleTestError = async () => {
    try {
      await createTestError();
      alert('Test error created! Check the logs.');
    } catch (error) {
      console.error('Failed to create test error:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">Error Logging System</span>
        <div className="d-flex">
          <button 
            className="btn btn-outline-danger me-2" 
            onClick={handleTestError}
          >
            Generate Test Error
          </button>
          <button 
            className="btn btn-outline-success" 
            onClick={onCreateLog}
          >
            Log Manual Error
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 