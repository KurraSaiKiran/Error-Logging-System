const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const errorLogRoutes = require('./routes/errorLogs');
const errorLogger = require('./middlewares/errorLogger');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Database setup function
async function setupDatabase() {
  try {
    // Create error_logs table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS error_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        level VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        stack TEXT,
        route VARCHAR(255),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX (level),
        INDEX (timestamp)
      )
    `);
    console.log('error_logs table created or already exists');
  } catch (error) {
    console.error('Database setup failed:', error);
  }
}

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Error Logging API' });
});

// Test error route
app.get('/test-error', (req, res, next) => {
  try {
    // Simulate an error
    throw new Error('This is a test error');
  } catch (error) {
    error.level = 'warning'; // Set a custom level
    next(error);
  }
});

// Mount error log routes
app.use('/api/error-logs', errorLogRoutes);

// Error handling middleware
app.use(errorLogger);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Setup database tables on startup
  await setupDatabase();
  console.log('Database setup completed');
});

module.exports = { app, pool }; 