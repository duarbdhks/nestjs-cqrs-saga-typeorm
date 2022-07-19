import { CustomRepository } from '@common/typeorm-ex/typeorm-ex.decorator'
import { CreateUserDTO } from '@server/modules/user/dto'
import { UserIdDTO } from '@shared/dto'
import { UserEntity } from '@shared/entity'
import { Repository } from 'typeorm'

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(options: CreateUserDTO): Promise<UserEntity> {
    const { first_name, last_name, email } = options

    const userEntity = super.create({ first_name, last_name, email })
    const user = await this.save(userEntity)
    user.onUserCreated()

    return user
  }

  async welcomeUser(options: UserIdDTO): Promise<UserEntity> {
    const { user_id } = options
    const user = await super.findOne({ where: { user_id } })
    user.onWelcome()
    return user
  }
}
