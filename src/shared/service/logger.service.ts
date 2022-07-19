import { Injectable, Logger } from '@nestjs/common'
import { config } from '@server/config'
import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'

@Injectable()
export class LoggerService extends Logger {
  private readonly logger: winston.Logger

  constructor() {
    super(LoggerService.name, { timestamp: true })
    this.logger = winston.createLogger({
      transports: [
        new DailyRotateFile({
          level: 'debug',
          filename: `./logs/${config.env}/debug-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new DailyRotateFile({
          level: 'error',
          filename: `./logs/${config.env}/error-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxSize: '20m',
          maxFiles: '30d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          )
        }),
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
            winston.format.simple(),
          )
        }),
      ],
      exitOnError: false,
    })
  }

  log(message: string): void {
    this.logger.info(message)
  }

  info(message: string): void {
    this.logger.info(message)
  }

  debug(message: string): void {
    this.logger.debug(message)
  }

  error(message: string, trace?: any, context?: string): void {
    this.logger.error(`${context} ${message} -> (${trace} || 'trace not provided!')`)
  }

  warn(message: string): void {
    this.logger.warn(message)
  }
}
