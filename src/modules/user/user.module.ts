import { TypeOrmExModule } from '@common/typeorm-ex/typeorm-ex.module'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommandHandlers } from '@server/modules/user/commands/handlers'
import { EventHandlers } from '@server/modules/user/events/handlers'
import { QueryHandlers } from '@server/modules/user/queries/handlers'
import { UserController } from '@server/modules/user/user.contoller'
import { UserRepository } from '@server/modules/user/user.repository'
import { UserSaga } from '@server/modules/user/user.saga'
import { UserService } from '@server/modules/user/user.service'
import { UserEntity } from '@shared/entity'

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers,
    UserSaga,
  ],
})
export class UserModule {
}
