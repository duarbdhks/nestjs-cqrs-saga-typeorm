import { BadRequestException } from '@nestjs/common'

export class UserAlreadyExistException extends BadRequestException {
  constructor(error?: string) {
    super('bad_request_error.user_already_exist', error)
  }
}
