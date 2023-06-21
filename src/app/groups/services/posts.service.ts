import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostItemDto } from '../dto/create-post.dto';
import { GroupsRepository } from '../repository/groups.repository';
import { plainToClass } from 'class-transformer';
import { PostItem } from '../dto/post.model';
import { DeletePostItemDto } from '../dto/delete-post.dto';
import { PostIdentifier } from '../dto/posts-dto/post-identifier';

@Injectable()
export class PostService {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  public async addPostToGroup(context: any, post: CreatePostItemDto) {
    const group = (await this.groupsRepository.getGroupsByIds([post.groupId]))[0];
    if (!group) throw new NotFoundException('Group not found!');

    if (group.members.indexOf(context.userId) === -1) {
      throw new UnauthorizedException('User unauthorized to post in this group!');
    }
    const newpost = plainToClass(PostItem, post);
    newpost.posterId = context.userId;
    if (group.posts?.length > 0) {
      group.posts.push(newpost);
    } else {
      group.posts = [newpost];
    }

    group.totalPosts += 1;
    const updatedGroup = await this.groupsRepository.updateGroup(group);
    if (!updatedGroup) throw new InternalServerErrorException();
    return true;
  }

  public async deletePostFromGroup(context: any, postToDelete: DeletePostItemDto) {
    const { groupId, postId } = postToDelete;
    const group = (await this.groupsRepository.getGroupsByIds([groupId]))[0];
    if (!group) throw new NotFoundException('Group not found!');
    const postIndex = group.posts.findIndex((post) => post.postId === postId);

    if (postIndex === -1) throw new NotFoundException('Post not found!');

    if (group.posts[postIndex].posterId !== context.userId) {
      throw new UnauthorizedException('You are not authorized to delete this post!');
    }

    group.posts.splice(postIndex, 1); // * Can it be replaced by deleteOne()?
    group.totalPosts -= 1;
    const updatedGroup = await this.groupsRepository.updateGroup(group);
    if (!updatedGroup) throw new InternalServerErrorException('Error deleting post');
    return true;
  }

  public async updatePostCompletion(context: any, groupId: string, postId: string, markAsCompleted: boolean) {
    const group = (await this.groupsRepository.getGroupsByIds([groupId]))[0];

    if (!group) throw new NotFoundException('Group not found!');

    const postIndex = group.posts?.findIndex((post) => post.postId === postId);

    if (postIndex === -1) throw new NotFoundException('Post not found!');

    group.posts[postIndex].completerId = markAsCompleted ? context.userId : '';
    group.posts[postIndex].completionDate = markAsCompleted ? new Date() : null;
    group.posts[postIndex].lastUpdatedAt = new Date();

    const updatedGroup = await this.groupsRepository.updateGroup(group);

    if (!updatedGroup) throw new InternalServerErrorException('Error updating post');
    return true;
  }

  public async editPost(context: any, postIdentifier: PostIdentifier, newPostContent: string) {
    const group = (await this.groupsRepository.getGroupsByIds([postIdentifier.groupId]))[0];

    if (!group) throw new NotFoundException('Group not found!');

    const postIndex = group.posts.findIndex((post) => post.postId === postIdentifier.postId);

    if (postIndex === -1) throw new NotFoundException('Post not found!');
    if (group.posts[postIndex].completerId) throw new UnauthorizedException('Cannot update a completed post.');

    group.posts[postIndex].content = newPostContent;
    group.posts[postIndex].lastUpdatedAt = new Date();

    const updatedGroup = await this.groupsRepository.updateGroup(group);

    if (!updatedGroup) throw new InternalServerErrorException('Error updating post');
    return true;
  }
}
