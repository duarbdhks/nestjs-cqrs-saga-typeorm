import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly first_name: string

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly last_name: string

  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string
}
