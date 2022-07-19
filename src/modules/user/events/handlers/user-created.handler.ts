import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UserCreatedEvent } from '@server/modules/user/events/impl'
import { LoggerService } from '@shared/service/logger.service'
import * as clc from 'cli-color'

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    private readonly loggerService: LoggerService,
  ) {}

  handle(event: UserCreatedEvent) {
    // this.loggerService.log(`[UserCreatedEvent] ${JSON.stringify(event)}`)
    console.log(clc.blueBright(`[UserCreatedEvent]`), event)
  }
}
