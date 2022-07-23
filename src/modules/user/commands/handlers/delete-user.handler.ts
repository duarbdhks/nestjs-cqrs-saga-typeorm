import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { DeleteUserCommand } from '@server/modules/user/commands/impl'
import { UserRepository } from '@server/modules/user/user.repository'

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventPublisher: EventPublisher,
  ) {
  }

  async execute(command: DeleteUserCommand) {
    const { options: { user_id } } = command
    const user = this.eventPublisher.mergeObjectContext(
      await this.userRepository.deleteUser({ user_id })
    )
    user.commit()
  }
}
