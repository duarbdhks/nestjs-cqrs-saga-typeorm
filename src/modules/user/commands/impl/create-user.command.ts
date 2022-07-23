import { ICommand } from '@nestjs/cqrs'
import { CreateUserDTO } from '@server/modules/user/dto'

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly options: CreateUserDTO,
  ) {}
}
