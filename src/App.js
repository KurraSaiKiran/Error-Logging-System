import React, { useState } from 'react';
import './App.css';
import ErrorLogList from './components/ErrorLogList';
import ErrorFilter from './components/ErrorFilter';
import LogDetail from './components/LogDetail';
import CreateLog from './components/CreateLog';
import Navbar from './components/Navbar';

function App() {
  const [selectedLog, setSelectedLog] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filterParams, setFilterParams] = useState({
    level: '',
    startDate: '',
    endDate: ''
  });

  const handleViewLog = (log) => {
    setSelectedLog(log);
    setShowCreateForm(false);
  };

  const handleBackToList = () => {
    setSelectedLog(null);
  };

  const handleShowCreateForm = () => {
    setSelectedLog(null);
    setShowCreateForm(true);
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
  };

  const handleFilterChange = (filters) => {
    setFilterParams(filters);
  };

  return (
    <div className="App">
      <Navbar 
        onCreateLog={handleShowCreateForm}
      />
      
      <div className="container mt-4">
        {!selectedLog && !showCreateForm ? (
          <>
            <ErrorFilter 
              onFilterChange={handleFilterChange}
            />
            <ErrorLogList 
              filterParams={filterParams}
              onViewLog={handleViewLog} 
            />
          </>
        ) : selectedLog ? (
          <LogDetail 
            log={selectedLog} 
            onBack={handleBackToList} 
          />
        ) : (
          <CreateLog onClose={handleCloseCreateForm} />
        )}
      </div>
    </div>
  );
}

export default App; 