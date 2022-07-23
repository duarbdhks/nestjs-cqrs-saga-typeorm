import { DeleteUserHandler } from './delete-user.handler'
import { UpdateUserHandler } from './update-user.handler'
import { WelcomeUserHandler } from './welcome-user.handler'
import { CreateUserHandler } from './create-user.handler'

export const CommandHandlers = [
  CreateUserHandler,
  WelcomeUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
]
