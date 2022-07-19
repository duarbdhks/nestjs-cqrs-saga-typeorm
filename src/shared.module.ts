import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { LoggerService } from '@shared/service/logger.service'

const providers = [
  LoggerService,
]

@Global()
@Module({
  imports: [HttpModule],
  providers,
  exports: [...providers, HttpModule],
})
export class SharedModule {
}
