import { ICommand } from '@nestjs/cqrs'
import { UpdateUserDTO } from '@server/modules/user/dto'
import { UserIdDTO } from '@shared/dto'

export class UpdateUserCommand implements ICommand {
  constructor(public readonly options: UserIdDTO & UpdateUserDTO) {}
}
