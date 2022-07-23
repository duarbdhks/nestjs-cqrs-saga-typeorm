import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UserCreatedEvent } from '@server/modules/user/events/impl'
import * as clc from 'cli-color'

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {

  handle(event: UserCreatedEvent) {
    console.log(clc.blueBright(`[UserCreatedEvent] UserCreatedHandler...`), event)
  }
}
