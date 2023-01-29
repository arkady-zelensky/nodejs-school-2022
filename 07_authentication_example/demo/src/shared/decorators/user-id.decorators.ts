import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (_key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.userId;
  },
);
