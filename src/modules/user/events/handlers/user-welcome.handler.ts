import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UserWelcomeEvent } from '@server/modules/user/events/impl'
import * as clc from 'cli-color'

@EventsHandler(UserWelcomeEvent)
export class UserWelcomeHandler implements IEventHandler<UserWelcomeEvent> {
  handle(event: UserWelcomeEvent): void {
    console.log(clc.blueBright('[UserWelcomeEvent]'), event)
  }
}
