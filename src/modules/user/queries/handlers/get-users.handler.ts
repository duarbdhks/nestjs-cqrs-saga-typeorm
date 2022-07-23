import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUsersQuery } from '@server/modules/user/queries/impl'
import { UserRepository } from '@server/modules/user/user.repository'
import { UserDTO } from '@shared/dto'
import { plainToInstance } from 'class-transformer'
import * as clc from 'cli-color'

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(query: GetUsersQuery): Promise<UserDTO[]> {
    console.log(clc.blueBright('[query] Async GetUsersQuery...'))
    const users = await this.userRepository.find()
    return plainToInstance(UserDTO, users)
  }
}
