/**
 * Logger utility using Winston
 */

import winston from 'winston';
import path from 'path';
import { config } from '../../paperless/config/settings';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
  })
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      logFormat
    ),
  }),
];

// Add file transport in production
if (config.environment === 'production') {
  transports.push(
    new winston.transports.File({
      filename: path.join(config.loggingDir, 'error.log'),
      level: 'error',
      format: logFormat,
    }),
    new winston.transports.File({
      filename: path.join(config.loggingDir, 'combined.log'),
      format: logFormat,
    })
  );
}

export const logger = winston.createLogger({
  level: config.debug ? 'debug' : 'info',
  format: logFormat,
  transports,
});

export default logger;
