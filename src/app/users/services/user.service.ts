import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { v4 as uuid } from 'uuid';
import { UsersRespository } from '../repository/users.repository';
import { User } from '../dto/user.model';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from 'src/libs/dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private usersRespository: UsersRespository) {}

  public async addNewUser(signUpDetails: CreateUserDto) {
    const newUser = plainToClass(User, signUpDetails);
    newUser.userId = uuid();
    newUser.groups = [];
    newUser.isDeleted = false;
    return this.usersRespository.addOrUpdateUser(newUser);
  }

  public async updateUser(user: UserDto) {
    const userModel = plainToClass(User, user);
    return this.usersRespository.addOrUpdateUser(userModel);
  }

  // TBI
  // < Update user groups >
  // < Update user first/last name >
  // < >

  public async getUserById(userId: string) {
    const user = await this.usersRespository.getUserById(userId);
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found!');
  }

  public async deleteUserById(userId: string) {
    //TODO: Implement exception handling
    //TODO: Soft delete the user first. Then remove user from all the associated groups. Create a nighty job to delete the users that are deleted 30 days ago.
    return this.usersRespository.deleteUserById(userId);
  }

  public async isUserValid(userId: string) {
    return this.usersRespository.isUserValid(userId);
  }

  //TODO: Rename this to: addGroupsToUser
  public async updateUserGroups(userId: string, groupId: string) {
    //TODO: remove this call from controllers and call this from groups service
    const user = await this.usersRespository.getUserById(userId);
    if (!user) throw new NotFoundException('User not found!');
    user.groups.push(groupId);
    // TODO: Implement exception handling
    return await this.usersRespository.addOrUpdateUser(user);
  }

  public async removeGroupFromUser(userId: string, groupId: string) {
    const user = await this.usersRespository.getUserById(userId);
    if (!user) throw new NotFoundException('User not found!');
    const indexofGroup = user.groups.indexOf(groupId);
    if (indexofGroup === -1) throw new NotFoundException('User is already removed from this group');

    user.groups.splice(indexofGroup, 1);
    return await this.usersRespository.addOrUpdateUser(user);
  }

  public async getUserByUserName(userName: string) {
    const user = await this.usersRespository.getUserByUserName(userName);
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found!');
  }
}
