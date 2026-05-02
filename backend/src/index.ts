import app from './app';
import { env } from './config/env';

const server = app.listen(env.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${env.PORT} in ${env.NODE_ENV} mode`);
});

// Handle Uncaught Exceptions (Synchronous programming errors)
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message, err.stack);
    process.exit(1);
});

// Graceful Shutdown for Unhandled Rejections (e.g. database disconnects prematurely)
process.on('unhandledRejection', (err: Error) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down gracefully...');
    console.error(err.name, err.message, err.stack);
    server.close(() => {
        process.exit(1);
    });
});

// Signal termination handling (for Docker/K8s/PM2 process stops)
process.on('SIGTERM', () => {
    console.info('👋 SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
