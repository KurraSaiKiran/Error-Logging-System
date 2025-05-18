const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Saikiran@8639', 
  database: 'error_logs_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Basic routes
app.get('/', (req, res) => {
  res.json({ message: 'Error Logging API is running' });
});

// Test error route
app.get('/test-error', (req, res, next) => {
  try {
    // Simulate an error
    throw new Error('This is a test error');
  } catch (error) {
    error.level = 'warning';
    next(error);
  }
});

// API routes for error logs
app.get('/api/error-logs', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM logs ORDER BY timestamp DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch error logs', error: error.message });
  }
});

// Filter error logs route
app.get('/api/error-logs/filter', async (req, res) => {
  try {
    const { level, startDate, endDate } = req.query;
    
    let sql = 'SELECT * FROM logs WHERE 1=1';
    const params = [];
    
    if (level) {
      sql += ' AND level = ?';
      params.push(level);
    }
    
    if (startDate) {
      sql += ' AND timestamp >= ?';
      params.push(new Date(startDate));
    }
    
    if (endDate) {
      sql += ' AND timestamp <= ?';
      params.push(new Date(endDate));
    }
    
    sql += ' ORDER BY timestamp DESC';
    
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch filtered logs', error: error.message });
  }
});

// Get log by ID route
app.get('/api/error-logs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM logs WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Error log not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch log', error: error.message });
  }
});

app.post('/api/error-logs', async (req, res) => {
  try {
    const { level, message, stack, route } = req.body;
    
    if (!level || !message) {
      return res.status(400).json({ message: 'Level and message are required' });
    }
    
    const [result] = await pool.execute(
      'INSERT INTO logs (level, message, stack, route) VALUES (?, ?, ?, ?)',
      [level, message, stack || null, route || null]
    );
    
    res.status(201).json({ message: 'Error log created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create error log', error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  // Log error to database
  const logError = async () => {
    try {
      const level = err.level || 'error';
      const message = err.message || 'Unknown error';
      const stack = err.stack || '';
      const route = req.originalUrl || '';
      
      await pool.execute(
        'INSERT INTO logs (level, message, stack, route) VALUES (?, ?, ?, ?)',
        [level, message, stack, route]
      );
      
      console.log('Error logged to database');
    } catch (dbError) {
      console.error('Failed to log error to database:', dbError);
    }
  };
  
  logError();
  
  // Send error response
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 