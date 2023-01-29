import { ApiHeader } from '@nestjs/swagger';

export function LanguageHeader() {
  return ApiHeader({ name: 'Accept-Language', required: true });
}
