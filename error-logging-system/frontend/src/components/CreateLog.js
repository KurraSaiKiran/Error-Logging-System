import React, { useState } from 'react';
import { createManualLog } from '../services/api';

function CreateLog({ onClose }) {
  const [formData, setFormData] = useState({
    level: 'ERROR',
    message: '',
    stack: '',
    route: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.message) {
      setError('Error message is required');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      await createManualLog(formData);
      
      setSuccess(true);
      setFormData({
        level: 'ERROR',
        message: '',
        stack: '',
        route: ''
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      setError('Failed to create error log. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        <h5 className="m-0">Create Manual Error Log</h5>
        <button 
          className="btn btn-sm btn-outline-light"
          onClick={onClose}
        >
          Back to List
        </button>
      </div>
      <div className="card-body">
        {success && (
          <div className="alert alert-success" role="alert">
            Error log created successfully!
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Error Level</label>
            <select 
              className="form-select"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            >
              <option value="ERROR">Error</option>
              <option value="WARN">Warning</option>
              <option value="INFO">Info</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Error Message</label>
            <input 
              type="text" 
              className="form-control"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Enter error message"
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Stack Trace (Optional)</label>
            <textarea 
              className="form-control"
              name="stack"
              value={formData.stack}
              onChange={handleChange}
              rows="4"
              placeholder="Enter stack trace information"
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Route (Optional)</label>
            <input 
              type="text" 
              className="form-control"
              name="route"
              value={formData.route}
              onChange={handleChange}
              placeholder="e.g., /api/users"
            />
          </div>
          
          <div className="d-flex justify-content-end">
            <button 
              type="button" 
              className="btn btn-secondary me-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Log'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateLog; 