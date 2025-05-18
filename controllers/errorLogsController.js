const { pool } = require('../server');

/**
 * Get all error logs
 */
const getAllLogs = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM error_logs ORDER BY timestamp DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

/**
 * Get filtered error logs by level, date range, or both
 */
const getFilteredLogs = async (req, res, next) => {
  try {
    const { level, startDate, endDate } = req.query;
    
    let sql = 'SELECT * FROM error_logs WHERE 1=1';
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
    next(error);
  }
};

/**
 * Get a single error log by ID
 */
const getLogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM error_logs WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Error log not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a manual error log
 */
const createManualLog = async (req, res, next) => {
  try {
    const { level, message, stack, route } = req.body;
    
    if (!level || !message) {
      return res.status(400).json({ message: 'Level and message are required' });
    }
    
    const sql = `
      INSERT INTO error_logs (level, message, stack, route)
      VALUES (?, ?, ?, ?)
    `;
    
    const [result] = await pool.execute(sql, [level, message, stack || null, route || null]);
    
    res.status(201).json({
      message: 'Error log created successfully',
      id: result.insertId
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllLogs,
  getFilteredLogs,
  getLogById,
  createManualLog
}; 