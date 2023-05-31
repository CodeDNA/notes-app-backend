import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from '../dto/user-dto';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserDto.name) private readonly userDto: Model<UserDto>,
  ) {}

  public async addNewUser() {
    const dummyUser = {
      userId: 'asd2154',
      userName: 'parkerpunj',
      firstName: 'Prabhakar',
      LastName: 'Punj',
      email: 'parkerpunj@gmail.com',
    };

    const filter = {
      userId: dummyUser.userId,
    };

    return await this.userDto
      .findOneAndUpdate(filter, dummyUser, { upsert: true, new: true })
      .lean()
      .exec()
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}
