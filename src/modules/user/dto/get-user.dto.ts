import { IsID } from '@common/decorator/decorator'
import { ApiProperty } from '@nestjs/swagger'
import { transformInt } from '@shared/transformer'
import { Transform } from 'class-transformer'
import { IsDefined } from 'class-validator'

export class GetUserDTO {
  @IsDefined()
  @IsID()
  @Transform(transformInt, { toClassOnly: true })
  @ApiProperty()
  readonly user_id: number
}
