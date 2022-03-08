import { ExistingUserDto } from './../user/dtos/new-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NewUserDto } from 'src/user/dtos/new-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: NewUserDto) {
    console.log(user);

    return await this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: ExistingUserDto) {
    return await this.authService.login(user);
  }
}
