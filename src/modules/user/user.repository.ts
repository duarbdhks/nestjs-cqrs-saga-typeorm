import { CustomRepository } from '@common/typeorm-ex/typeorm-ex.decorator'
import { CreateUserDTO, UpdateUserDTO } from '@server/modules/user/dto'
import { UserIdDTO } from '@shared/dto'
import { UserEntity } from '@shared/entity'
import { Repository } from 'typeorm'

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(options: CreateUserDTO): Promise<UserEntity> {
    const { first_name, last_name, email } = options

    const userEntity = this.create({ first_name, last_name, email })
    const user = await this.save(userEntity)
    user.onCreatedUser()

    return user
  }

  async welcomeUser(options: UserIdDTO): Promise<UserEntity> {
    const { user_id } = options
    const user = await this.findOne({ where: { user_id } })
    user.onWelcome()
    return user
  }

  async updateUser(options: UserIdDTO & UpdateUserDTO): Promise<UserEntity> {
    const { user_id, last_name, email, first_name } = options
    await this.update({ user_id }, { last_name, email, first_name })
    const user = await this.findOne({ where: { user_id } })
    user.onUpdatedUser()

    return user
  }

  async deleteUser(options: UserIdDTO): Promise<UserEntity> {
    const { user_id } = options

    await this.delete({ user_id })
    const user = new UserEntity()
    user.onDeletedUser()

    return user
  }
}
