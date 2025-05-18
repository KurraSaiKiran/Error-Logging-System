import React, { useState } from 'react';

function ErrorFilter({ onFilterChange }) {
  const [level, setLevel] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ level, startDate, endDate });
  };

  const handleReset = () => {
    setLevel('');
    setStartDate('');
    setEndDate('');
    onFilterChange({ level: '', startDate: '', endDate: '' });
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="m-0">Filter Error Logs</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Error Level</label>
              <select 
                className="form-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="ERROR">Error</option>
                <option value="WARN">Warning</option>
                <option value="INFO">Info</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Start Date</label>
              <input 
                type="date" 
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">End Date</label>
              <input 
                type="date" 
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button 
              type="button" 
              className="btn btn-secondary me-2"
              onClick={handleReset}
            >
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ErrorFilter; 