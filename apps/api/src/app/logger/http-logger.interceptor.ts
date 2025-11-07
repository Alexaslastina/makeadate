import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLoggerService } from './logger.service';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLoggerService) {
    this.logger.setContext('HTTP');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const startTime = Date.now();

    this.logger.logWithMetadata(
      `Incoming Request: ${method} ${url}`,
      {
        method,
        url,
        ip,
        userAgent,
      }
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          const response = context.switchToHttp().getResponse();
          const { statusCode } = response;
          const duration = Date.now() - startTime;

          this.logger.logRequest(method, url, statusCode, duration);
        },
        error: (error) => {
          const response = context.switchToHttp().getResponse();
          const statusCode = error?.status || response?.statusCode || 500;
          const duration = Date.now() - startTime;

          this.logger.logRequest(method, url, statusCode, duration);
          this.logger.logError(error);
        },
      })
    );
  }
}

