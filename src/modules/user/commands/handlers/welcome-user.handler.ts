import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { WelcomeUserCommand } from '@server/modules/user/commands/impl'
import { UserRepository } from '@server/modules/user/user.repository'
import * as clc from 'cli-color'

@CommandHandler(WelcomeUserCommand)
export class WelcomeUserHandler implements ICommandHandler<WelcomeUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: WelcomeUserCommand): Promise<void> {
    console.log(clc.blueBright('[WelcomeUserCommand] Async WelcomeUserHandler...'))
    const { user_id } = command
    const userEntity = await this.userRepository.welcomeUser({ user_id })
    const user = this.publisher.mergeObjectContext(userEntity)
    user.commit()
  }
}
