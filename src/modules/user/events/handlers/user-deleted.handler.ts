import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UserDeletedEvent } from '@server/modules/user/events/impl'
import * as clc from 'cli-color'

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
  handle(event: UserDeletedEvent): void {
    console.log(clc.blueBright(`[UserDeletedEvent] UserDeletedHandler...`), event)
  }
}
