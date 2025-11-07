import { Injectable, LoggerService } from '@nestjs/common';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  LOG = 2,
  DEBUG = 3,
  VERBOSE = 4,
}

interface LogContext {
  timestamp: string;
  level: string;
  context?: string;
  message: string;
  trace?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class AppLoggerService implements LoggerService {
  private context?: string;
  private readonly logLevel: LogLevel;
  private readonly isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV !== 'production';
    this.logLevel = this.getLogLevel();
  }

  setContext(context: string) {
    this.context = context;
  }

  private getLogLevel(): LogLevel {
    const level = process.env.LOG_LEVEL?.toUpperCase() || 'LOG';
    return LogLevel[level as keyof typeof LogLevel] ?? LogLevel.LOG;
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel;
  }

  private formatMessage(level: string, message: any, context?: string, trace?: string): LogContext {
    const timestamp = new Date().toISOString();
    const ctx = context || this.context || 'Application';
    
    const logContext: LogContext = {
      timestamp,
      level,
      context: ctx,
      message: typeof message === 'object' ? JSON.stringify(message) : String(message),
    };

    if (trace) {
      logContext.trace = trace;
    }

    return logContext;
  }

  private printLog(logContext: LogContext, color: string) {
    if (this.isDevelopment) {
      // Development: Pretty colored output
      console.log(
        `${color}[${logContext.level}]\x1b[0m ` +
        `\x1b[90m${logContext.timestamp}\x1b[0m ` +
        `\x1b[33m[${logContext.context}]\x1b[0m ` +
        `${logContext.message}`
      );
      if (logContext.trace) {
        console.log(`\x1b[31m${logContext.trace}\x1b[0m`);
      }
    } else {
      // Production: JSON structured logging
      console.log(JSON.stringify(logContext));
    }
  }

  log(message: any, context?: string) {
    if (!this.shouldLog(LogLevel.LOG)) return;
    const logContext = this.formatMessage('LOG', message, context);
    this.printLog(logContext, '\x1b[32m'); // Green
  }

  error(message: any, trace?: string, context?: string) {
    if (!this.shouldLog(LogLevel.ERROR)) return;
    const logContext = this.formatMessage('ERROR', message, context, trace);
    this.printLog(logContext, '\x1b[31m'); // Red
  }

  warn(message: any, context?: string) {
    if (!this.shouldLog(LogLevel.WARN)) return;
    const logContext = this.formatMessage('WARN', message, context);
    this.printLog(logContext, '\x1b[33m'); // Yellow
  }

  debug(message: any, context?: string) {
    if (!this.shouldLog(LogLevel.DEBUG)) return;
    const logContext = this.formatMessage('DEBUG', message, context);
    this.printLog(logContext, '\x1b[36m'); // Cyan
  }

  verbose(message: any, context?: string) {
    if (!this.shouldLog(LogLevel.VERBOSE)) return;
    const logContext = this.formatMessage('VERBOSE', message, context);
    this.printLog(logContext, '\x1b[35m'); // Magenta
  }

  // Helper methods for HTTP logging
  logRequest(method: string, url: string, statusCode?: number, duration?: number) {
    const message = `${method} ${url} ${statusCode || ''} ${duration ? `${duration}ms` : ''}`;
    this.log(message);
  }

  logError(error: Error, context?: string) {
    this.error(error.message, error.stack, context);
  }

  // Helper for logging with metadata
  logWithMetadata(message: string, metadata: Record<string, any>, context?: string) {
    const logContext = this.formatMessage('LOG', message, context);
    logContext.metadata = metadata;
    this.printLog(logContext, '\x1b[32m');
  }
}

