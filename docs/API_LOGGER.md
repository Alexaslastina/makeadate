# 📝 API Logger Documentation

Comprehensive logging service for the Make a Date API backend.

## Overview

The API Logger provides structured logging capabilities for the NestJS backend with support for different log levels, colored console output in development, and JSON structured logging in production.

## Features

- ✅ **Multiple Log Levels**: ERROR, WARN, LOG, DEBUG, VERBOSE
- 🎨 **Colored Console Output**: Pretty colored logs in development
- 📊 **JSON Structured Logging**: Machine-readable logs in production
- 🔍 **HTTP Request Logging**: Automatic logging of all HTTP requests
- ⏱️ **Performance Tracking**: Request duration measurement
- 🏷️ **Context Support**: Categorize logs by context/module
- 🔒 **Error Stack Traces**: Full stack trace logging for errors
- 📈 **Metadata Support**: Attach custom metadata to logs

## Architecture

### Core Components

```
apps/api/src/app/logger/
├── logger.service.ts          # Core logging service
├── logger.module.ts           # Logger module (Global)
├── http-logger.interceptor.ts # HTTP request/response interceptor
└── index.ts                   # Barrel export
```

### Service Structure

```typescript
@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService implements LoggerService {
  // Implements NestJS LoggerService interface
  log(message: any, context?: string)
  error(message: any, trace?: string, context?: string)
  warn(message: any, context?: string)
  debug(message: any, context?: string)
  verbose(message: any, context?: string)
  
  // Helper methods
  logRequest(method: string, url: string, statusCode?: number, duration?: number)
  logError(error: Error, context?: string)
  logWithMetadata(message: string, metadata: Record<string, any>, context?: string)
}
```

## Configuration

### Environment Variables

| Variable | Values | Default | Description |
|----------|--------|---------|-------------|
| `NODE_ENV` | `development`, `production` | `development` | Controls log format |
| `LOG_LEVEL` | `ERROR`, `WARN`, `LOG`, `DEBUG`, `VERBOSE` | `LOG` | Minimum log level to output |

### Log Levels

Log levels are hierarchical - setting a level shows that level and all levels above it:

| Level | Value | Shows | Use Case |
|-------|-------|-------|----------|
| `ERROR` | 0 | Errors only | Production critical issues only |
| `WARN` | 1 | Errors + Warnings | Production with warnings |
| `LOG` | 2 | Errors + Warnings + Logs | **Default** - Normal operation |
| `DEBUG` | 3 | All above + Debug info | Development debugging |
| `VERBOSE` | 4 | Everything | Detailed development tracing |

## Usage

### Basic Usage

```typescript
import { Injectable } from '@nestjs/common';
import { AppLoggerService } from '../logger';

@Injectable()
export class UsersService {
  constructor(private readonly logger: AppLoggerService) {
    this.logger.setContext('UsersService');
  }

  async findAll() {
    this.logger.log('Fetching all users');
    // ... logic
  }

  async create(userData: any) {
    this.logger.debug('Creating new user with data');
    try {
      // ... creation logic
      this.logger.log('User created successfully');
    } catch (error) {
      this.logger.error('Failed to create user', error.stack);
      throw error;
    }
  }
}
```

### Logging with Context

```typescript
// Set context once
this.logger.setContext('AuthService');

// All subsequent logs will include this context
this.logger.log('User logged in');
// Output: [LOG] 2024-01-15T10:30:00.000Z [AuthService] User logged in

// Override context for specific log
this.logger.warn('Rate limit exceeded', 'RateLimiter');
// Output: [WARN] 2024-01-15T10:30:05.000Z [RateLimiter] Rate limit exceeded
```

### Logging with Metadata

```typescript
this.logger.logWithMetadata(
  'User registration attempt',
  {
    email: 'user@example.com',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0...',
    timestamp: Date.now()
  }
);
```

**Development Output**:
```
[LOG] 2024-01-15T10:30:00.000Z [UsersService] User registration attempt
```

