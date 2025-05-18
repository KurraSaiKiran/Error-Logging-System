const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function setupDatabase() {
  // Create connection without database selected
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} created or already exists`);
    
    // Use the database
    await connection.query(`USE ${process.env.DB_NAME}`);
    
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
    
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

// Run the setup if this file is executed directly
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase }; 