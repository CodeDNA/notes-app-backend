import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDto } from '../dto/post.dto';
import { GroupDto } from '../dto/group.dto';
import { v4 as uuid } from 'uuid';
import { UserService } from 'src/app/users/services/user.service';

@Injectable()
export class GroupsService {
  constructor(private readonly userService: UserService, @InjectModel(GroupDto.name) private readonly group: Model<GroupDto>) {} // TODO: Make use of userService to update users (currently used in the groups controller)

  public async createOrUpdateGroup(group: GroupDto) {
    if (!group.ownerId) {
      group.groupId = uuid();
      group.ownerId = group.creatorId;
      group.members = [group.creatorId.toString()];
      group.posts = [];
    }
    const filter = {
      groupId: group.groupId,
    };

    return await this.group
      .findOneAndUpdate(filter, group, { upsert: true, new: true })
      .lean()
      .exec()
      .then((response) => {
        console.log(response);
        return response;
      });
  }

  public async addUserToGroup(userId: string, groupId: string) {
    const filter = {
      groupId,
    };

    const group = await this.getGroupById(groupId);
    if (group) {
      const index = group.members.indexOf(userId);
      if (index !== -1) {
        throw new BadRequestException('User already exists in the Group!');
      }

      group.members.push(userId.toString());
      group.totalMembers += 1;
      return await this.group
        .findOneAndUpdate(filter, group, { upsert: true, new: true })
        .lean()
        .exec()
        .then((response) => {
          console.log(response);
          return response;
        });
    }
    throw new NotFoundException('Group not found!');
  }

  public async removeUserFromGroup(userId: string, groupId: string) {
    const indexOfUser = await this.doesUserExistInGroup(userId, groupId);
    if (indexOfUser && indexOfUser !== -1) {
      const group = await this.getGroupById(groupId);
      group.members.splice(indexOfUser, 1);
      group.totalMembers -= 1;
      return await this.createOrUpdateGroup(group);
    }
    throw new BadRequestException('User does not exist in this group');
  }

  public async getAllGroupsByUserId(userId: string) {
    const filter = {
      ownerId: userId,
    };
    const myGroups = await this.group
      .find(filter)
      .lean()
      .exec()
      .then((response) => {
        console.log(response);
        return response;
      });

    if (myGroups.length > 0) {
      return myGroups;
    }
    throw new NotFoundException('No groups found!');
  }

  public async getGroupById(groupId: string) {
    const filter = {
      groupId,
    };
    return await this.group
      .findOne(filter)
      .lean()
      .exec()
      .then((response) => {
        return response;
      });
  }

  private async doesUserExistInGroup(userId: string, groupId: string): Promise<number> {
    const group = await this.getGroupById(groupId);
    if (!group) {
      throw new BadRequestException('Group does not exist!');
    }
    const index = group?.members?.indexOf(userId);
    return index;
  }

  // . - - - P O S T S - - -
  public async addPostToGroup(post: PostDto) {
    const filter = { groupId: post.groupId };
    const group = await this.getGroupById(post.groupId);
    if (group) {
      if (group.members.indexOf(post.posterId) === -1) {
        throw new UnauthorizedException('User unauthorized to post in this group!');
      }
      post.postId = uuid();
      if (group.posts?.length > 0) {
        group.posts.push(post);
      } else {
        group.posts = [post];
      }

      group.totalPosts += 1;
      return await this.group.findOneAndUpdate(filter, group, {
        upsert: true,
        new: true,
      });
    }
    throw new NotFoundException('Group not found!');
  }

  public async deletePostFromGroup(userId: string, groupId: string, postId: string) {
    const group = await this.getGroupById(groupId);
    if (!group) {
      throw new NotFoundException('Group not found!');
    }
    const postIndex = group.posts.findIndex((post) => post.postId === postId);

    if (postIndex === -1) {
      throw new NotFoundException('Post not found!');
    }

    if (group.posts[postIndex].posterId !== userId) {
      throw new UnauthorizedException('You are not authorized to delete this post!');
    }

    group.posts.splice(postIndex, 1); // * Can be replaced by deleteOne()
    group.totalPosts -= 1;
    return await this.createOrUpdateGroup(group);
  }

  // ! ---------- T B I --------------

  public async markPostAsComplete(userId: string, groupId: string, postId: string) {
    const group = await this.getGroupById(groupId);
    if (!group) {
      throw new NotFoundException('Group not found!');
    }
    const postIndex = group.posts?.findIndex((post) => post.postId === postId);

    if (postIndex === -1) {
      throw new NotFoundException('Post not found!');
    }

    group.posts[postIndex].completerId = userId;
    return this.createOrUpdateGroup(group);
  }

  public async changeGroupOwner() {
    // TBI: Replace the owner Id with a new Id.
  }

  public async deleteGroup() {
    //TBI: delete a group | Only creater can delete a group
  }
}
