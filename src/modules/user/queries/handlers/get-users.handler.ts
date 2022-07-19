import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUsersQuery } from '@server/modules/user/queries/impl'
import { UserRepository } from '@server/modules/user/user.repository'
import { UserDTO } from '@shared/dto'
import { LoggerService } from '@shared/service/logger.service'
import { plainToInstance } from 'class-transformer'

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(query: GetUsersQuery): Promise<UserDTO[]> {
    this.loggerService.log('[query] Async GetUsersQuery...')
    const users = await this.userRepository.find()
    return plainToInstance(UserDTO, users)
  }
}