**Production Output** (JSON):
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "LOG",
  "context": "UsersService",
  "message": "User registration attempt",
  "metadata": {
    "email": "user@example.com",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "timestamp": 1705318200000
  }
}
```

### Error Logging

```typescript
try {
  await dangerousOperation();
} catch (error) {
  // Method 1: Using logError helper
  this.logger.logError(error);
  
  // Method 2: Using error method directly
  this.logger.error(error.message, error.stack, 'OperationContext');
}
```

### HTTP Request Logging

The `HttpLoggerInterceptor` automatically logs all HTTP requests:

```typescript
// Automatically logs:
// - Incoming request (method, URL, IP, user agent)
// - Response status and duration
// - Errors with stack traces

// Example output:
// [LOG] Incoming Request: GET /api/users
// [LOG] GET /api/users 200 45ms
```

**Production JSON Output**:
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "LOG",
  "context": "HTTP",
  "message": "Incoming Request: GET /api/users",
  "metadata": {
    "method": "GET",
    "url": "/api/users",
    "ip": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  }
}
```

## Output Formats

### Development Mode (`NODE_ENV=development`)

Colored, human-readable output:

```
[LOG]     2024-01-15T10:30:00.000Z [UsersService] User created
[WARN]    2024-01-15T10:30:01.000Z [AuthService] Token expiring soon
[ERROR]   2024-01-15T10:30:02.000Z [Database] Connection failed
  at DatabaseService.connect (/app/database.service.ts:45:12)
  at async bootstrap (/app/main.ts:12:3)
[DEBUG]   2024-01-15T10:30:03.000Z [UsersService] User data: {...}
[VERBOSE] 2024-01-15T10:30:04.000Z [HTTP] Raw request headers
```

**Color Coding**:
- 🟢 **LOG**: Green
- 🔴 **ERROR**: Red
- 🟡 **WARN**: Yellow
- 🔵 **DEBUG**: Cyan
- 🟣 **VERBOSE**: Magenta

### Production Mode (`NODE_ENV=production`)

Structured JSON output for log aggregation tools:

```json
{"timestamp":"2024-01-15T10:30:00.000Z","level":"LOG","context":"UsersService","message":"User created"}
{"timestamp":"2024-01-15T10:30:01.000Z","level":"WARN","context":"AuthService","message":"Token expiring soon"}
{"timestamp":"2024-01-15T10:30:02.000Z","level":"ERROR","context":"Database","message":"Connection failed","trace":"Error: Connection failed\n    at DatabaseService.connect..."}
```

## Integration

### Application Bootstrap

The logger is integrated in `main.ts`:

```typescript
import { AppLoggerService, HttpLoggerInterceptor } from './app/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Get custom logger instance
  const logger = app.get(AppLoggerService);
  logger.setContext('Bootstrap');
  app.useLogger(logger);

  // Global HTTP logging interceptor
  app.useGlobalInterceptors(new HttpLoggerInterceptor(logger));

  // ... rest of bootstrap
  
  logger.log(`🚀 Application is running on: http://0.0.0.0:${port}/api`);
  logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.log(`Log Level: ${process.env.LOG_LEVEL || 'LOG'}`);
}
```

### Module Registration

The LoggerModule is registered globally in `app.module.ts`:

```typescript
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule, // Available in all modules
    // ... other modules
  ],
})
export class AppModule {}
```

## Best Practices

### 1. Set Meaningful Contexts

```typescript
// ✅ Good
this.logger.setContext('UserAuthenticationService');
this.logger.log('User login attempt');

// ❌ Bad
this.logger.log('User login attempt'); // No context
```

### 2. Use Appropriate Log Levels

```typescript
// ✅ Good
this.logger.error('Database connection failed', error.stack);
this.logger.warn('Cache miss, falling back to database');
this.logger.log('User registered successfully');
this.logger.debug('Processing request with data: ' + JSON.stringify(data));
this.logger.verbose('Raw headers: ' + JSON.stringify(headers));

// ❌ Bad
this.logger.error('User logged in'); // Should be 'log'
this.logger.log('Critical system failure'); // Should be 'error'
```

### 3. Include Relevant Information

```typescript
// ✅ Good
this.logger.error(`Failed to create user: ${error.message}`, error.stack);
this.logger.logWithMetadata('Payment processed', {
  userId: user.id,
  amount: payment.amount,
  currency: payment.currency,
  transactionId: payment.id
});

