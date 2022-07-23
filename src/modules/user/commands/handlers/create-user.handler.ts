import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { CreateUserCommand } from '@server/modules/user/commands/impl'
import { UserAlreadyExistException } from '@server/modules/user/exception'
import { UserRepository } from '@server/modules/user/user.repository'
import { LoggerService } from '@shared/service/logger.service'
import * as clc from 'cli-color'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    // this.loggerService.log('[CreateUserCommand] Async CreateUserHandler...')
    console.log(clc.blueBright('[CreateUserCommand] Async CreateUserHandler...'))

    const { options } = command

    const isUser = await this.userRepository.findOne({ where: { ...options } })
    if (isUser) throw new UserAlreadyExistException()

    const user = this.eventPublisher.mergeObjectContext(
      await this.userRepository.createUser(options)
    )

    user.commit()
  }
}
