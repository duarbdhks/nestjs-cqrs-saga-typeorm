import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateUserCommand, DeleteUserCommand, UpdateUserCommand } from '@server/modules/user/commands/impl'
import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from '@server/modules/user/dto'
import { GetUserQuery, GetUsersQuery } from '@server/modules/user/queries/impl'
import { UserDTO, UserIdDTO } from '@shared/dto'

@Injectable()
export class UserService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async createUser(options: CreateUserDTO): Promise<void> {
    return this.commandBus.execute(new CreateUserCommand(options))
  }

  async updateUser(options: UserIdDTO & UpdateUserDTO): Promise<void> {
    return this.commandBus.execute(new UpdateUserCommand(options))
  }

  async deleteUser(options: UserIdDTO): Promise<void> {
    return this.commandBus.execute(new DeleteUserCommand(options))
  }

  async getUsers(): Promise<UserDTO[]> {
    return this.queryBus.execute(new GetUsersQuery())
  }

  async getUser(options: GetUserDTO): Promise<UserDTO> {
    const { user_id } = options
    return this.queryBus.execute(new GetUserQuery({ where: { user_id } }))
  }
}
