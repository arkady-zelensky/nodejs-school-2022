import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

const languageSplitRegexp = /[,-]/g;

export const Language = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const acceptLanguage = request.headers['accept-language'] || '';
    const lang = acceptLanguage.split(languageSplitRegexp)[0].trim();
    return lang || 'uk';
  },
);
