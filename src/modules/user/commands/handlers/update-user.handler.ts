import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { UpdateUserCommand } from '@server/modules/user/commands/impl'
import { UserNotFoundException } from '@server/modules/user/exception'
import { UserRepository } from '@server/modules/user/user.repository'
import * as clc from 'cli-color'

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventPublisher: EventPublisher,
  ) {
  }

  async execute(command: UpdateUserCommand) {
    console.log(clc.blueBright('[UpdateUserCommand] Async UpdateUserHandler...'))

    const { options } = command
    const { user_id } = options
    const isUser = await this.userRepository.findOne({ where: { user_id } })
    if (!isUser) throw new UserNotFoundException()
    console.log(isUser)

    const user = this.eventPublisher.mergeObjectContext(
      await this.userRepository.updateUser(options)
    )
    user.commit()
  }
}
