import { HttpExceptionFilter } from '@common/filter/http-exception.filter'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import { config } from '@server/config'
import { LoggerService } from '@shared/service/logger.service'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import * as morgan from 'morgan'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), { cors: true })

  const loggerService = app.get(LoggerService)
  app.use(
    morgan('combined', {
      stream: {
        write: message => {
          loggerService.log(message)
        }
      }
    })
  )

  app.use(helmet())
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

  const reflector = app.get(Reflector)
  app.useGlobalFilters(new HttpExceptionFilter(loggerService))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: { target: false },
    }),
  )

  if (['development', 'staging'].includes(config.env)) {
    // setupSwagger(app,)
  }

  await app.listen(config.port, config.host)
  loggerService.warn(`server running on port ${config.host}:${config.port}`)
}

bootstrap()
