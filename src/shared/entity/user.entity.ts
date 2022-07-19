import { UserCreatedEvent, UserWelcomeEvent } from '@server/modules/user/events/impl'
import { UserDTO } from '@shared/dto'
import { AbstractEntity } from '@shared/entity/abstract.entity'
import { plainToInstance } from 'class-transformer'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import * as clc from 'cli-color'

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  user_id: number

  @Column({ nullable: true })
  first_name?: string

  @Column({ nullable: true })
  last_name?: string

  @Column({ unique: true, nullable: true })
  email?: string

  onUserCreated(): void {
    console.log(clc.blueBright('[UserEntity] onUserCreated()'))
    this.apply(new UserCreatedEvent(plainToInstance(UserDTO, this)))
  }

  onWelcome(): void {
    console.log(clc.blueBright('[UserEntity] onWelcome()'))
    this.apply(new UserWelcomeEvent(plainToInstance(UserDTO, this)))
  }
}
