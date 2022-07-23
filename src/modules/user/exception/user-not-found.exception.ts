import { NotFoundException } from '@nestjs/common'

export class UserNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('[NotFound - UserNotFoundException] 유저를 찾을 수 없습니다.', error)
  }
}
