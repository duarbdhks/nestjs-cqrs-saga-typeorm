import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly first_name?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly last_name?: string

  @IsOptional()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email?: string
}
