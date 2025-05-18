import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Error logs API
export const fetchErrorLogs = async () => {
  try {
    const response = await api.get('/api/error-logs');
    return response.data;
  } catch (error) {
    console.error('Error fetching logs:', error);
    throw error;
  }
};

export const fetchFilteredLogs = async (level, startDate, endDate) => {
  try {
    let url = '/api/error-logs/filter?';
    const params = [];
    
    if (level) params.push(`level=${level}`);
    if (startDate) params.push(`startDate=${startDate}`);
    if (endDate) params.push(`endDate=${endDate}`);
    
    url += params.join('&');
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered logs:', error);
    throw error;
  }
};

export const fetchLogById = async (id) => {
  try {
    const response = await api.get(`/api/error-logs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching log ${id}:`, error);
    throw error;
  }
};

export const createManualLog = async (logData) => {
  try {
    const response = await api.post('/api/error-logs', logData);
    return response.data;
  } catch (error) {
    console.error('Error creating log:', error);
    throw error;
  }
};

export const createTestError = async () => {
  try {
    await api.get('/test-error');
  } catch (error) {
    console.error('Test error created');
    // We expect an error, so just return true
    return true;
  }
}; 