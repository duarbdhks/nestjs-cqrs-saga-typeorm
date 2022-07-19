import { WelcomeUserHandler } from '@server/modules/user/commands/handlers/welcome-user.handler'
import { CreateUserHandler } from './create-user.handler'

export const CommandHandlers = [
  CreateUserHandler,
  WelcomeUserHandler,
]
