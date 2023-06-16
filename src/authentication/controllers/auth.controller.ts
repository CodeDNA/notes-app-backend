import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/libs/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/sign-in')
  signIn(@Body() credentials: { userName: string; password: string }): Promise<{ accessToken: string }> {
    return this.authService.signIn(credentials);
  }

  @Post('/sign-up')
  signUp(@Body() credentials: CreateUserDto) {
    return this.authService.signUp(credentials);
  }
}
