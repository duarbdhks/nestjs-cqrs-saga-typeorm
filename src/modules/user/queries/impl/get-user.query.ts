import { IQuery } from '@nestjs/cqrs'
import { UserEntity } from '@shared/entity'
import { FindOneOptions } from 'typeorm'

export class GetUserQuery implements IQuery {
  constructor(
    public readonly findData: FindOneOptions<UserEntity>,
  ) {}
}
