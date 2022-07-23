import { UserDeletedHandler } from './user-deleted.handler'
import { UserWelcomeHandler } from './user-welcome.handler'
import { UserCreatedHandler } from './user-created.handler'
import { UserUpdatedHandler } from './user-updated.handler'

export const EventHandlers = [UserCreatedHandler, UserWelcomeHandler, UserUpdatedHandler, UserDeletedHandler]
