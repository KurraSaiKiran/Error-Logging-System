const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function main() {
  console.log('Starting database setup...');
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_NAME:', process.env.DB_NAME);

  try {
    // Create connection to the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Connected to MySQL database');

    // Create error_logs table
    await connection.query(`
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

main(); 