import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/app/users/services/user.service';
import { JWTPayload } from './interfaces/jwt-payload.interface';
import { UserDto } from 'src/app/users/dto/user.dto';

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JWTPayload): Promise<UserDto> {
    const { userName } = payload;
    const user: UserDto = await this.userService.getUserByUserName(userName);

    if (!user) {
      throw new UnauthorizedException();
    }
    delete user.password;
    return user;
  }
}
