import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { UserNotFoundException } from '@server/modules/user/exception'
import { GetUserQuery } from '@server/modules/user/queries/impl'
import { UserRepository } from '@server/modules/user/user.repository'
import { UserDTO } from '@shared/dto'
import { plainToInstance } from 'class-transformer'
import * as clc from 'cli-color'

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(query: GetUserQuery): Promise<UserDTO> {
    console.log(clc.blueBright(`[query] Async GetUserQuery...`))
    const { findData } = query
    const user = await this.userRepository.findOne(findData)
    if (!user) throw new UserNotFoundException()

    return plainToInstance(UserDTO, user)
  }
}
