import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/app/users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '../interfaces/jwt-payload.interface';
import { CreateUserDto } from 'src/libs/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async signIn(credentials: { userName: string; password: string }): Promise<{ accessToken: string }> {
    const { userName, password } = credentials;
    const user = await this.userService.getUserByUserName(userName);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JWTPayload = { userName };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Please check your login credentials');
  }

  async signUp(signUpDetails: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(signUpDetails.password, salt);
    signUpDetails.password = hashedPassword;
    return this.userService.addNewUser(signUpDetails);
  }
}