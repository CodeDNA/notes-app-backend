import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/app/users/dto/user.model';

export const NotesExecutionContext = createParamDecorator((_data, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
