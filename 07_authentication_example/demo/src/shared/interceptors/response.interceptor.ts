import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ResponseInterceptor<T> implements NestInterceptor<T> {
  constructor(private Serializer: T, private propName?: string) {}

  public intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<T> {
    return next.handle().pipe(
      map((data: Observable<T>) => {
        const serialize = (obj: Observable<T>): any =>
          plainToClass(this.Serializer as any, obj, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
          });

        const serialized = serialize(data);
        if (this.propName) {
          return { [this.propName]: serialized };
        }

        return serialized;
      }),
    );
  }
}
