import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
