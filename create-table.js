const mysql = require('mysql2/promise');

async function createTable() {
  try {
    // Create connection to the database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root', // Replace with your MySQL username
      password: 'password', // Replace with your MySQL password
      database: 'error_logs_db'
    });

    console.log('Connected to MySQL database');

    // Create error_logs table
    await connection.execute(`
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

    await connection.end();
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

createTable(); 