import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from '../dto/group.model';
import { Model } from 'mongoose';

@Injectable()
export class GroupsRepository {
  constructor(@InjectModel(Group.name) private readonly group: Model<Group>) {}

  public async createGroup(group: Group) {
    const filter = {
      groupId: group.groupId,
    };

    return await this.group
      .findOneAndUpdate(filter, group, { upsert: true, new: true })
      .lean()
      .exec()
      .then((response) => {
        return response;
      });
  }

  public async updateGroup(group: Group) {
    // TODO: Implement
    const filter = {
      groupId: group.groupId,
    };

    return await this.group
      .findOneAndUpdate(filter, group, { upsert: true, new: true })
      .lean()
      .exec()
      .then((response) => {
        return response;
      });
  }

  public async getGroupsOwnedByMe(userId: string) {
    const filter = {
      ownerId: userId,
    };
    return await this.group
      .find(filter)
      .lean()
      .exec()
      .then((response) => {
        return response;
      });
  }

  public async getGroupsByIds(groupIds: string[]) {
    return await this.group.find({ groupId: { $in: groupIds }, isDeleted: false });
  }

  public async deleteGroup(groupId: string) {
    return await this.group.deleteOne({ groupId });
  }

  // ! ---------- T B I --------------
  public async changeGroupOwner() {
    // TBI: Replace the owner Id with a new Id.
  }
}
