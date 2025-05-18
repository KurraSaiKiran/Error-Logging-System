import React, { useState, useEffect } from 'react';
import { fetchErrorLogs, fetchFilteredLogs } from '../services/api';

function ErrorLogList({ filterParams, onViewLog }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        setLoading(true);
        let data;
        
        console.log('Fetching logs with filters:', filterParams);
        
        if (filterParams.level || filterParams.startDate || filterParams.endDate) {
          data = await fetchFilteredLogs(
            filterParams.level,
            filterParams.startDate,
            filterParams.endDate
          );
        } else {
          data = await fetchErrorLogs();
        }
        
        console.log('Logs received:', data);
        setLogs(data);
        setError(null);
      } catch (err) {
        console.error('Error details:', err);
        setError('Failed to load error logs. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadLogs();
  }, [filterParams]);

  const getLevelBadgeClass = (level) => {
    switch (level?.toUpperCase()) {
      case 'ERROR':
        return 'bg-danger';
      case 'WARN':
        return 'bg-warning text-dark';
      case 'INFO':
        return 'bg-info text-dark';
      default:
        return 'bg-secondary';
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No error logs found. Try changing your filters or create a new error log.
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header bg-dark text-white">
        <h5 className="m-0">Error Logs</h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Level</th>
                <th>Message</th>
                <th>Route</th>
                <th>Timestamp</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>
                    <span className={`badge ${getLevelBadgeClass(log.level)}`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="text-truncate" style={{ maxWidth: '300px' }}>
                    {log.message}
                  </td>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    {log.route || '-'}
                  </td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => onViewLog(log)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ErrorLogList; 