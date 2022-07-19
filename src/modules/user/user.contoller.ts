import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDTO, GetUserDTO } from '@server/modules/user/dto'
import { UserService } from '@server/modules/user/user.service'
import { UserDTO } from '@shared/dto'

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User Created.' })
  @Post('/')
  async createUser(
    @Body() body: CreateUserDTO,
  ): Promise<void> {
    return this.userService.createUser({ ...body })
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Update User.' })
  @Put('/:user_id')
  async updateUser() {
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Delete User.' })
  @Delete('/:user_id')
  async deleteUser() {
  }

  @ApiOperation({ summary: 'List User' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List User.' })
  @Get('/')
  async getUsers(): Promise<UserDTO[]> {
    return this.userService.getUsers()
  }

  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get User.' })
  @Get('/:user_id')
  async getUser(
    @Param() param: GetUserDTO,
  ): Promise<UserDTO> {
    return this.userService.getUser({ ...param })
  }
}
