import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UserUpdatedEvent } from '@server/modules/user/events/impl'
import * as clc from 'cli-color'

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  handle(event: UserUpdatedEvent) {
    console.log(clc.blueBright(`[UserUpdatedEvent] UserUpdatedHandler...`), event)
  }
}
