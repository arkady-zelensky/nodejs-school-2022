import { applyDecorators } from '@nestjs/common';
import { Expose, Transform } from 'class-transformer';
import * as _ from 'lodash';

export function ExposeTranslation(field: string) {
  return applyDecorators(
    Expose(),
    Transform(({ obj }) => {
      return _.get(obj, `${field}.localizations[0].text`) || null;
    }),
  );
}
