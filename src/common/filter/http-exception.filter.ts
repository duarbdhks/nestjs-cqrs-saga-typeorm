import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { LoggerService } from '@shared/service/logger.service'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly loggerService: LoggerService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    if (request) {
      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

      const errorResponse = {
        code: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        error: status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message || null
          : 'Internal server error',
        message: typeof exception.getResponse() === 'object'
          ? (exception.getResponse() as any).message
          : exception.getResponse(),
      }

      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        this.loggerService.error(
          `${request.method} ${request.url}`,
          exception.stack,
          'ExceptionFilter',
        )
      }

      return response.status(status).json(errorResponse)
    } else {
      return exception
    }
  }
}
