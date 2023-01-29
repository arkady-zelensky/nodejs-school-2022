import { applyDecorators } from '@nestjs/common';
import { Expose, Transform, Type } from 'class-transformer';
import { LocationSerializer } from '../serializers/location.serializer';

export function ExposeLocation(field: string) {
  return applyDecorators(
    Expose(),
    Type(() => LocationSerializer),
    Transform(({ obj }): LocationSerializer => {
      const [lon, lat] = obj[field]?.coordinates ?? [];
      return { lon, lat };
    }),
  );
}
