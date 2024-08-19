import { Body, Controller, Delete, Patch, Post, UseGuards } from '@nestjs/common';
import { NotesExecutionContext } from 'src/libs/decorators/notes-execution-context.decorator';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { CreatePostItemDto } from '../dto/create-post.dto';
import { DeletePostItemDto } from '../dto/delete-post.dto';
import { MarkPostItemDto } from '../dto/mark-post.dto';
import { PostService } from '../services/posts.service';
import { EditPostDto } from '../dto/posts-dto/edit-post.dto';

@Controller({
  path: 'posts',
})
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postService: PostService) {}

  /**
   * Only an authenticated member of the group should be authorized to create a new post.
   */
  @Post('add-post')
  async addPost(@Body() post: CreatePostItemDto, @NotesExecutionContext() context: any) {
    const isAdded = await this.postService.addPostToGroup(context, post);
    return { isAdded };
  }

  @Delete('delete-post')
  async deletePost(@Body() postToDelete: DeletePostItemDto, @NotesExecutionContext() context: any) {
    const isDeleted = await this.postService.deletePostFromGroup(context, postToDelete);
    return { isDeleted };
  }

  @Patch('mark-post')
  async markPostComplete(@Body() postToUpdate: MarkPostItemDto, @NotesExecutionContext() context: any) {
    const { groupId, postId } = postToUpdate;
    const markAsCompleted = postToUpdate.markAsCompleted;
    const isUpdated = await this.postService.updatePostCompletion(context, groupId, postId, markAsCompleted);
    return { isUpdated };
  }

  @Patch('edit-post')
  async editPost(@Body() postToEdit: EditPostDto, @NotesExecutionContext() context: any) {
    const postIdentifier = { groupId: postToEdit.groupId, postId: postToEdit.postId };
    const newPostContent = postToEdit.content;
    const isEdited = await this.postService.editPost(context, postIdentifier, newPostContent);
    return { isEdited };
  }
}
