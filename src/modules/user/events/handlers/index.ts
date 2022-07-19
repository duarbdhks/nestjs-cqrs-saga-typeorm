import { UserWelcomeHandler } from '@server/modules/user/events/handlers/user-welcome.handler'
import { UserCreatedHandler } from './user-created.handler'

export const EventHandlers = [
  UserCreatedHandler,
  UserWelcomeHandler,
]
