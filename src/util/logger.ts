import winston from 'winston';
import config from '../config/index.js';

const isDevelopment=config.isDevelopment;
// format of the logs inside the log files 
const logFileFormat=winston.format.combine(
    
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.splat(), // enables %d/%o interpolation
    winston.format.json(),
    winston.format.errors({ stack: true }),
)

// format of the logs inside the terminal/console
const consoleLogFormat=winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.splat(), // enables %d/%o interpolation
    winston.format.printf(({ timestamp, level, message,stack }) => {
        return `[${timestamp}] ${level}: ${message}${stack ? `\n${stack}` : ''}`;
    }),
);

//creating the logger instance
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error', format: logFileFormat }), //only error level logs are saved in this file
        new winston.transports.File({ filename: 'logs/combined.log', format: logFileFormat })   //all logs are saved in this file
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' })
    ],
})

// If in development, also log to the console
if (isDevelopment) {
    new winston.transports.Console({ format: consoleLogFormat }),
    logger.add(new winston.transports.Console({ format: consoleLogFormat }));
    logger.level = 'debug'; // Set console log level to debug in development
}
export default logger;
