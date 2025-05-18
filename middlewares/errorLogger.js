const { pool } = require('../server');

/**
 * Middleware to log errors to the database
 */
const errorLogger = (err, req, res, next) => {
  const logError = async () => {
    try {
      const level = err.level || 'error';
      const message = err.message || 'Unknown error';
      const stack = err.stack || '';
      const route = req.originalUrl || '';
      
      const sql = `
        INSERT INTO error_logs (level, message, stack, route)
        VALUES (?, ?, ?, ?)
      `;
      
      const [result] = await pool.execute(sql, [level, message, stack, route]);
      console.log(`Error logged to database with ID: ${result.insertId}`);
    } catch (dbError) {
      console.error('Failed to log error to database:', dbError);
    }
  };
  
  // Log the error to database
  logError();
  
  // Continue to the next error handler
  next(err);
};

module.exports = errorLogger; 