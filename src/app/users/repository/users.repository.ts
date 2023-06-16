import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../dto/user-model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRespository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  public async addOrUpdateUser(user: User) {
    const filter = {
      userId: user.userId,
    };
    try {
      return await this.userModel.findOneAndUpdate(filter, user, { upsert: true, new: true });
    } catch (error) {
      if (error.codeName === 'DuplicateKey') {
        throw new ConflictException(`User with this ${Object.keys(error.keyPattern)[0].toLowerCase()} already exists`);
      }
      throw new InternalServerErrorException();
    }
  }

  public async getUserById(userId: string) {
    const filter = {
      userId,
    };
    return await this.userModel
      .findOne(filter)
      .lean()
      .exec()
      .then((response) => response);
  }

  public async deleteUserById(userId: string) {
    return await this.userModel.deleteOne({ userId: userId });
  }

  public async isUserValid(userId: string) {
    return await this.userModel
      .exists({ userId })
      .lean()
      .exec()
      .then((response) => response);
  }

  public async getUserByUserName(userName: string) {
    const filter = {
      userName,
    };
    return await this.userModel
      .findOne(filter)
      .lean()
      .exec()
      .then((response) => response);
  }
}
