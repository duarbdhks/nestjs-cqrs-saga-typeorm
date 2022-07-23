import { Injectable } from '@nestjs/common'
import { ofType, Saga } from '@nestjs/cqrs'
import { WelcomeUserCommand } from '@server/modules/user/commands/impl'
import { UserCreatedEvent, UserUpdatedEvent } from '@server/modules/user/events/impl'
import { UserDTO } from '@shared/dto'
import { LoggerService } from '@shared/service/logger.service'
import { delay, map, Observable } from 'rxjs'
import * as clc from 'cli-color'

@Injectable()
export class UserSaga {
  constructor(
    private readonly loggerService: LoggerService,
  ) {}

  @Saga()
  userCreated = (events$: Observable<UserDTO>) => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      delay(1000),
      map(event => {
        // this.loggerService.log(`[usedCreated Saga] ${JSON.stringify(event)}`)
        console.log(clc.blueBright(`[user Created Saga]`), event)
        const userId = event.user.user_id
        return new WelcomeUserCommand(userId)
      })
    )
  }

  @Saga()
  userUpdated = (events$: Observable<UserDTO>) => {
    return events$.pipe(
      ofType(UserUpdatedEvent),
      delay(1000),
      map(event => {
        console.log(clc.blueBright(`[user Updated Saga]`), event)
      })
    )
  }
}
