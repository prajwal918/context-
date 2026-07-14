const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.use(express.json());

// Main entrypoint with graceful error handling
app.get('/api/health', async (req, res) => {
    try {
        // Simulated business logic
        res.status(200).json({ status: 'healthy', timestamp: new Date() });
    } catch (error) {
        console.error('Error in health check:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Graceful error handling for the entire process
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});
