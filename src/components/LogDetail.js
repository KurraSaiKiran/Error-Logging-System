import React from 'react';

function LogDetail({ log, onBack }) {
  const getLevelBadgeClass = (level) => {
    switch (level.toLowerCase()) {
      case 'error':
        return 'bg-danger';
      case 'warning':
        return 'bg-warning text-dark';
      case 'info':
        return 'bg-info text-dark';
      default:
        return 'bg-secondary';
    }
  };
  
  return (
    <div className="card">
      <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        <h5 className="m-0">Error Log Details</h5>
        <button 
          className="btn btn-sm btn-outline-light"
          onClick={onBack}
        >
          Back to List
        </button>
      </div>
      <div className="card-body">
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-3">
            <h6>ID: {log.id}</h6>
            <span className={`badge ${getLevelBadgeClass(log.level)}`}>
              {log.level}
            </span>
          </div>
          <p className="text-muted mb-1">
            <strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}
          </p>
          <p className="text-muted mb-3">
            <strong>Route:</strong> {log.route || '-'}
          </p>
        </div>
        
        <div className="mb-4">
          <h6>Error Message</h6>
          <div className="p-3 bg-light rounded">
            {log.message}
          </div>
        </div>
        
        {log.stack && (
          <div>
            <h6>Stack Trace</h6>
            <pre className="p-3 bg-light rounded" style={{ 
              whiteSpace: 'pre-wrap', 
              overflowX: 'auto', 
              maxHeight: '300px'
            }}>
              {log.stack}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogDetail; 