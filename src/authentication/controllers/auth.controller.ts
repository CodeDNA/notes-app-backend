import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
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
  async signUp(@Body() credentials: CreateUserDto) {
    const newUser = await this.authService.signUp(credentials);
    if (newUser) {
      return `Account Successfully Created. Welcome ${newUser.firstName}.`;
    }
    throw new InternalServerErrorException('Somethig went wrong please try again');
  }
}
