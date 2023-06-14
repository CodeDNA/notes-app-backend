import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from '../dto/user.dto';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserDto.name) private readonly userDto: Model<UserDto>) {}

  public async addOrUpdateUser(user: UserDto) {
    if (!user.userId) {
      user.userId = randomUUID();
      user.groups = [];
    }

    const filter = {
      userId: user.userId,
    };

    return await this.userDto.findOneAndUpdate(filter, user, { upsert: true, new: true });
  }

  public async getUserById(userId: string) {
    const filter = {
      userId,
    };
    const user = await this.userDto
      .findOne(filter)
      .lean()
      .exec()
      .then((response) => response);
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found!');
  }

  public async deleteUserById(userId: string) {
    try {
      return await this.userDto.deleteOne({ userId: userId });
    } catch (error) {
      throw error;
    }
  }

  public async isUserValid(userId: string) {
    return await this.userDto
      .exists({ userId })
      .lean()
      .exec()
      .then((response) => response);
  }

  public async updateUserGroups(userId: string, groupId: string) {
    const user = await this.getUserById(userId);
    user.groups.push(groupId);
    return await this.addOrUpdateUser(user);
  }

  public async getUserByUserName(userName: string) {
    const filter = {
      userName,
    };
    const user = await this.userDto
      .findOne(filter)
      .lean()
      .exec()
      .then((response) => response);
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found!');
  }
}
