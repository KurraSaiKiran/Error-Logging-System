# Error Logging System

A comprehensive error logging system built with the MERN stack (MySQL, Express, React, Node.js) to capture, store, and visualize application errors.

## Features

- Log errors with different severity levels (ERROR, WARN, INFO)
- Filter logs by error level and date range
- View detailed error information including stack traces
- Manual error logging capability
- Test error generation

## Screenshots

### Database logs
![Database logs](./screenshots/db_logs.png)

### Application Interface
![Application Interface](./screenshots/app_interface.png)

## Technologies Used

- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Additional Libraries**: 
  - axios for API requests
  - mysql2 for database connection
  - cors for cross-origin resource sharing

## Setup Instructions

### Prerequisites
- Node.js and npm
- MySQL Server

### Database Setup
```sql
CREATE DATABASE error_logs_db;
USE error_logs_db;

CREATE TABLE logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message TEXT NOT NULL,
  stack TEXT,
  level VARCHAR(20) NOT NULL,
  route VARCHAR(255),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Backend Setup
1. Navigate to the project folder
2. Install dependencies: `npm install`
3. Configure your MySQL connection in `app.js`
4. Start the server: `npm start` or `node app.js`

### Frontend Setup
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the React app: `npm start`

## API Endpoints

- `GET /api/error-logs` - Get all error logs
- `GET /api/error-logs/filter` - Get filtered error logs
- `GET /api/error-logs/:id` - Get error log by ID
- `POST /api/error-logs` - Create a new error log

## Assessment Information

This project was created as part of a coding assessment to demonstrate understanding of:
- Backend error handling
- Structured logging
- Basic CRUD operations in a MERN stack
- React state management and component organization

## License

ISC 