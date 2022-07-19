import { UserDTO } from '@shared/dto'
import { IAggregateEvent } from 'nestjs-eventstore'

export class UserAbstractEvent implements IAggregateEvent {
  constructor(public readonly user: UserDTO) {
  }

  get streamName() {
    return `users-${this.user.user_id}`
  }
}
