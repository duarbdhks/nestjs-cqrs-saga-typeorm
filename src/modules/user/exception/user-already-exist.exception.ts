import { BadRequestException } from '@nestjs/common'

export class UserAlreadyExistException extends BadRequestException {
  constructor(error?: string) {
    super('[BadRequest - UserAlreadyExistException] 이미 유저가 존재합니다.', error)
  }
}
