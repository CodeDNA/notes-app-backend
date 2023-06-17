import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

class SerializeInterceptor implements NestInterceptor {
  constructor(private DtoClass: any) {}

  intercept(_context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    /* This runs before controller */

    // * This runs after the controller
    return handler.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.DtoClass, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

interface ClassConstructor {
  new (...args: any[]): object;
}

export const Serialize = (DtoClass: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(DtoClass));
};
