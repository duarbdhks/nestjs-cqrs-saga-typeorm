import { ICommand } from '@nestjs/cqrs'
import { UserIdDTO } from '@shared/dto'

export class DeleteUserCommand implements ICommand {
  constructor(readonly options: UserIdDTO) {}
}
