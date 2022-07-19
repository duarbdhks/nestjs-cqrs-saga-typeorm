import { ICommand } from '@nestjs/cqrs'

export class WelcomeUserCommand implements ICommand {
  constructor(public readonly user_id: number) {}
}
