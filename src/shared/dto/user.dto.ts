import { IsID } from '@common/decorator/decorator'
import { ApiProperty } from '@nestjs/swagger'
import { AbstractDTO } from '@shared/dto/abstract.dto'
import { transformInt } from '@shared/transformer'
import { Exclude, Expose, Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@Exclude()
export class UserDTO extends AbstractDTO {
  @Expose()
  @IsID()
  @Transform(transformInt, { toClassOnly: true })
  @ApiProperty()
  readonly user_id: number

  @Expose()
  @IsString()
  @ApiProperty()
  readonly first_name: string

  @Expose()
  @IsString()
  @ApiProperty()
  readonly last_name: string

  @Expose()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string
}

export class UserIdDTO {
  @Expose()
  @IsID()
  @Transform(transformInt, { toClassOnly: true })
  @ApiProperty()
  readonly user_id: number
}
