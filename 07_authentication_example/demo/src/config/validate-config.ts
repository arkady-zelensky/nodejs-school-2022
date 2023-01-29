import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validateConfig<T>(
  configKey: string,
  cls: ClassConstructor<T>,
  plain: Partial<T>,
): T {
  const config = plainToClass(cls, plain);

  const errors = validateSync(config as any, {
    skipMissingProperties: false,
    transform: true,
  });
  if (errors.length) {
    throw new Error(`${configKey} config error: ${errors.toString()}`);
  }

  return config;
}
