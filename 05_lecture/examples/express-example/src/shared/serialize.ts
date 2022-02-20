import { ClassConstructor, plainToClass } from "class-transformer";

export function serialize<T>(cls: ClassConstructor<T>, data: T): T {
  return plainToClass(cls, data, { strategy: "excludeAll" });
}