// ❌ Bad
this.logger.error('Error occurred'); // Not specific enough
this.logger.log('Done'); // Not informative
```

### 4. Don't Log Sensitive Data

```typescript
// ✅ Good
this.logger.log(`User ${user.id} logged in`);
this.logger.logWithMetadata('Password reset requested', {
  userId: user.id,
  email: maskEmail(user.email)
});

// ❌ Bad - NEVER DO THIS
this.logger.log(`User logged in: ${JSON.stringify(user)}`); // Contains password hash
this.logger.debug(`Token: ${jwtToken}`); // Exposes authentication token
```

### 5. Use Error Helpers

```typescript
// ✅ Good
try {
  await operation();
} catch (error) {
  this.logger.logError(error, 'OperationContext');
  throw error;
}

// ❌ Bad
try {
  await operation();
} catch (error) {
  this.logger.error(error); // Missing stack trace
}
```

## Testing

### Mocking the Logger

```typescript
import { Test } from '@nestjs/testing';
import { AppLoggerService } from '../logger';

describe('UsersService', () => {
  let service: UsersService;
  let logger: AppLoggerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: AppLoggerService,
          useValue: {
            setContext: jest.fn(),
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
            verbose: jest.fn(),
            logError: jest.fn(),
            logWithMetadata: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    logger = module.get<AppLoggerService>(AppLoggerService);
  });

  it('should log user creation', async () => {
    await service.create({ email: 'test@example.com' });
    expect(logger.log).toHaveBeenCalledWith('User created successfully');
  });
});
```

## Performance Considerations

1. **Transient Scope**: Logger uses `Scope.TRANSIENT` for per-instance context
2. **Conditional Logging**: Only formats and outputs logs at or above configured level
3. **Minimal Overhead**: JSON stringification only in production
4. **Async Safe**: All logging operations are synchronous for reliability

## Troubleshooting

### Logs Not Appearing

1. **Check LOG_LEVEL**: Ensure it's set appropriately
   ```bash
   # In .env file
   LOG_LEVEL=DEBUG
   ```

2. **Verify Logger Context**: Ensure logger is properly injected
   ```typescript
   constructor(private readonly logger: AppLoggerService) {
     this.logger.setContext(MyService.name);
   }
   ```

3. **Check Environment**: Verify NODE_ENV is set correctly

### JSON Output in Development

If you're seeing JSON output in development:

```bash
# Ensure NODE_ENV is not set to 'production'
echo $NODE_ENV
# Should be empty or 'development'

# Unset if needed
unset NODE_ENV
```

### Missing HTTP Logs

Ensure the interceptor is registered:

```typescript
// In main.ts
app.useGlobalInterceptors(new HttpLoggerInterceptor(logger));
```

## Advanced Usage

### Custom Log Formatter

Extend the logger for custom formatting:

```typescript
@Injectable()
export class CustomLoggerService extends AppLoggerService {
  log(message: any, context?: string) {
    // Add custom formatting logic
    const formatted = this.customFormat(message);
    super.log(formatted, context);
  }
  
  private customFormat(message: any): string {
    // Your custom logic here
    return `[CUSTOM] ${message}`;
  }
}
```

### Log Aggregation Integration

For production log aggregation (e.g., CloudWatch, Datadog, Splunk):

```typescript
// The JSON output format is designed for log aggregation tools
// Simply pipe stdout/stderr to your log aggregator

// Example with Datadog
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "LOG",
  "context": "UsersService",
  "message": "User created",
  "metadata": { "userId": "123" }
}
```

## Migration Guide

### From Built-in Logger

```typescript
// Before
import { Logger } from '@nestjs/common';

export class MyService {
  private readonly logger = new Logger(MyService.name);
  
  someMethod() {
    this.logger.log('Message');
  }
}

// After
import { AppLoggerService } from '../logger';

export class MyService {
  constructor(private readonly logger: AppLoggerService) {
    this.logger.setContext(MyService.name);
  }
  
  someMethod() {
    this.logger.log('Message');
  }
}
```

## Related Documentation

- [NestJS Logging](https://docs.nestjs.com/techniques/logger)
- [GitHub Workflows](../.github/workflows/README.md)
- [API Endpoints](../API_ENDPOINTS.md)
- [Architecture](../ARCHITECTURE.md)

---

**Questions or Issues?** Open an issue on GitHub or check the [main documentation](../README.md).

