const express = require('express');
const router = express.Router();
const errorLogsController = require('../controllers/errorLogsController');

// GET all error logs
router.get('/', errorLogsController.getAllLogs);

// GET filtered error logs
router.get('/filter', errorLogsController.getFilteredLogs);

// GET a single error log by ID
router.get('/:id', errorLogsController.getLogById);

// POST a new manual error log
router.post('/', errorLogsController.createManualLog);

module.exports = router; 